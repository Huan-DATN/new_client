import { z } from 'zod';

export const CategoryWithProductCountSchema = z.object({
	id: z.number(),
	name: z.string(),
	isActive: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
	_count: z.object({
		products: z.number(),
	}),
});

export type CategoryWithProductCount = z.infer<
	typeof CategoryWithProductCountSchema
>;

export const categoriesResponseSchema = z.object({
	data: z.array(CategoryWithProductCountSchema),
	meta: z.object({
		totalPages: z.number(),
		totalCount: z.number(),
		limit: z.number(),
	}),
	message: z.string(),
});

export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>;

export const categoryResponseSchema = z.object({
	message: z.string(),
	data: CategoryWithProductCountSchema,
});

export type CategoryResponse = z.infer<typeof categoryResponseSchema>;
