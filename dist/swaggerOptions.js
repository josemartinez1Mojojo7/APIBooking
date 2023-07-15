"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const config_1 = require("./config");
exports.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API BookingTickets",
            version: "1.0.0",
            description: "A simple express library API",
        },
        servers: [
            {
                url: config_1.URL_API,
            },
        ],
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};
