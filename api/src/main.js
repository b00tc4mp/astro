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

const app = express()
const port = 4000

//Middlewares
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
    console.log(`server on port ${port}`)
})

