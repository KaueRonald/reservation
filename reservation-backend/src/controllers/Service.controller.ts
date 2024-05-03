import { ServiceRepository } from "../database/Service.repository";
import { VerifyRole } from "../middlewares/VerifyUserRole"
import { Request, Response } from "express"
import HttpStatusCode from "../utils/enum/HttpStatusCode";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
    userId: string;
}

export class ServiceController {
    private serviceRepository: ServiceRepository;

    constructor() {
        this.serviceRepository = new ServiceRepository();
    }

    public createServices = async (request: Request, response: Response) => {
        const prefixtoken = request.headers.authorization;

        if (!prefixtoken) {
            return response.status(HttpStatusCode.UNAUTHORIZED).send('Token não fornecido');
        }
        const [bearer, token] = prefixtoken.split(' ');
        try {
            VerifyRole(request, response, async () => {
                const serviceData = request.body; 
                const decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`) as TokenPayload;
                const service = await this.serviceRepository.createService(serviceData, decoded.userId.toString());
                response.status(HttpStatusCode.OK).json(service);
            });
        } catch (error) {
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
        }
    }
}