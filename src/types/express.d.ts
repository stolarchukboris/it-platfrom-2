export type UserRole = 'viewer' | 'mentor' | 'admin';
export type PriorityLevel = 'low' | 'medium' | 'high';
export type EmployeeStatus = 'active' | 'blocked' | 'finished';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

export interface JwtUserPayload {
	id: number;
	email: string;
	role: UserRole;
}

declare global {
	namespace Express {
		interface Request {
			user?: JwtUserPayload;
		}
	}
}
