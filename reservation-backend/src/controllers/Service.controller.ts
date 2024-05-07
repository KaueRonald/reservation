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
        try {
            const service = await this.serviceRepository.getAllServices();
            response.status(HttpStatusCode.OK).send(service);
        } catch (error) {
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    public getServicesById = async (request: Request, response: Response) => {
        try {
            const serviceid = await request.params.id
            if (!serviceid) {
                return response.status(HttpStatusCode.BAD_REQUEST).send("O id não foi fornecido.");
            }
            const service = await this.serviceRepository.getServiceById(serviceid);
            if (!service) {
                return response.status(HttpStatusCode.NOT_FOUND).send("Serviço não encontrado.");
            }
            response.status(HttpStatusCode.OK).send(service);
        } catch (error) {
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    public updateServiceById = async (request: Request, response: Response) => {
        try {
            const service = await this.serviceRepository.updateService(request.params.id, request.body);
            if (!service){
                return response.status(HttpStatusCode.BAD_REQUEST).send("todos os campos devem ser preenchidos");
            }
                response.status(HttpStatusCode.OK).send(service)
        } catch (error) {
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send("erro a atualizar o serviço.")
        }
    }

    public deleteServiceById = async (request: Request, response: Response) => {
        try {
            const service = await this.serviceRepository.deleteService(request.params.id);
            response.status(HttpStatusCode.OK).send("serviço deletado com sucesso!");
        } catch (error) {
            response.status(HttpStatusCode.BAD_REQUEST).send("Não foi possível excluir o serviço")
        }
    }
}