"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Event_1 = require("./entities/Event");
const Booking_1 = require("./entities/Booking");
const config_1 = require("./config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: config_1.DB_HOST,
    port: config_1.DB_PORT,
    username: config_1.DB_USERNAME,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_DATABASE,
    synchronize: true,
    timezone: "local",
    entities: [User_1.User, Event_1.Event, Booking_1.Booking]
});
