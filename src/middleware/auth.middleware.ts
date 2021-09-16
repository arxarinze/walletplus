import { NextFunction, Request, Response } from 'express';
import jsonWebToken from '../utils/jsonWebToken';

async function authMiddleware(request: any, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let verified = await jsonWebToken.verifyToken(token);
        if (verified == null) {
            return response.status(403).json({message:"Invalid Token"})
        }
        else {
            request.user = verified;
            next();
        }
    } else {
        return response.status(403).json({message:"Missing Token"})
    }
}

export default authMiddleware;