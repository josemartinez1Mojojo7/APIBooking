import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routerUser from './routes/user.router'
import routerEvent from './routes/event.router'
import routerBooking from './routes/booking.router'

// import passportMiddleware from './middlewares/passport';
// import passport from 'passport'
// import passportLocal from "passport-local";
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import {options} from './swaggerOptions'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/api', routerUser)
app.use('/api',routerEvent)
app.use('/api', routerBooking)

//Agregar para jwt
// app.use(express.urlencoded({extended: false}));
// app.use(passport.initialize());
// passport.use(passportMiddleware);

// const specs = swaggerJSDoc(options);
// app.use(
//   "/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(specs)
// )

export default app