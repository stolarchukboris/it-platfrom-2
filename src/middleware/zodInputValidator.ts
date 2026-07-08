import z from "zod";
import type { Request, Response, NextFunction } from "express";

export default function (schemas: {
	body?: z.ZodObject,
	query?: z.ZodObject,
	params?: z.ZodObject
}) {
	return function (req: Request, res: Response, next: NextFunction) {
		try {
			if (schemas.body) req.body = schemas.body.parse(req.body);
			if (schemas.query) {
				const validated = schemas.query.parse(req.query);

				Object.keys(req.query).forEach(key => delete (req.query)[key]);

				Object.assign(req.query, validated);
			}
			if (schemas.params) req.params = schemas.params.parse(req.params) as any;

			next();
		} catch (e) {
			if (!(e instanceof z.ZodError)) return next(e);

			return res.status(400).json({
				success: false,
				errors: e.issues.map(issue => ({
					field: issue.path.join('.'),
					message: issue.message
				}))
			});
		}
	}
}
