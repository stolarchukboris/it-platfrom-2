import type { Request, Response } from "express";
import app from "../../index.js";
import type { ReviewsPostInputBodyObjectDto, ReviewsPostInputObjectDto } from "../../schemas/reviews.js";
import type { EmployeesGetOutputObjectDto } from "../../schemas/employees.js";

export default async function (req: Request<{}, {}, ReviewsPostInputBodyObjectDto>, res: Response) {
	const existingEmployee = await app.database<EmployeesGetOutputObjectDto>('employees')
		.select('*')
		.where('id', req.body.employee_id)
		.first();

	if (!existingEmployee) return res.status(404).json({ success: false, error: `Сотрудник с ID ${req.body.employee_id} не найден.` });

	const [reviewId] = await app.database<ReviewsPostInputObjectDto>('reviews').insert({ ...req.body, mentor_id: req.user!.id });

	res.status(201).json({
		message: `Ревью для сотрудника ${req.body.employee_id} создано.`,
		data: {
			id: reviewId, mentor_id: req.user!.id, ...req.body
		}
	});
}
