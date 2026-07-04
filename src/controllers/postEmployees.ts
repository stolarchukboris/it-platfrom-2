import type { Request, Response } from "express";
import app from "../index.js";
import type { EmployeeOutputObjectDto, EmployeeInputBodyObjectDto } from "../types/zod.js";

export default async function (req: Request<{}, {}, EmployeeInputBodyObjectDto>, res: Response) {
	await app.database<EmployeeInputBodyObjectDto>('employees').insert(req.body);

	const employee = await app.database<EmployeeOutputObjectDto>('employees')
		.select('*')
		.orderBy('created_at', 'desc')
		.first();

	res.status(201).json({ message: 'Сотрудник создан.', data: employee });
}
