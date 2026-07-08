import type { Response } from "express";
import app from "../../index.js";
import type { EmployeesGetOutputObjectDto, EmployeesPatchIdRequest, EmployeesPatchIdInputBodyObjectDto } from "../../schemas/employees.js";

export default async function (req: EmployeesPatchIdRequest, res: Response) {
	const existingEmployee = await app.database<EmployeesGetOutputObjectDto>('employees')
		.select('*')
		.where('id', req.params.id)
		.first();

	if (!existingEmployee) {
		res.status(404).json({ success: false, error: `Сотрудник ${req.params.id} не найден.` });
		return;
	}

	function hasChanges(currentData: Record<string, any>, incomingData: Record<string, any>): boolean {
		return Object.keys(incomingData).some(key => {
			if (incomingData[key] === undefined) return false;

			return currentData[key] !== incomingData[key];
		});
	}

	if (!hasChanges(existingEmployee, req.body)) {
		res.status(200).json({ message: `Изменений в данных сотрудника ${req.params.id} не обнаружено.`, data: existingEmployee });
		return;
	}

	await app.database<EmployeesPatchIdInputBodyObjectDto>('employees').update(req.body).where('id', req.params.id);

	const employee = await app.database<EmployeesGetOutputObjectDto>('employees')
		.select('*')
		.where('id', req.params.id)
		.first();

	res.status(200).json({ message: `Сотрудник ${req.params.id} обновлен.`, data: employee });
}
