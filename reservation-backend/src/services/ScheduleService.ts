import { Schedule, Service } from "@prisma/client";
import { ScheduleRepository } from "../database/Schedule.repository";
import { scheduleValidationUpdate } from "../validations/Schedule.validation";


export class ScheduleServices {
    private repository: ScheduleRepository;

    constructor() {
        this.repository = new ScheduleRepository();
    }

    public getSchedule = async () => {
        try {
            const schedule = await this.repository.getAllSchedules();
            return schedule;
        } catch (error) {
            throw new Error("Solicitação não concluída");
        }
    }

    public getScheduleById = async (id: string) => {
        if (!id) {
            throw new Error("O id não foi fornecido.");
        }
        const schedule = await this.repository.getScheduleById(id);
        if (!schedule) {
            throw new Error("Serviço não encontrado.");
        }
        return schedule;
    }

    public updateSchedule = async (id: string, data: Schedule) => {
        await scheduleValidationUpdate.validate(data)
        const schedule = await this.repository.updateSchedule(id, data);
        if (!schedule) {
            throw new Error("Todos os campos devem ser preenchidos");
        }
        return schedule;
    }

    public deleteSchedule = async (id: string) => {
        if(!id) {
            throw new Error("O id não foi fornecido.");
        }
        const schedule = await this.repository.deleteSchedule(id);
        if (!schedule) {
            throw new Error("Não foi possível excluir o serviço");
        }
        return schedule;
    }
}