import { ServiceRepository } from "../database/Service.repository";
import { ServiceServices } from "../services/ServiceService";
import { VerifyRole } from "../middlewares/VerifyUserRole"
import { Request, Response } from "express"
import HttpStatusCode from "../utils/enum/HttpStatusCode";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
    userId: string;
}

export class ServiceController {
    private serviceRepository: ServiceRepository;
    private serviceServices: ServiceServices;

    constructor() {
        this.serviceRepository = new ServiceRepository();
        this.serviceServices = new ServiceServices();
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
                if (!service) {
                    return response.status(HttpStatusCode.BAD_REQUEST).send("Todos os campos obrigatórios devem ser fornecidos");
                }
                response.status(HttpStatusCode.OK).send(service);
            });
        } catch (error) {
            response.status(HttpStatusCode.BAD_REQUEST).send("não foi possível criar");
        }
    }

    public getAllServices = async (request: Request, response: Response) => {
        const users = await this.serviceServices.getService();
        response.status(HttpStatusCode.OK).send(users);
    }

    public getServicesById = async (request: Request, response: Response) => {
        try {
            const service = await this.serviceServices.getServiceById(request.params.id)
            response.status(HttpStatusCode.OK).send(service);
        } catch (error) {
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error instanceof Error ? error.message : "Erro na solicitação.");
        }
    }

    public updateServiceById = async (request: Request, response: Response) => {
        try {
                const service = await this.serviceServices.updateService(request.params.id, request.body);
                response.status(HttpStatusCode.OK).send(service)
        } catch (error) {
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error instanceof Error ? error.message : "Erro na solicitação")
        }
    }

    public deleteServiceById = async (request: Request, response: Response) => {
        try {
            const service = await this.serviceServices.deleteService(request.params.id);
            response.status(HttpStatusCode.OK).send("serviço deletado com sucesso!");
        } catch (error) {
            response.status(HttpStatusCode.BAD_REQUEST).send(error instanceof Error ? error.message : "Erro ao excluir");
        }
    }
}