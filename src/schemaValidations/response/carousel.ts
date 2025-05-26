import { z } from 'zod';
import { CarouselItemSchema } from '../schema';

export const CarouselListRes = z.object({
	data: z.array(CarouselItemSchema),
	meta: z
		.object({
			total: z.number().optional(),
			totalPages: z.number().optional(),
		})
		.optional(),
	message: z.string(),
});

export const CarouselRes = z.object({
	data: CarouselItemSchema,
	message: z.string(),
});

export type CarouselResType = z.infer<typeof CarouselRes>;
export type CarouselListResType = z.infer<typeof CarouselListRes>;
export type CarouselItemType = z.infer<typeof CarouselItemSchema>;
