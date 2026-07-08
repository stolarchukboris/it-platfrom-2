import type { Request, Response } from "express";
import app from "../../index.js";
import type { EmployeesPostInputBodyObjectDto } from "../../schemas/employees.js";

export default async function (req: Request<{}, {}, EmployeesPostInputBodyObjectDto>, res: Response) {
	const [employeeId] = await app.database<EmployeesPostInputBodyObjectDto>('employees').insert(req.body);

	res.status(201).json({ message: 'Сотрудник создан.', data: { id: employeeId, ...req.body } });
}
