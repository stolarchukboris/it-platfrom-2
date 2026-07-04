export type UserRole = 'viewer' | 'mentor' | 'admin';

export interface JwtUserPayload {
	id: number;
	email: string;
	role: UserRole
}

declare global {
	namespace Express {
		interface Request {
			user?: JwtUserPayload;
		}
	}
}
