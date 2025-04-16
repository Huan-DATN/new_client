import { z } from 'zod';
import { ProductSchema } from '../schema';

export const ProductListRes = z.object({
	data: z.array(ProductSchema),
	meta: z.object({
		total: z.number(),
		totalPages: z.number(),
	}),
	message: z.string(),
});

export type ProductListResType = z.infer<typeof ProductListRes>;
