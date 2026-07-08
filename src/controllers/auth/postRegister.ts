import type { Request, Response } from "express";
import type { AuthMeGetOutputObjectDto, AuthRegisterPostInputBodyObjectDto } from "../../schemas/auth.js";
import app from '../../index.js';
import bcrypt from "bcryptjs";

export default async function (req: Request<{}, {}, AuthRegisterPostInputBodyObjectDto>, res: Response) {
	const existingUser = await app.database<AuthRegisterPostInputBodyObjectDto>('users').select('*').where('email', req.body.email).first();

	if (existingUser) return res.status(409).json({
		success: false,
		error: 'Пользователь с таким email-адресом уже существует.'
	});

	const hashedPass = await bcrypt.hash(req.body.password, 12);

	await app.database<AuthMeGetOutputObjectDto>('users').insert({
		email: req.body.email,
		password_hash: hashedPass
	});

	res.status(201).json({ message: 'Пользователь зарегистрирован.' });
}
