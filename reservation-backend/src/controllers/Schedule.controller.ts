import { Request, Response } from "express";
import HttpStatusCode from "../utils/enum/HttpStatusCode";
import { ScheduleRepository } from "../database/Schedule.repository";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { scheduleValidation, scheduleValidationUpdate } from "../validations/Schedule.validation";

interface TokenPayload extends JwtPayload {
    userId: string;
}

export class ScheduleController {
    private ScheduleRepository: ScheduleRepository;

    constructor() {
        this.ScheduleRepository = new ScheduleRepository
    }

    public createSchedule = async (request: Request, response: Response) => {
        const prefixtoken = request.headers.authorization;

        if (!prefixtoken) {
            return response.status(HttpStatusCode.UNAUTHORIZED).send('Token não fornecido');
        }
        const [bearer, token] = prefixtoken.split(' ');
        try {
            await scheduleValidation.validate(request.body)
            const decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`) as TokenPayload;
            const schedule = await this.ScheduleRepository.createSchedules(request.body, decoded.userId.toString())
            response.status(HttpStatusCode.OK).json(schedule)
        } catch (error) {
            response.status(HttpStatusCode.BAD_REQUEST).send("dados inválidos")
        }
    }

    public GetAllSchedules = async (request: Request, response: Response) => {
        try {
            const schedule = await this.ScheduleRepository.getAllSchedules();
            response.status(HttpStatusCode.OK).send(schedule);
        } catch (error) {
            response.status(HttpStatusCode.BAD_REQUEST).send("erro na requisição");
        }
    }

    public GetScheduleById = async (request: Request, response: Response) => {
        try {
            const schedule = await this.ScheduleRepository.getScheduleById(request.params.id);
            response.status(HttpStatusCode.OK).send(schedule);
        } catch (error) {
            response.status(HttpStatusCode.BAD_REQUEST).send("erro na requisição");
        }
    }

    public UpdateScheduleById = async (request: Request, response: Response) => {
        try {
            await scheduleValidationUpdate.validate(request.body)
            const schedule = await this.ScheduleRepository.updateSchedule(request.params.id, request.body);
            response.status(HttpStatusCode.OK).send(schedule);
        } catch (error) {
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send("verifque todos os campos");
        }
    }

    public DeleteScheduleById = async (request: Request, response: Response) => {
        try {
            const schedule = await this.ScheduleRepository.deleteSchedule(request.params.id);
            response.status(HttpStatusCode.OK).send("Agendamento cancelado");
        } catch (error) {
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send("Não foi possível encontrar o agendamento");
        }
    }
}