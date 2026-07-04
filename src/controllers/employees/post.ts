import type { Request, Response } from "express";
import app from "../../index.js";
import type { EmployeesGetOutputObjectDto, EmployeesPostInputBodyObjectDto } from "../../types/zod/employees.js";

export default async function (req: Request<{}, {}, EmployeesPostInputBodyObjectDto>, res: Response) {
	await app.database<EmployeesPostInputBodyObjectDto>('employees').insert(req.body);

	const employee = await app.database<EmployeesGetOutputObjectDto>('employees')
		.select('*')
		.orderBy('created_at', 'desc')
		.first();

	res.status(201).json({ message: 'Сотрудник создан.', data: employee });
}
