import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const generateToken = (user) => {
    const token = jwt.sign({user}, "isdicoders", {expiresIn:'12h'})
    return token   
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.Authorization
    if(!authHeader) {
        return res.status(401).send ({ error: "User not authenticate"})
    }

    const token = authHeader.split(' ')[1]

    jwt.sign(token, process.env.JWT_SECRET, (error, credential) => {
        if(error) {
            return res.status(403).send ({ error: "User not authorized"})
        }
        req.user = credential.user
        next()
    })
}