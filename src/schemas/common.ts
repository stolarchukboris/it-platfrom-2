import z from "zod";

export const positiveIntSchema = z.coerce.number('Ожидается число.')
	.int('Ожидается целочисленное значение.')
	.positive('Ожидается положительное значение.');

export function buildEnumSchema<T extends string>(values: readonly T[]) {
	return z.enum(values, `Ожидается одно из: ${values}.`);
}
