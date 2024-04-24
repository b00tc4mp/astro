import local from 'passport-local'
import passport from 'passport'
import { userModel } from '../models/users.model.js'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import jwt from 'passport-jwt'

const LocalStrategy = local.Strategy
const JwtStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = ()=>{

    const cookieExtractor = (req) => {
        const token = req.cookies ? req.cookies.jwtCookie : {}
        return token
    }
    const { fromAuthHeaderAsBearerToken } = ExtractJWT

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor, fromAuthHeaderAsBearerToken()]),
        secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        
        const { nombre, apellido, email } = req.body 
        try {
            const user = await userModel.findOne({email: username})
            if(user){
                return done(null, false, { message: 'User already exists' })
            }
            const passwordHash = createHash(password)
            const newUser = await userModel.create( {
                nombre: nombre,
                apellido: apellido,
                email: email,
                password: passwordHash
            })
            return done(null, newUser)

        } catch (error) {
            return done(error)
        } 
    }
    ))
    
    passport.use('login', new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {    
        try {
            const user = await userModel.findOne ( { email: username})
            if(!user) {
           
                return done(null, false)
            }          
            if(validatePassword(password, user.password)) {
                return done(null, user) // user y contraseña validos
            }       
            return done(null, false) //contraseña no valida          
        } catch (error) {
            return done(error)
        }
    }))
    //iniciar 
    passport.serializeUser((user, done)=> {
         done(null, user._id)
    })
    //logout
    passport.deserializeUser((async(id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    }))
    }

export default initializePassport