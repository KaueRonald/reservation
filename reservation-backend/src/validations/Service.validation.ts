import * as yup from "yup";

export const serviceValidation = yup.object({
    name: yup.string().required("O nome do serviço é obrigatório."),
    type: yup.string().required("O tipo do serviço é obrigatório."),
    description: yup.string().required("A descrição do serviço é obrigatória."),
    price: yup.number().required("O preço do serviço é obrigatório.").nullable(),
}).strict();