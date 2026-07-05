import type { Response } from "express";
import type { TasksGetOutputObjectDto, TasksGetIdInputParamsRequest } from "../../schemas/tasks.js";
import app from '../../index.js';

export default async function (req: TasksGetIdInputParamsRequest, res: Response) {
	const task = await app.database<TasksGetOutputObjectDto>('tasks')
		.select('*')
		.where('id', req.params.id)
		.first();

	if (!task) {
		res.status(404).json({ success: false, error: `Задание ${req.params.id} не найдено.` });
		return;
	}

	res.status(200).json({ data: task });
}
