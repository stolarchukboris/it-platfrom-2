import type { Response } from "express";
import type { TasksGetOutputObjectDto, TasksGetInputQueryRequest } from "../../schemas/tasks.js";
import app from '../../index.js';

export default async function (req: TasksGetInputQueryRequest, res: Response) {
	const selectFields: string[] = ['id', 'title', 'deadline', 'priority'];

	const query = app.database<TasksGetOutputObjectDto>('tasks');

	req.query.assignee_id ? query.where('assignee_id', req.query.assignee_id) : selectFields.push('assignee_id');
	req.query.status ? query.where('status', req.query.status) : selectFields.push('status');

	const tasks = await query.select(selectFields);

	res.status(200).json({ data: tasks });
}
