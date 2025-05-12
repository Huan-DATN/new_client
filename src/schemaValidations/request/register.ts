import { z } from 'zod';

export const UserRegisterBody = z
	.object({
		role: z.literal('BUYER'),
		firstName: z.string().trim().min(2).max(256),
		lastName: z.string().trim().min(2).max(256),
		email: z.string().email(),
		password: z.string().min(6).max(100),
		confirmPassword: z.string().min(6).max(100),
	})
	.strict()
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Mật khẩu không khớp',
				path: ['confirmPassword'],
			});
		}
	});

export const SellerRegisterBody = z
	.object({
		role: z.literal('SELLER'),
		shopName: z.string().trim().min(2).max(256),
		phone: z.string().trim().min(8).max(15),
		email: z.string().email(),
		password: z.string().min(6).max(100),
		confirmPassword: z.string().min(6).max(100),
	})
	.strict()
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Mật khẩu không khớp',
			});
		}
	});

export type UserRegisterBodyType = z.TypeOf<typeof UserRegisterBody>;
export type SellerRegisterBodyType = z.TypeOf<typeof SellerRegisterBody>;
