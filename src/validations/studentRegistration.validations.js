import * as yup from 'yup';

export const schemaStudentRegistrationForm = yup.object().shape({
    name: yup.string().required("O nome é obrigatório").max(250, 'O nome é muito longo'),
    email: yup.string().email('O email não é valido').required("O email é obrigatório"),
    contact: yup.string().required('O telefone é obrigatório'),
    dateBirth: yup.date().max(new Date(), 'A data de nascimento não pode ser no futuro'),
    cep: yup.string().required('O CEP é obrigatório'),
    street: yup.string().required('O logradouro é obrigatório'),
    number: yup.string().required('O número da residência é obrigatório'),
    neighborhood: yup.string().required('O bairro é obrigatório'),
    city: yup.string().required('A cidade é obrigatória'),
    state: yup.string().required('O estado é obrigatório')
}) 