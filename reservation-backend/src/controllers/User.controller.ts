import { UserRepository } from "../database/User.repository";
import { Request, Response } from "express";
import HttpStatusCode from "../utils/enum/HttpStatusCode";
import bcrypt from "bcrypt";
import { userValidation } from "../validations/User.validation";
import UserServices from "../services/UserService";

export class UserController {
    private userRepository: UserRepository;
    private userService: UserServices

    constructor() {
        this.userRepository = new UserRepository();
        this.userService = new UserServices();
    }

    public createUsers = async (request: Request, response: Response) => {
        try {
            await userValidation.validate(request.body);
            const hashPassword = await bcrypt.hash(request.body.password, 10);
            request.body.password = hashPassword;
            const user = await this.userRepository.createUser(request.body);
            response.status(HttpStatusCode.CREATED).send(user);
        } catch (error) {
            response.status(HttpStatusCode.BAD_REQUEST).send(error);
        }
    }

    public getAllUsers = async (request: Request, response: Response) => {
        try {
            const users = await this.userRepository.getUsers();
            response.status(HttpStatusCode.OK).send(users);
        } catch (error) {
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    public getUsersById = async (request: Request, response: Response) => {
        try {
            const ServiceId = await request.params.id
            if (!ServiceId) {
                return response.status(HttpStatusCode.BAD_REQUEST).send("O id não foi fornecido.");
            }
            const user = await this.userRepository.getUserById(ServiceId);
            if (!user) {
                return response.status(HttpStatusCode.NOT_FOUND).send("Usuário não encontrado.");
            }
            response.status(HttpStatusCode.OK).send(user);
        } catch (error) {
            response.status(HttpStatusCode.NOT_FOUND).send(error);
        }
    }

    public updateUserById = async (request: Request, response: Response) => {
        try {
            await userValidation.validate(request.body);
            const hashPassword = await bcrypt.hash(request.body.password, 10);
            request.body.password = hashPassword;
            const user = await this.userRepository.updateUser(request.params.id, request.body);
            response.status(HttpStatusCode.OK).send(user);
        } catch (error) {
            response.status(HttpStatusCode.NOT_FOUND).send(error);
        }
    }

    public deleteUserById = async (request: Request, response: Response) => {
        try {
            const user = await this.userRepository.deleteUser(request.params.id);
            response.status(HttpStatusCode.NO_CONTENT).send("Usuário excluído com sucesso!");
        } catch (error) {
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send("Não foi possível encontrar o usuário.");
        }
    }

    public LoginUser = async (request: Request, response: Response) => {
        const user = request.body
        try {
            return response
                .status(HttpStatusCode.OK)
                .send(
                    await this.userService.verifyUserCredentials(
                        user.email,
                        user.password,
                    ),
                );
        } catch (error) {
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
        }
    }
}
