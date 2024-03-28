import express from 'express'
import routerUser from './routes/user.routes.js'
import cors from 'cors'

const app = express()
const port = 4000

//Middlewares
app.use(express.urlencoded({ extended:true }))
app.use(express.json());

//Routes
app.use('/users', routerUser)

//Server
app.listen(port, ()=>{
    console.log(`server on port ${port}`)
})

