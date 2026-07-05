import z from "zod";
import { rolesOrdered } from "../constants.js";
import { idSchema } from "./common.js";

const emailSchema = z.email('Ожидается email-адрес корректного формата.')
	.trim()
	.max(254, 'Максимальная длина email-адреса - 254 символа.')
	.toLowerCase();

export const authRegisterPostInputBodyObjectSchema = z.object({
	email: emailSchema,
	password: z.string('Ожидается строковое значение.')
		.min(10, 'Минимальная длина пароля - 10 символов.')
		.max(128, 'Максимальная длина пароля - 128 символов.')
});

export type AuthRegisterPostInputBodyObjectDto = z.infer<typeof authRegisterPostInputBodyObjectSchema>;

export const authMeGetOutputObjectSchema = z.object({
	id: idSchema,
	email: emailSchema,
	password_hash: z.string(),
	role: z.enum(rolesOrdered),
	created_at: z.iso.datetime()
});

export type AuthMeGetOutputObjectDto = z.infer<typeof authMeGetOutputObjectSchema>;

export const authLoginPostInputBodyObjectSchema = authRegisterPostInputBodyObjectSchema;

export type AuthLoginPostInputBodyObjectDto = AuthRegisterPostInputBodyObjectDto;
