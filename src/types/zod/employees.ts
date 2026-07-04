import z from "zod";
import type { TypedRequestHandler } from "../requestTypes.js";

const employeeStatusEnumSchema = z.enum(['active', 'blocked', 'finished'], 'Ожидается одно из: "active", "blocked", "finished".');
const employeeNameSchema = z.string('Ожидается строковый тип.').max(50, 'Предельная длина имени - 50 символов.').trim();
const employeeRdsScoreSchema = z.int('Ожидается целочисленное значение.')
	.nonnegative('Ожидается неотрицательное значение.')
	.max(100, 'Ожидается значение не больше 100.');

export const employeesPostInputBodyObjectSchema = z.object({
	name: employeeNameSchema,
	status: employeeStatusEnumSchema,
	readiness_score: employeeRdsScoreSchema.nullish()
});

export type EmployeesPostInputBodyObjectDto = z.infer<typeof employeesPostInputBodyObjectSchema>;

export const employeesGetOutputObjectSchema = z.object({
	id: z.int().positive(),
	name: employeeNameSchema,
	status: employeeStatusEnumSchema,
	readiness_score: employeeRdsScoreSchema,
	created_at: z.iso.datetime()
});

export type EmployeesGetOutputObjectDto = z.infer<typeof employeesGetOutputObjectSchema>;

export const employeesPatchInputBodyObjectSchema = z.object({
	status: employeeStatusEnumSchema.nullish(),
	readiness_score: employeeRdsScoreSchema.nullish()
}).refine(obj => Object.keys(obj).length > 0, 'Тело запроса не может быть пустым.');

export type EmployeesPatchInputBodyObjectDto = z.infer<typeof employeesPatchInputBodyObjectSchema>;

export const employeesPatchInputParamsObjectSchema = z.object({
	id: z.coerce.number('Ожидается число.')
		.int('Ожидается целочисленное значение.')
		.positive('Ожидается положительное значение.')
});

export type EmployeesPatchInputParamsObjectDto = z.infer<typeof employeesPatchInputParamsObjectSchema>;

export const employeesPatchValidation = {
	params: employeesPatchInputParamsObjectSchema,
	body: employeesPatchInputBodyObjectSchema
}

export type EmployeesPatchController = TypedRequestHandler<typeof employeesPatchValidation>;
