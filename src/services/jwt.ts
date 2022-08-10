import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'



const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1]
        const tokenSecret = process.env.TOKEN_SECRET as string;
        const decoded = jwt.verify(token, tokenSecret)

        next()
    } catch (error) {
    
        res.status(401).json({ status: 0, message: "Unauthorized. valid token must be provided" });
    }
}

export default verifyAuthToken;