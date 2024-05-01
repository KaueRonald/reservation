import { UserRepository } from "../database/User.repository";
import { Request, Response } from "express";
import HttpStatusCode from "../utils/enum/HttpStatusCode";

export class UserController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public createUsers = async (request: Request, response: Response) => {
        try {
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
            const user = await this.userRepository.getUserById(request.params.id);
            response.status(HttpStatusCode.OK).send(user);
        } catch (error) {
            response.status(HttpStatusCode.NOT_FOUND).send(error);
        }
    }

    public updateUserById = async (request: Request, response: Response) => {
        try {
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
}
