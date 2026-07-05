import type { Response } from "express";
import app from "../../index.js";
import type { TasksDeleteIdRequest, TasksGetOutputObjectDto } from "../../schemas/tasks.js";

export default async function (req: TasksDeleteIdRequest, res: Response) {
	const existingTask = await app.database<TasksGetOutputObjectDto>('tasks')
		.select('*')
		.where('id', req.params.id)
		.first();

	if (!existingTask) {
		res.status(404).json({ success: false, error: `Задание ${req.params.id} не найдено.` });
		return;
	}

	await app.database<TasksGetOutputObjectDto>('tasks').del().where('id', req.params.id);

	res.status(200).json({ message: `Задание ${req.params.id} удалено.` });
}
