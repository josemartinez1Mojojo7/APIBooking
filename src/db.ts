import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Event } from "./entities/Event";
import { Booking } from "./entities/Booking";
import {DB_HOST,DB_PORT,DB_USERNAME,DB_PASSWORD,DB_DATABASE} from "./config"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  timezone:"local",
  entities: [User,Event,Booking]
})