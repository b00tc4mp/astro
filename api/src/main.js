import express from 'express'
import routerUser from './routes/user.routes.js'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
const port = 4000

//Middlewares
app.use(express.urlencoded({ extended:true }))
app.use(express.json());

//Routes
app.use('/users', routerUser)

//MongoDB Connection 
mongoose.connect('mongodb+srv://santiagosordi:w2EwtQWNhrCyYczd@cluster0.0wg5zid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then (()=> console.log("DB Connected"))
    .catch((error)=> console.log("DB connection error", error))

//Server
app.listen(port, ()=>{
    console.log(`server on port ${port}`)
})

