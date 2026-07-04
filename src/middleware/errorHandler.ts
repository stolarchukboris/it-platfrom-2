import type { NextFunction, Request, Response } from "express";

interface HttpError extends Error {
	status?: number;
	statusCode?: number;
}

export default function (error: HttpError, req: Request, res: Response, next: NextFunction) {
	console.error(`[ERR] ${error.stack || error.message}`);

	const statusCode = error.statusCode || error.status || 500;
	const isDev = process.env.NODE_ENV === 'development';

	res.status(statusCode).json({
		success: false,
		error: {
			message: isDev || statusCode < 500
				? error.message
				: "Внутренняя ошибка сервера",
			...(isDev && { stack: error.stack }),
		}
	});
}
