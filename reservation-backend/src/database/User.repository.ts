import { prisma } from "../infra/prisma";
import { User } from "@prisma/client";

export class UserRepository {
    
    public async createUser(data: User) {
        const user = await prisma.user.create({ data });
        return user;
    }

    public async getUsers() {
        const users = await prisma.user.findMany();
        return users;
    }

    public async getUserById(id: string) {
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
    }

    public async updateUser(id: string, data: User) {
        const user = await prisma.user.update({ where: { id }, data });
        return user;
    }

    public async deleteUser(id: string) {
        const user = await prisma.user.delete({ where: { id } });
        return user;
    }
}