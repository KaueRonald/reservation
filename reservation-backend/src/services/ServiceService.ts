import { Service } from "@prisma/client";
import { ServiceRepository } from "../database/Service.repository";


export class ServiceServices {
    private repository: ServiceRepository;

    constructor() {
        this.repository = new ServiceRepository();
    }

    public getService = async () => {
        try {
            const services = await this.repository.getAllServices();
            return services;
        } catch (error) {
            throw new Error("Solicitação não concluída");
        }
    }

    public getServiceById = async (id: string) => {
        if (!id) {
            throw new Error("O id não foi fornecido.");
        }
        const service = await this.repository.getServiceById(id);
        if (!service) {
            throw new Error("Serviço não encontrado.");
        }
        return service;
    }

    public updateService = async (id: string, data: Service) => {
        const service = await this.repository.updateService(id, data);
        if (!service) {
            throw new Error("Todos os campos devem ser preenchidos");
        }
        return service;
    }

    public deleteService = async (id: string) => {
        const service = await this.repository.deleteService(id);
        if (!service) {
            throw new Error("Não foi possível excluir o serviço");
        }
        return service;
    }
}