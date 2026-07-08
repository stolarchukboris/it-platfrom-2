import z from "zod";
import { priorityLevels, taskStatuses } from "../constants.js";
import { idInputParamSchema, positiveIntSchema } from "./common.js";
import type { TypedRequest } from "../types/requestTypes.js";

const titleSchema = z.string('Ожидается строковое значение.')
	.trim()
	.min(4, 'Минимальная длина названия задания - 4 символа.')
	.max(100, 'Максимальная длина названия задания - 100 символов.');

const statusSchema = z.enum(taskStatuses, `Ожидается одно из: ${taskStatuses}.`);
const deadlineSchema = z.coerce.date('Ожидается дата формата ГГГГ-ММ-ДД').min(new Date(), 'Дедлайн не может быть в прошлом.');
const prioritySchema = z.enum(priorityLevels, `Ожидается одно из: ${priorityLevels}.`);

export const tasksGetOutputObjectSchema = z.object({
	id: positiveIntSchema,
	title: titleSchema,
	assignee_id: positiveIntSchema,
	status: statusSchema,
	deadline: deadlineSchema,
	priority: prioritySchema,
	created_at: z.iso.datetime()
});

export type TasksGetOutputObjectDto = z.infer<typeof tasksGetOutputObjectSchema>;

const tasksGetInputQueryObjectSchema = tasksGetOutputObjectSchema.pick({ 'status': true, 'assignee_id': true }).extend({
	status: statusSchema.nullish(),
	assignee_id: positiveIntSchema.nullish()
}).strict();

export const tasksGetInputQueryValidation = {
	query: tasksGetInputQueryObjectSchema
}

export type TasksGetInputQueryRequest = TypedRequest<typeof tasksGetInputQueryValidation>;

export const tasksGetIdInputParamsValidation = {
	params: idInputParamSchema
}

export type TasksGetIdInputParamsRequest = TypedRequest<typeof tasksGetIdInputParamsValidation>;

export const tasksPostInputBodyObjectSchema = tasksGetOutputObjectSchema.omit({ 'id': true, 'created_at': true }).extend({
	status: statusSchema.default('todo'),
	priority: prioritySchema.default('low')
});

export type tasksPostInputBodyObjectDto = z.infer<typeof tasksPostInputBodyObjectSchema>;

const tasksPatchIdInputBodyObjectSchema = tasksGetOutputObjectSchema.pick({ 'status': true, 'priority': true }).extend({
	status: statusSchema.nullish(),
	priority: prioritySchema.nullish()
}).refine(obj => Object.keys(obj).length > 0, 'Тело запроса не может быть пустым.');

export type TasksPatchIdInputBodyObjectDto = z.infer<typeof tasksPatchIdInputBodyObjectSchema>;

export const tasksPatchIdInputValidation = {
	params: idInputParamSchema,
	body: tasksPatchIdInputBodyObjectSchema
}

export type tasksPatchIdRequest = TypedRequest<typeof tasksPatchIdInputValidation>;

export const tasksDeleteIdInputValidation = {
	params: idInputParamSchema
}

export type TasksDeleteIdRequest = TypedRequest<typeof tasksDeleteIdInputValidation>;
