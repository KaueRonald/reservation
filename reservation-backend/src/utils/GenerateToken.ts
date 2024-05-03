import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (userId: string, role: string): string => {
    return jwt.sign({ userId, role }, `${process.env.TOKEN_KEY}`, { expiresIn: '1h' });
};