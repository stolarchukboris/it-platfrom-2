import z from "zod";

export const idSchema = z.coerce.number('Ожидается число.')
	.int('Ожидается целочисленное значение.')
	.positive('Ожидается положительное значение.');
