import type { Response } from "express";
import app from "../../index.js";
import type { EmployeesDeleteIdRequest, EmployeesGetOutputObjectDto } from "../../schemas/employees.js";

export default async function (req: EmployeesDeleteIdRequest, res: Response) {
	const existingEmployee = await app.database<EmployeesGetOutputObjectDto>('employees')
		.select('*')
		.where('id', req.params.id)
		.first();

	if (!existingEmployee) {
		res.status(404).json({ success: false, error: `Сотрудник ${req.params.id} не найден.` });
		return;
	}

	await app.database<EmployeesGetOutputObjectDto>('employees').del().where('id', req.params.id);

	res.status(200).json({ message: `Сотрудник ${req.params.id} удален.` });
}
