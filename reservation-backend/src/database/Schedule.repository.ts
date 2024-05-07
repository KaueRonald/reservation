import { Schedule } from "@prisma/client"
import { prisma } from "../infra/prisma";

export class ScheduleRepository {
    constructor() {

    }

    public createSchedules = async (data: Schedule, id_user: string) => {
        const schedule = await prisma.schedule.create({
            data: {
                id_user: id_user,
                date: data.date,
                id_service: data.id_service,
                status: data.status,
            }
        });
        return schedule;
    }

    public getAllSchedules = async () => {
        const schedules = await prisma.schedule.findMany();
        return schedules;
    }

    public getScheduleById = async (id: string) => {
        const schedule = prisma.schedule.findUnique({
            where: {
                id: id
            }
        })
        return schedule;
    }

    public updateSchedule = async (id: string, data: Schedule) => {
        const schedule = await prisma.schedule.update({
            where: {
                id: id
            },
            data: {
                date: data.date,
                status: data.status,
            }
        })
        return schedule;
    }

    public deleteSchedule = async (id: string) => {
        const schedule = await prisma.schedule.delete({
            where: {
                id: id
            }
        })
        return schedule;
    }
}