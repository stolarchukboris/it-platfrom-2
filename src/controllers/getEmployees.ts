import type { Request, Response } from "express";
import app from "../index.js";
import type { EmployeeOutputObjectDto } from "../types/zod.js";

export default async function (req: Request, res: Response) {
	const employees = await app.database<EmployeeOutputObjectDto>('employees').select('*');

	res.status(200).json({ data: employees });
}
