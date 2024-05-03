import { prisma } from '../infra/prisma'
import { Service } from '@prisma/client'

export class ServiceRepository {

    public createService = async (data: Service, id: string) => {
        const service = await prisma.service.create({ data: {
            name: data.name,
            description: data.description,
            price: data.price,
            id_user: id,
            type: data.type
        }  })
        return service;
    }
}

