import { z } from 'zod';

// Define schema for carousel items
export const CarouselItemSchema = z.object({
	id: z.number().int(),
	title: z.string(),
	imageId: z.number().int(),
	linkUrl: z.string(),
	order: z.number().int(),
	isActive: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// Define request schema
export const CreateCarouselItemSchema = z.object({
	title: z.string(),
	imageId: z.number().int(),
	linkUrl: z.string(),
	order: z.number().int().optional(),
	isActive: z.boolean().optional(),
});

export const UpdateCarouselItemSchema = z.object({
	title: z.string().optional(),
	imageId: z.number().int().optional(),
	linkUrl: z.string().optional(),
	order: z.number().int().optional(),
	isActive: z.boolean().optional(),
});

export const ToggleStatusSchema = z.object({
	isActive: z.boolean(),
});

// Define response types
export type CarouselItem = z.infer<typeof CarouselItemSchema>;
export type CreateCarouselItemRequest = z.infer<
	typeof CreateCarouselItemSchema
>;
export type UpdateCarouselItemRequest = z.infer<
	typeof UpdateCarouselItemSchema
>;
export type ToggleStatusRequest = z.infer<typeof ToggleStatusSchema>;
