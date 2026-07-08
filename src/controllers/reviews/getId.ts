import type { Response } from "express";
import app from '../../index.js';
import type { ReviewsGetIdOutputObjectDto, ReviewsGetIdRequest } from "../../schemas/reviews.js";

export default async function (req: ReviewsGetIdRequest, res: Response) {
	const review = await app.database<ReviewsGetIdOutputObjectDto>('reviews')
		.select('*')
		.where('id', req.params.id)
		.first();

	if (!review) {
		res.status(404).json({ success: false, error: `Ревью ${req.params.id} не найдено.` });
		return;
	}

	res.status(200).json({ data: review });
}
