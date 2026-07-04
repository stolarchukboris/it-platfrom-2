import type { Request, Response, NextFunction } from "express";
import type { UserRole } from "../types/express.js";
import { rolesOrdered } from "../constants/userRoles.js";

export default function (minRole: UserRole) {
	return function (req: Request, res: Response, next: NextFunction) {
		if (!req.user) return res.status(401).json({ success: false, error: 'Пользователь не аутентифицирован.' });

		if (rolesOrdered.indexOf(req.user.role) < rolesOrdered.indexOf(minRole))
			return res.status(403).json({ success: false, error: 'Доступ запрещен. Недостаточно прав.' });

		next();
	}
}
