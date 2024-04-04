import { Schema, model } from 'mongoose'

const userSchema = new Schema ({
    nombre: {
        type: String,
        unique: true
    },
    apellido: {
        type: String,
        unique: true
    }, 
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    rol: {
         type: String,
         default: 'user'
    }
})

export const userModel = model('users', userSchema)