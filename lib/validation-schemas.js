import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'

const username = yup.string().required().min(2).nonNullable()
const password = yup.string().required().min(6).nonNullable()

export const loginSchema = yup.object({ username, password})

export const registerSchema = yup.object({
  username, password, matchPassword: password
})
