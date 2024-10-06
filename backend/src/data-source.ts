import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Product } from "./entity/Product";
import { Cart } from "./entity/Cart";
import { CartItem } from "./entity/CartItem";
import { Checkout } from "./entity/Checkout";
import { Order } from "./entity/Order";
import { OrderItem } from "./entity/OrderItem";
import { AuditLog } from "./entity/Auditlog";
import { RefreshToken } from "./entity/RefreshToken";
import { dbConfig } from "./config";
import { AddFailedAttemptsAndLockToUsers1727924868429 } from "./migrations/1727924868429-AddFailedAttemptsAndLockToUsers";
import { Image } from "./entity/Image";
import { WishlistItem } from "./entity/WishlistItem";
import { Wishlist } from "./entity/Wishlist";
import { ProductView } from "./entity/ProductView";
import { ProductLikes } from "./entity/Like";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: dbConfig.DB_PORT,
  username: dbConfig.DB_USER,
  password: dbConfig.DB_PASS,
  database: dbConfig.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Product,
    Cart,
    CartItem,
    Checkout,
    Order,
    OrderItem,
    AuditLog,
    RefreshToken,
    Image,
    WishlistItem,
    Wishlist,
    ProductView,
    ProductLikes,
  ],
  migrations: [AddFailedAttemptsAndLockToUsers1727924868429],
  migrationsTableName: "migrations",
});
