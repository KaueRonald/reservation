import * as yup from "yup"

export const userValidation = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    role: yup.string().required(),
})