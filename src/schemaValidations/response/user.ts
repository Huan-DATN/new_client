import { z } from 'zod';
import { UserSchema } from '../schema';

export const ShopsListRes = z.object({
	data: z.array(
		z.object({
			id: z.number(),
			shopName: z.string(),
			address: z.string(),
			productsTotal: z.number(),
			image: z
				.object({
					id: z.number().int(),
					publicUrl: z.string(),
				})
				.optional(),
		})
	),
	meta: z.object({
		total: z.number(),
		totalPages: z.number(),
	}),
	message: z.string(),
});

export type ShopsListResType = z.TypeOf<typeof ShopsListRes>;

export const ShopRes = z.object({
	data: z.object({
		id: z.number(),
		shopName: z.string(),
		address: z.string(),
		productsTotal: z.number(),
		firstName: z.string(),
		lastName: z.string(),
		phone: z.string(),
		email: z.string(),
		image: z
			.object({
				id: z.number().int(),
				publicUrl: z.string(),
			})
			.optional(),
	}),
	message: z.string(),
});

export type ShopResType = z.TypeOf<typeof ShopRes>;

export const UserListRes = z.object({
	data: z.array(UserSchema),
	meta: z.object({
		total: z.number(),
		totalPages: z.number(),
	}),
});

export type UserListResType = z.TypeOf<typeof UserListRes>;
