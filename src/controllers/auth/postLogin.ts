import type { Request, Response } from "express";
import type { AuthLoginPostInputBodyObjectDto, AuthMeGetOutputObjectDto } from "../../types/zod/auth.js";
import app from '../../index.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function (req: Request<{}, {}, AuthLoginPostInputBodyObjectDto>, res: Response) {
	const existingUser = await app.database<AuthMeGetOutputObjectDto>('users').select('*').where('email', req.body.email).first();

	if (!(existingUser && await bcrypt.compare(req.body.password, existingUser.password_hash))) return res.status(401).json({
		success: false,
		error: 'Неверный email или пароль.'
	});

	const token = jwt.sign({
		id: existingUser.id,
		email: existingUser.email,
		role: existingUser.role
	}, process.env.JWT_SECRET!, { expiresIn: '1d' });

	res.status(200).json({ token });
}
