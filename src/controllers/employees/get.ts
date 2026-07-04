import type { Request, Response } from "express";
import app from "../../index.js";
import type { EmployeesGetOutputObjectDto } from "../../types/zod/employees.js";

export default async function (req: Request, res: Response) {
	const employees = await app.database<EmployeesGetOutputObjectDto>('employees').select('*');

	res.status(200).json({ data: employees });
}
