import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";
import serverConfig from "../config/server.config";
const generateToken = (payload: Object) => {
    return jsonwebtoken.sign(payload, serverConfig.secret, {
        expiresIn: "1800s"
 })
}
const verifyToken = async (payload: string) => {
    try {
        return await jsonwebtoken.verify(payload, serverConfig.secret);   
    } catch (error) {
        return null
    }
}

export default {
    generateToken, verifyToken
}