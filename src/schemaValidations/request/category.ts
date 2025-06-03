import { z } from 'zod';

export const createCategoryRequestSchema = z.object({
	name: z
		.string()
		.min(1, 'Tên danh mục không được để trống')
		.min(2, 'Tên danh mục phải có ít nhất 2 ký tự')
		.max(100, 'Tên danh mục không được vượt quá 100 ký tự')
		.trim(),
	isActive: z.boolean(),
});

export type CreateCategoryRequest = z.infer<typeof createCategoryRequestSchema>;
export type UpdateCategoryRequest = z.infer<typeof createCategoryRequestSchema>;
