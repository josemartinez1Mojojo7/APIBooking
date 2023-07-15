import {URL_API} from './config'
export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API BookingTickets",
      version: "1.0.0",
      description: "A simple express library API",
    },
    servers: [
      {
        url: URL_API,
      },
    ],
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
}