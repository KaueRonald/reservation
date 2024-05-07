import { prisma } from '../infra/prisma'
import { Service } from '@prisma/client'

export class ServiceRepository {

    public createService = async (data: Service, id: string) => {

        if (!data.name || !data.description || !data.price || !data.type || !id) {
            return null;
        }
        const service = await prisma.service.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                id_user: id,
                type: data.type
            }
        })
        return service;
    }

    public getAllServices = async () => {
        const services = await prisma.service.findMany();
        return services;
    }

    public getServiceById = async (id: string) => {
        const service = await prisma.service.findUnique({
            where: {
                id: id
            }
        })
        return service;
    }

    public updateService = async (id: string, data: Service) => {

        if (!data.name || !data.description || !data.price || !data.type || !id) {
            return null;
        }
        const service = await prisma.service.update({
            where: {
                id: id
            },
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                type: data.type
            }
        })
        return service;
    }

    public deleteService = async (id: string) => {
        const service = await prisma.service.delete({
            where: {
                id: id
            }
        })
        return service;
    }
}

