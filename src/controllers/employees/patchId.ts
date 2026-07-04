import type { Response } from "express";
import app from "../../index.js";
import type { EmployeesGetOutputObjectDto, EmployeesPatchController, EmployeesPatchInputBodyObjectDto } from "../../types/zod/employees.js";

type EmployeesPatchReq = Parameters<EmployeesPatchController>[0];

export default async function (req: EmployeesPatchReq, res: Response) {
	const existingEmployee = await app.database<EmployeesGetOutputObjectDto>('employees')
		.select('*')
		.where('id', req.params.id)
		.first();

	if (!existingEmployee) {
		res.status(404).json({ success: false, error: 'Сотрудник не найден.' });
		return;
	}

	function hasChanges(currentData: Record<string, any>, incomingData: Record<string, any>): boolean {
		return Object.keys(incomingData).some(key => {
			if (incomingData[key] === undefined) return false;

			return currentData[key] !== incomingData[key];
		});
	}

	if (!hasChanges(existingEmployee, req.body)) {
		res.status(200).json({ message: 'Изменений не обнаружено.', data: existingEmployee });
		return;
	}

	await app.database<EmployeesPatchInputBodyObjectDto>('employees').update(req.body).where('id', req.params.id);

	const employee = await app.database<EmployeesGetOutputObjectDto>('employees')
		.select('*')
		.where('id', req.params.id)
		.first();

	res.status(200).json({ message: 'Сотрудник обновлен.', data: employee });
}
