import type { Request, Response } from "express";
import type { tasksPostInputBodyObjectDto } from "../../schemas/tasks.js";
import app from '../../index.js';
import type { EmployeesGetOutputObjectDto } from "../../schemas/employees.js";

export default async function (req: Request<{}, {}, tasksPostInputBodyObjectDto>, res: Response) {
	const existingEmployee = await app.database<EmployeesGetOutputObjectDto>('employees')
		.select('*')
		.where('id', req.body.assignee_id)
		.first();

	if (!existingEmployee) return res.status(404).json({ success: false, error: `Сотрудник с ID ${req.body.assignee_id} не найден.` });

	const [taskId] = await app.database<tasksPostInputBodyObjectDto>('tasks').insert(req.body);

	res.status(201).json({ message: `Задание создано.`, data: { id: taskId, ...req.body } });
}
