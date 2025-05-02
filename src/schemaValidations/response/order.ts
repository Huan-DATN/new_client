import { z } from 'zod';
import { CartItemSchema, OrderDetailSchema, UserSchema } from '../schema';

export const CheckoutOrderRes = z.object({
	message: z.string(),
	data: z.object({
		shop: UserSchema,
		cartItems: z.array(CartItemSchema),
		totalPrice: z.number(),
	}),
});

export type CheckoutOrderResType = z.infer<typeof CheckoutOrderRes>;

export const OrderListRes = z.object({
	message: z.string(),
	data: z.array(OrderDetailSchema),
});

export type OrderListResType = z.infer<typeof OrderListRes>;

export const OrderDetailRes = z.object({
	message: z.string(),
	data: OrderDetailSchema,
});

export type OrderDetailResType = z.infer<typeof OrderDetailRes>;
