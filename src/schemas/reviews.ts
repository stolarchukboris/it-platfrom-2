import z from "zod";
import { buildEnumSchema, positiveIntSchema } from "./common.js";
import { reviewResults } from "../constants.js";

const gradeSchema = positiveIntSchema.max(5, 'Максимальная оценка - 5 баллов.');
const feedbackSchema = z.string('Ожидается строковый тип').trim().max(65535, 'Максимальная длина отзыва - 65535 символов.').nullish();
const resultSchema = buildEnumSchema(reviewResults);

export const reviewsGetIdOutputObjectSchema = z.object({
	id: positiveIntSchema,
	employee_id: positiveIntSchema,
	mentor_id: positiveIntSchema.nullish(),
	code_quality: gradeSchema,
	communication: gradeSchema,
	independence: gradeSchema,
	speed: gradeSchema,
	feedback: feedbackSchema,
	result: resultSchema,
	created_at: z.iso.datetime()
});

export type ReviewsGetIdOutputObjectDto = z.infer<typeof reviewsGetIdOutputObjectSchema>;

const reviewsPostInputObjectSchema = reviewsGetIdOutputObjectSchema
	.omit({ 'id': true, 'created_at': true })
	.extend({ mentor_id: positiveIntSchema });

export type ReviewsPostInputObjectDto = z.infer<typeof reviewsPostInputObjectSchema>;

export const reviewsPostInputBodyObjectSchema = reviewsPostInputObjectSchema.omit({ 'mentor_id': true });

export type ReviewsPostInputBodyObjectDto = z.infer<typeof reviewsPostInputBodyObjectSchema>;
