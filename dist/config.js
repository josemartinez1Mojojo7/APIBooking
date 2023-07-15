"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.PORT = void 0;
exports.PORT = process.env.PORT || 3000;
exports.DB_HOST = process.env.DB_HOST || 'localhost';
exports.DB_PORT = parseInt(process.env.DB_PORT || "") || 3366;
exports.DB_USERNAME = process.env.DB_USERNAME || 'root';
exports.DB_PASSWORD = process.env.DB_PASSWORD || 'admin';
exports.DB_DATABASE = process.env.DB_DATABASE || 'reserva-tickets-db';
