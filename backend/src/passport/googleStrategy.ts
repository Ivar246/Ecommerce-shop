import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { AuthConfig } from "../config";

export const useGoogleStrategy = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: AuthConfig.OAUTH_CLIENTID,
        clientSecret: AuthConfig.OAUTH_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        let user = await AppDataSource.getRepository(User).findOne({
          where: { email: profile.emails[0]["value"] },
        });

        if (!user) {
          user = new User();
          user.email = profile.emails[0]["value"];
          user.username = profile.displayName;
          user.google_id = profile.id;

          user = await AppDataSource.getRepository(User).save(user);
        }

        return done(null, { id: user.id, email: user.email, role: user.role });
      }
    )
  );

  passport.serializeUser((user: any, done: any) => {
    console.log("serialize user", user);
    return done(null, user);
  });

  passport.deserializeUser((user: any, done: any) => {
    console.log("deserialize user", user);
    return done(null, user);
  });
};
