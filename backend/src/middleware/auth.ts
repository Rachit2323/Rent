import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const JWT_SECRET = 'njjdnjdnjdncjncdj';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        (req as any).user = user;
        next();
    });
};


// make middle where for seller so that properties posted by them can be accessed by them only
export const authenticateSeller = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);
    console.log('token', token);

    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) {
            console.log('err', err.message);
            return res.status(401).send({ message: 'Invalid Token' });
        }
        const userData = await User.findById((user as JwtPayload).userId);
        if (!userData) return res.status(404).send({ message: 'User not found' });
        if (userData.role !== 'seller') return res.status(401).send({ message: 'Unauthorized Not a seller' });

        (req as any).user = userData;
        console.log('user-later', (req as any).user);
        next();
    });
};