import z from "zod";
import type { TypedRequestHandler } from "../types/requestTypes.js";
import { priorityLevels, taskStatuses } from "../constants.js";
import { positiveIntSchema } from "./common.js";

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

export const tasksGetInputQueryObjectSchema = z.object({
	status: statusSchema.nullish(),
	assigneeId: positiveIntSchema.nullish()
}).strict();

export type TasksGetInputQueryObjectDto = z.infer<typeof tasksGetInputQueryObjectSchema>;

export const tasksGetInputQueryValidation = {
	query: tasksGetInputQueryObjectSchema
}

export type TasksGetInputQueryRequest = Parameters<TypedRequestHandler<typeof tasksGetInputQueryValidation>>[0];

export const tasksGetIdInputParamsObjectSchema = z.object({
	id: positiveIntSchema
});

export const tasksGetIdInputParamsValidation = {
	params: tasksGetIdInputParamsObjectSchema
}

export type TasksGetIdInputParamsRequest = Parameters<TypedRequestHandler<typeof tasksGetIdInputParamsValidation>>[0];

export const tasksPostInputBodyObjectSchema = z.object({
	title: titleSchema,
	assignee_id: positiveIntSchema,
	status: statusSchema.default('todo'),
	deadline: deadlineSchema,
	priority: prioritySchema.default('low')
});

export type tasksPostInputBodyObjectDto = z.infer<typeof tasksPostInputBodyObjectSchema>;

export const tasksPatchIdInputParamsObjectSchema = tasksGetIdInputParamsObjectSchema;
export const tasksPatchIdInputBodyObjectSchema = z.object({
	status: statusSchema.nullish(),
	priority: prioritySchema.nullish()
}).refine(obj => Object.keys(obj).length > 0, 'Тело запроса не может быть пустым.');

export type TasksPatchIdInputBodyObjectDto = z.infer<typeof tasksPatchIdInputBodyObjectSchema>;

export const tasksPatchIdInputValidation = {
	params: tasksPatchIdInputParamsObjectSchema,
	body: tasksPatchIdInputBodyObjectSchema
}

export type tasksPatchIdRequest = Parameters<TypedRequestHandler<typeof tasksPatchIdInputValidation>>[0];

export const tasksDeleteIdInputParamsObjectSchema = tasksGetIdInputParamsObjectSchema;
export const tasksDeleteIdInputValidation = {
	params: tasksDeleteIdInputParamsObjectSchema
}

export type TasksDeleteIdRequest = Parameters<TypedRequestHandler<typeof tasksDeleteIdInputValidation>>[0];
