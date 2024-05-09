import { Request, Response } from "express";
import HttpStatusCode from "../utils/enum/HttpStatusCode";
import { UserServices } from "../services/UserService";

export class UserController {
    private userService: UserServices

    constructor() {
        this.userService = new UserServices();
    }

    public createUsers = async (request: Request, response: Response) => {
        try {
            const user = await this.userService.create(request.body);
            response.status(HttpStatusCode.CREATED).send(user);
        } catch (error) {
            response.status(HttpStatusCode.BAD_REQUEST).send(error);
        }
    }

    public getAllUsers = async (request: Request, response: Response) => {
        const users = await this.userService.getUsers();
        response.status(HttpStatusCode.OK).send(users);
    }

    public getUsersById = async (request: Request, response: Response) => {
        try {
            const user = await this.userService.getUserById(request.params.id);
            response.status(HttpStatusCode.OK).send(user);
        } catch (error) {
            response.status(HttpStatusCode.NOT_FOUND).send(error instanceof Error ? error.message : "Erro na solicitação.");
        }
    }

    public updateUserById = async (request: Request, response: Response) => {
        try {
            const user = await this.userService.updateUser(request.params.id, request.body);
            response.status(HttpStatusCode.OK).send(user);
        } catch (error) {
            response.status(HttpStatusCode.NOT_FOUND).send(error instanceof Error ? error.message : "Erro na solicitação.");
        }
    }

    public deleteUserById = async (request: Request, response: Response) => {
        try {
            const user = await this.userService.deleteUser(request.params.id)
            response.status(HttpStatusCode.OK).send("Usuário excluído com sucesso!");
        } catch (error) {
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error instanceof Error ? error.message : "Erro na solicitação.");
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
