import z from 'zod';
import { UserSchema } from './schema';

export const UserRes = z
	.object({
		data: UserSchema,
		message: z.string(),
	})
	.strict();

export type UserResType = z.TypeOf<typeof UserRes>;

export const UpdateMeBody = z.object({
	name: z.string().trim().min(2).max(256),
	phone: z.string().min(10).max(15),
	firstName: z.string().min(2).max(256),
	lastName: z.string().min(2).max(256),
	isActive: z.coerce.boolean(),
});

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;

export const UpdatePasswordBody = z.object({
	oldPassword: z.string().min(6).max(256),
	newPassword: z.string().min(6).max(256),
});

export const SearchUsersBody = z.object({
	id: z.coerce.number().int().optional(),
	email: z.string().optional(),
	name: z.string().optional(),
	role: z.enum(['SELLER', 'BUYER', 'ADMIN']).optional(),
});

export type UpdatePasswordBodyType = z.TypeOf<typeof UpdatePasswordBody>;
