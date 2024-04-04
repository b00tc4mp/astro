import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const generateToken = (user) => {
    const token = jwt.sign({user}, "isdicoders", {expiresIn:'12h'})
    return token   
}

console.log(generateToken({"_id": "660dca762f2f4ab1e269beec","nombre":"Santi","apellido":"user","email":"santi@sordi.com","password":"$2b$15$065EP6QDijaCwmNpVamLZ.YhxKbKPI8pt8W3XO2j634hHAJ7GoivK","rol":"user","__v":{"$numberInt":"0"}}))

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