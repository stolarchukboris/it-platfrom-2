import type { EmployeeStatus, PriorityLevel, ReviewResult, TaskStatus, UserRole } from "./types/express.js";

export const rolesOrdered: readonly UserRole[] = ['viewer', 'mentor', 'admin'];
export const priorityLevels: readonly PriorityLevel[] = ['low', 'medium', 'high'];
export const employeeStatuses: readonly EmployeeStatus[] = ['active', 'blocked', 'finished'];
export const taskStatuses: readonly TaskStatus[] = ['todo', 'in_progress', 'review', 'done'];
export const reviewResults: readonly ReviewResult[] = ['ready', 'not_ready', 'repeat_sprint'];
