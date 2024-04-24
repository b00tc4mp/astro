import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from './config/passport.js'
import router from './routes/index.routes.js'
import mongoConnect from './dataBase.js';
import cors from 'cors'

const whitelist = ['http://localhost:4321']

const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback( new Error ('Not allowed by CORS'))
        }
    }
}

const app = express()
const port = process.env.PORT

//Middlewares
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended:true }))
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))

//MongoDB Connection Middlewares 
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 60 
        }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized:true     
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use('/', router)

//DB
mongoConnect() 

//Server
app.listen(port, ()=>{
    // eslint-disable-next-line no-console
    console.log(`Server on port ${port}`)
})

export default app