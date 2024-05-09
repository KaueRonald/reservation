import HttpStatusCode from '../utils/enum/HttpStatusCode';
import { UserRepository } from '../database/User.repository';
import { generateToken } from '../utils/GenerateToken';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { userValidation } from '../validations/User.validation';

export class UserServices {
    public repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    public verifyUserCredentials = async (email: string, password: string) => {
        const user = await this.repository.getCredencialsLogin(email);
        if (!user) {
            throw {
                status: HttpStatusCode.NOT_FOUND,
                message: { error: 'User NOT FOUND' },
            };
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw {
                status: HttpStatusCode.BAD_REQUEST,
                message: { error: 'Invalid password' },
            };
        }
        const token = generateToken(user.id, user.role);

        return { token };
    }

    public create = async (data: User) => {
        await userValidation.validate(data);
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
        const user = await this.repository.createUser(data);
        return user;
    }

    public getUsers = async () => {
        try {
            const users = await this.repository.getUsers();
            return users;
        } catch (error) {
            throw new Error("Solicitação não concluída");
        }
    }

    public getUserById = async (id: string) => {
            if (!id) {
                throw new Error("O id não foi fornecido.");
            }
            const user = await this.repository.getUserById(id);
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }
            return user;
    }

    public updateUser = async (id: string, data: User) => {
            if (data.role === "CLIENT") {
                const user = await this.repository.getUserById(id);
                if (user && user.services.length > 0) {
                    throw new Error("Usuário com serviços não pode ser definido como CLIENT.");
                }
            }
            await userValidation.validate(data);
            const hashPassword = await bcrypt.hash(data.password, 10);
            data.password = hashPassword;
            const user = await this.repository.updateUser(id, data);
            return user;
    }

    public deleteUser = async (id: string) => {
        const verifyUser = await this.repository.getUserById(id);
        if (verifyUser == null) {
            throw new Error("Não foi possível encontrar o usuário.");
        } else if (verifyUser.services.length > 0) {
            throw new Error("Não pode excluir esse usuário pois ele possui serviços ativos");
        } else if (verifyUser.schedule.length > 0) {
            throw new Error("Não pode excluir esse usuário pois ele possui agendamentos ativos");
        }
        const user = await this.repository.deleteUser(id);
        return user;
    }
}