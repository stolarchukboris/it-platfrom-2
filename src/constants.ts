import type { EmployeeStatus, PriorityLevel, TaskStatus, UserRole } from "./types/express.js";

export const rolesOrdered: readonly UserRole[] = ['viewer', 'mentor', 'admin'];
export const priorityLevels: readonly PriorityLevel[] = ['low', 'medium', 'high'];
export const employeeStatuses: readonly EmployeeStatus[] = ['active', 'blocked', 'finished'];
export const taskStatuses: readonly TaskStatus[] = ['todo', 'in_progress', 'review', 'done'];
