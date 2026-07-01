import * as z from "zod";
import type { TypedRequestHandler } from "./requestTypes.js";

const employeestatusEnumSchema = z.enum(['active', 'blocked', 'finished'], 'Ожидается одно из: "active", "blocked", "finished".');
const employeeNameSchema = z.string('Ожидается строковый тип.').max(50, 'Предельная длина имени - 50 символов.').trim();
const employeeRdsScoreSchema = z.int('Ожидается целочисленное значение.')
	.nonnegative('Ожидается неотрицательное значение.')
	.max(100, 'Ожидается значение не больше 100.');

export const employeeInputBodyObjectSchema = z.object({
	name: employeeNameSchema,
	status: employeestatusEnumSchema,
	readiness_score: employeeRdsScoreSchema.nullish()
});

export type EmployeeInputBodyObjectDto = z.infer<typeof employeeInputBodyObjectSchema>;

export const employeeOutputObjectSchema = z.object({
	id: z.int().positive(),
	name: employeeNameSchema,
	status: employeestatusEnumSchema,
	readiness_score: employeeRdsScoreSchema,
	created_at: z.iso.datetime()
});

export type EmployeeOutputObjectDto = z.infer<typeof employeeOutputObjectSchema>;

export const employeePatchBodyObjectSchema = z.object({
	status: employeestatusEnumSchema.nullish(),
	readiness_score: employeeRdsScoreSchema.nullish()
}).refine(obj => Object.keys(obj).length > 0, 'Тело запроса не может быть пустым.');

export type EmployeePatchObjectDto = z.infer<typeof employeePatchBodyObjectSchema>;

export const employeePatchParamsObjectSchema = z.object({
	id: z.coerce.number('Ожидается число.')
		.int('Ожидается целочисленное значение.')
		.positive('Ожидается положительное значение.')
});

export type EmployeePatchParamsObjectDto = z.infer<typeof employeePatchParamsObjectSchema>;

export const employeePatchValidation = {
	params: employeePatchParamsObjectSchema,
	body: employeePatchBodyObjectSchema
}

export type EmployeePatchController = TypedRequestHandler<typeof employeePatchValidation>;
