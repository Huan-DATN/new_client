import { z } from 'zod';
import { CartItemSchema } from '../schema';

export const Cart = z.object({
	shop: z.object({
		id: z.number().int(),
		shopName: z.string().nullable().optional(),
		phone: z.string().nullable().optional(),
		address: z.string().nullable().optional(),
	}),
	cartItems: z.array(CartItemSchema),
	totalPrice: z.number(),
});

export type CartType = z.TypeOf<typeof Cart>;

export const CartRes = z.object({
	data: z.array(Cart),
	message: z.string(),
});

export type CartResType = z.TypeOf<typeof CartRes>;
