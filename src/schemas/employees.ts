import z from "zod";
import { employeeStatuses } from "../constants.js";
import { buildEnumSchema, idInputParamSchema, positiveIntSchema } from "./common.js";
import type { TypedRequest } from "../types/requestTypes.js";

const employeeStatusEnumSchema = buildEnumSchema(employeeStatuses);
const employeeNameSchema = z.string('Ожидается строковый тип.').trim().max(50, 'Предельная длина имени - 50 символов.');
const employeeRdsScoreSchema = z.int('Ожидается целочисленное значение.')
	.nonnegative('Ожидается неотрицательное значение.')
	.max(100, 'Ожидается значение не больше 100.');

export const employeesGetOutputObjectSchema = z.object({
	id: positiveIntSchema,
	name: employeeNameSchema,
	status: employeeStatusEnumSchema,
	readiness_score: employeeRdsScoreSchema,
	created_at: z.iso.datetime()
});

export type EmployeesGetOutputObjectDto = z.infer<typeof employeesGetOutputObjectSchema>;

export const employeesPostInputBodyObjectSchema = employeesGetOutputObjectSchema.pick({ 'name': true }).extend({
	status: employeeStatusEnumSchema.default('active'),
	readiness_score: employeeRdsScoreSchema.default(0)
});

export type EmployeesPostInputBodyObjectDto = z.infer<typeof employeesPostInputBodyObjectSchema>;

const employeesPatchIdInputBodyObjectSchema = employeesGetOutputObjectSchema.pick({ 'status': true, 'readiness_score': true }).extend({
	status: employeeStatusEnumSchema.nullish(),
	readiness_score: employeeRdsScoreSchema.nullish()
}).refine(obj => Object.keys(obj).length > 0, 'Тело запроса не может быть пустым.');

export type EmployeesPatchIdInputBodyObjectDto = z.infer<typeof employeesPatchIdInputBodyObjectSchema>;

export const employeesPatchIdValidation = {
	params: idInputParamSchema,
	body: employeesPatchIdInputBodyObjectSchema
}

export const employeesDeleteIdValidation = {
	params: idInputParamSchema
}

export type EmployeesPatchIdRequest = TypedRequest<typeof employeesPatchIdValidation>;
export type EmployeesDeleteIdRequest = TypedRequest<typeof employeesDeleteIdValidation>;
