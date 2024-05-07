import { prisma } from "../infra/prisma";
import { User } from "@prisma/client";

export class UserRepository {

    public async createUser(data: User) {
        const user = await prisma.user.create({
            data, select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });
        return user;
    }

    public async getUsers() {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                services: true,
                schedule: true
            }
        });
        return users;
    }

    public async getUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id }, select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                services: true,
                schedule: true
            }
        });
        return user;
    }

    public async getCredencialsLogin(email: string) {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user;
    }

    public async updateUser(id: string, data: User) {
        const user = await prisma.user.update({
            where: { id }, data, select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });
        return user;
    }

    public async deleteUser(id: string) {
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        });
        return user;
    }
}