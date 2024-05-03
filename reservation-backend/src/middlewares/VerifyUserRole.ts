import { Request, Response, NextFunction } from "express"
import HttpStatusCode from "../utils/enum/HttpStatusCode";
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

interface TokenPayload extends JwtPayload {
    role: string;
}

export const VerifyRole = (request: Request, response: Response, next: NextFunction) => {
    const prefixtoken = request.headers.authorization;

    if (!prefixtoken) {
        return response.status(HttpStatusCode.UNAUTHORIZED).send('Token não fornecido');
    }
    const [bearer, token] = prefixtoken.split(' ');
    try {
        console.log(token);
        const decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`) as TokenPayload;
        console.log('Token decodificado:', decoded);
        if (decoded.role !== "PROVIDER") {
            return response.status(HttpStatusCode.FORBIDDEN).send('Você não tem permissão para acessar essa rota');
        }
        next();
    } catch (error) {
        return response.status(HttpStatusCode.UNAUTHORIZED).send('Token inválido');
    }
}