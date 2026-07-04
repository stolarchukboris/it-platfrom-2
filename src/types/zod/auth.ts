import z from "zod";
import { rolesOrdered } from "../../constants/userRoles.js";

const emailSchema = z.email('Ожидается email-адрес корректного формата.')
	.trim()
	.max(254, 'Максимальная длина email-адреса - 254 символа.')
	.toLowerCase();

const passwordSchema = z.string('Ожидается строковое значение.')
	.min(10, 'Минимальная длина пароля - 10 символов.')
	.max(128, 'Максимальная длина пароля - 128 символов.');

export const authRegisterPostInputBodyObjectSchema = z.object({
	email: emailSchema,
	password: passwordSchema
});

export type AuthRegisterPostInputBodyObjectDto = z.infer<typeof authRegisterPostInputBodyObjectSchema>;

export const authMeGetOutputObjectSchema = z.object({
	id: z.int().positive(),
	email: emailSchema,
	password_hash: z.string(),
	role: z.enum(rolesOrdered),
	created_at: z.iso.datetime()
});

export type AuthMeGetOutputObjectDto = z.infer<typeof authMeGetOutputObjectSchema>;

export const authLoginPostInputBodyObjectSchema = z.object({
	email: emailSchema,
	password: passwordSchema
});

export type AuthLoginPostInputBodyObjectDto = z.infer<typeof authLoginPostInputBodyObjectSchema>;
