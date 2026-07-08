import type { Response } from "express";
import app from "../../index.js";
import type { TasksGetOutputObjectDto, tasksPatchIdRequest, TasksPatchIdInputBodyObjectDto } from "../../schemas/tasks.js";

export default async function (req: tasksPatchIdRequest, res: Response) {
	const existingTask = await app.database<TasksGetOutputObjectDto>('tasks')
		.select('*')
		.where('id', req.params.id)
		.first();

	if (!existingTask) {
		res.status(404).json({ success: false, error: `Задание ${req.params.id} не найдено.` });
		return;
	}

	function hasChanges(currentData: Record<string, any>, incomingData: Record<string, any>): boolean {
		return Object.keys(incomingData).some(key => {
			if (incomingData[key] === undefined) return false;

			return currentData[key] !== incomingData[key];
		});
	}

	if (!hasChanges(existingTask, req.body)) {
		res.status(200).json({ message: `Изменений в задании ${req.params.id} не обнаружено.`, data: existingTask });
		return;
	}

	await app.database<TasksPatchIdInputBodyObjectDto>('tasks').update(req.body).where('id', req.params.id);

	const task = await app.database<TasksGetOutputObjectDto>('tasks')
		.select('*')
		.where('id', req.params.id)
		.first();

	res.status(200).json({ message: `Задание ${req.params.id} обновлено.`, data: task });
}
