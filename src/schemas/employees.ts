import z from "zod";
import type { TypedRequestHandler } from "../types/requestTypes.js";
import { employeeStatuses } from "../constants.js";
import { buildEnumSchema, positiveIntSchema } from "./common.js";

const employeeStatusEnumSchema = buildEnumSchema(employeeStatuses);
const employeeNameSchema = z.string('Ожидается строковый тип.').trim().max(50, 'Предельная длина имени - 50 символов.');
const employeeRdsScoreSchema = z.int('Ожидается целочисленное значение.')
	.nonnegative('Ожидается неотрицательное значение.')
	.max(100, 'Ожидается значение не больше 100.');

export const employeesPostInputBodyObjectSchema = z.object({
	name: employeeNameSchema,
	status: employeeStatusEnumSchema.default('active'),
	readiness_score: employeeRdsScoreSchema.default(0)
});

export type EmployeesPostInputBodyObjectDto = z.infer<typeof employeesPostInputBodyObjectSchema>;

export const employeesGetOutputObjectSchema = z.object({
	id: positiveIntSchema,
	name: employeeNameSchema,
	status: employeeStatusEnumSchema,
	readiness_score: employeeRdsScoreSchema,
	created_at: z.iso.datetime()
});

export type EmployeesGetOutputObjectDto = z.infer<typeof employeesGetOutputObjectSchema>;

export const employeesPatchIdInputBodyObjectSchema = z.object({
	status: employeeStatusEnumSchema.nullish(),
	readiness_score: employeeRdsScoreSchema.nullish()
}).refine(obj => Object.keys(obj).length > 0, 'Тело запроса не может быть пустым.');

export type EmployeesPatchIdInputBodyObjectDto = z.infer<typeof employeesPatchIdInputBodyObjectSchema>;

export const employeesPatchIdDeleteIdInputParamsObjectSchema = z.object({
	id: positiveIntSchema
});

export const employeesPatchIdValidation = {
	params: employeesPatchIdDeleteIdInputParamsObjectSchema,
	body: employeesPatchIdInputBodyObjectSchema
}

export const employeesDeleteIdValidation = {
	params: employeesPatchIdDeleteIdInputParamsObjectSchema
}

export type EmployeesPatchIdRequest = Parameters<TypedRequestHandler<typeof employeesPatchIdValidation>>[0];
export type EmployeesDeleteIdRequest = Parameters<TypedRequestHandler<typeof employeesDeleteIdValidation>>[0];
