import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { z, ZodObject } from 'zod';

interface RequestValidationSchemas {
	body?: ZodObject;
	query?: ZodObject;
	params?: ZodObject;
}

type TypedRequestHandler<T extends RequestValidationSchemas> = (
	req: Request<
		T['params'] extends ZodObject ? z.infer<T['params']> & Record<string, any> : any,
		any,
		T['body'] extends ZodObject ? z.infer<T['body']> : any,
		T['query'] extends ZodObject ? z.infer<T['query']> : any
	>,
	res: Response,
	next: NextFunction
) => void | Promise<void>;

export type TypedRequest<T extends RequestValidationSchemas> = Parameters<TypedRequestHandler<T>>[0];

export function createHandler<T extends RequestValidationSchemas>(handler: TypedRequestHandler<T>): RequestHandler {
	return handler as unknown as RequestHandler;
}
