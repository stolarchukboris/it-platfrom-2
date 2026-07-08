import type { Response } from "express";
import app from '../../index.js';
import type { ReviewsGetIdOutputObjectDto, ReviewsGetIdRequest } from "../../schemas/reviews.js";
import type { EmployeesGetOutputObjectDto } from "../../schemas/employees.js";

export default async function (req: ReviewsGetIdRequest, res: Response) {
	const existingEmployee = await app.database<EmployeesGetOutputObjectDto>('employees')
		.select('*')
		.where('id', req.params.id)
		.first();

	if (!existingEmployee) {
		res.status(404).json({ success: false, error: `Сотрудник ${req.params.id} не найден.` });
		return;
	}

	const reviews = await app.database<ReviewsGetIdOutputObjectDto>('reviews')
		.select('*')
		.where('employee_id', req.params.id);

	res.status(200).json({ data: reviews });
}
