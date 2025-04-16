import { z } from 'zod';

export const UpdateCartItemBody = z
	.object({
		quantity: z.number().min(1),
	})
	.strict();

export type UpdateCartItemBodyType = z.TypeOf<typeof UpdateCartItemBody>;
