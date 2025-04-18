import z from 'zod';
import { UserSchema } from '../schema';

export const AccountRes = z
	.object({
		data: UserSchema,
		message: z.string(),
	})
	.strict();

export type AccountResType = z.TypeOf<typeof AccountRes>;
