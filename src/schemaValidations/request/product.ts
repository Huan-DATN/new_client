import { z } from 'zod';

export const SearchProductQuery = z
	.object({
		name: z.string().optional(),
		groupProductId: z.coerce.number().optional(),
		cityId: z.coerce.number().optional(),
	})
	.passthrough();
export type SearchProductQueryType = z.infer<typeof SearchProductQuery>;
