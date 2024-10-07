import { LoginDto, CreateUserDto } from "../dto";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserService } from "./user.service";
import {
  BadRequestError,
  ConflictError,
  InvalidRefreshToken,
  AccountLockedError,
} from "../errors";
import { AuthConfig } from "../config";
import { Payload, Tokens } from "../interface";
import { generateTokens } from "../utils/generateToken";
import { AppDataSource } from "../data-source";
import { RefreshToken } from "../entity/RefreshToken";
import { RtDetail } from "../type";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { MILLISECONDS24, parseIsoDate } from "../utils/dateUtils";

export class AuthService {
  private userService: UserService;
  userRepository: Repository<User>;

  constructor() {
    this.userService = new UserService();
    this.userRepository = AppDataSource.getRepository(User);
  }

  async login(data: LoginDto): Promise<Tokens> {
    try {
      //check if user  exist or not
      const user = await this.userService.getUserByEmail(data.email);
      if (!user) throw new BadRequestError("user with email doesn't exist");

      // check if account is locked
      if (user.is_lock) {
        // check time of locked >  24 hours, automatic reset
        const now = new Date();
        if (
          parseIsoDate(user.lockedAt).getTime() - now.getTime() >=
          MILLISECONDS24
        ) {
          // set is_lock to false and failed attempts to 0
          await this.userRepository.update(user.id, {
            is_lock: false,
            failed_attempt: 0,
          });
        } else {
          throw new AccountLockedError();
        }
      }

      // check password match
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        const failed_attempt = user.failed_attempt + 1;
        let is_lock = user.is_lock;
        let lockedAt = user.lockedAt;

        if (failed_attempt === AuthConfig.MAX_FAILED_ATTEMPT) {
          is_lock = true;
          lockedAt = new Date().toISOString();
          // send locked notification
        }

        await this.userRepository.update(user.id, {
          failed_attempt: failed_attempt,
          is_lock: is_lock,
          lockedAt: lockedAt,
        });

        throw new BadRequestError("Password doesn't match");
      }

      const payload: Payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const { at, rt } = await generateTokens(payload);
      await this.saveRt(user.id, await this.getHash(rt));

      return { at, rt };
    } catch (error) {
      throw error;
    }
  }

  async register(data: CreateUserDto) {
    try {
      const user = await this.userService.create(data);

      delete user["password"];
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  handleGoogleOauthSuccess = async (user: Payload) => {
    try {
      const payload: Payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const { at, rt } = await generateTokens(payload);
      await this.saveRt(user.id, await this.getHash(rt));

      return { at, rt };
    } catch (error) {
      throw error;
    }
  };

  async getRefreshToken(rt_Detail: RtDetail): Promise<Tokens> {
    try {
      const { token_hash } = await AppDataSource.manager.findOneBy(
        RefreshToken,
        { user_id: rt_Detail.user.id }
      );

      const isValid = await bcrypt.compare(rt_Detail.refresh_Token, token_hash);
      console.log(isValid);
      if (!isValid) throw new InvalidRefreshToken();

      console.log(rt_Detail);

      const { at, rt } = await generateTokens(rt_Detail.user);
      await this.saveRt(rt_Detail.user.id, await this.getHash(rt));

      return { at, rt };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async saveRt(user_id: number, rtHash: string) {
    try {
      let userRt = await AppDataSource.manager.findOne(RefreshToken, {
        where: { user_id: user_id },
      });

      if (!userRt) {
        userRt = new RefreshToken();
        userRt.user_id = user_id;
        userRt.token_hash = rtHash;
      }

      userRt.token_hash = rtHash;
      await AppDataSource.manager.save(RefreshToken, userRt);
    } catch (error) {
      throw error;
    }
  }

  async getHash(data: string) {
    return await bcrypt.hash(data, 10);
  }
}
