import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import type { JwtUserPayload } from "../types/express.js";

export default function (req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;

	if (!(authHeader && authHeader.startsWith('Bearer '))) return res.status(401).json({ success: false, error: 'Отсутствует Bearer-токен.' });

	try {
		const decoded = jwt.verify(authHeader.substring(7), process.env.JWT_SECRET!) as JwtUserPayload;

		req.user = decoded;

		next();
	} catch (e) {
		res.status(401).json({ success: false, error: 'Неверный или просроченный токен.'});
	}
}
