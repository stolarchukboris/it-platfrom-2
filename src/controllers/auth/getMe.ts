import type { Request, Response } from "express";
import type { AuthMeGetOutputObjectDto } from "../../schemas/auth.js";
import app from '../../index.js';

export default async function (req: Request, res: Response) {
	if (!req.user) return res.status(401).json({ success: false, error: 'Пользователь не аутентифицирован' });

	const dbEntry = await app.database<AuthMeGetOutputObjectDto>('users')
		.select('*')
		.where('email', req.user.email)
		.first();

	if (!dbEntry) return res.status(404).json({ success: false, error: 'Пользователь не найден.' });

	res.status(200).json({
		id: dbEntry.id,
		email: dbEntry.email,
		role: dbEntry.role,
		created_at: dbEntry.created_at
	});
}
