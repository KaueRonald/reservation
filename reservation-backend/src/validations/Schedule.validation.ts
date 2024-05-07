import * as yup from "yup"

export const scheduleValidation = yup.object({
    date: yup.date().required(),
    status: yup.string().required(),
    id_service: yup.string().required()
})

export const scheduleValidationUpdate = yup.object({
    date: yup.date().required("é necessário passar a data do agendamento"),
    status: yup.string().required("é necessário passar o status do agendamento"),
})