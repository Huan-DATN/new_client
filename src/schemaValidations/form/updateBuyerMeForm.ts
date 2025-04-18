import z from 'zod';

export const UpdateBuyerMeForm = z
	.object({
		phone: z
			.string()
			.min(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự.' })
			.max(15, { message: 'Số điện thoại không được vượt quá 15 ký tự.' })
			.optional(),
		firstName: z
			.string()
			.min(2, { message: 'Tên phải có ít nhất 2 ký tự.' })
			.max(256, { message: 'Tên không được vượt quá 256 ký tự.' })
			.optional(),
		lastName: z
			.string()
			.min(2, { message: 'Họ phải có ít nhất 2 ký tự.' })
			.max(256, { message: 'Họ không được vượt quá 256 ký tự.' })
			.optional(),
		address: z
			.string()
			.min(2, { message: 'Địa chỉ phải có ít nhất 2 ký tự.' })
			.max(256, { message: 'Địa chỉ không được vượt quá 256 ký tự.' })
			.optional(),
		shopName: z
			.string()
			.min(2, { message: 'Tên cửa hàng phải có ít nhất 2 ký tự.' })
			.max(256, { message: 'Tên cửa hàng không được vượt quá 256 ký tự.' })
			.optional(),
		imageUrl: z.string().nullable(),
	})
	.strict();

export type UpdateBuyerMeFormType = z.TypeOf<typeof UpdateBuyerMeForm>;
