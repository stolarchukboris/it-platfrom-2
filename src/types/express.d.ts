export type UserRole = 'viewer' | 'mentor' | 'admin';
export type PriorityLevel = 'low' | 'medium' | 'high';
export type EmployeeStatus = 'active' | 'blocked' | 'finished';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type ReviewResult = 'ready' | 'not_ready' | 'repeat_sprint';

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
