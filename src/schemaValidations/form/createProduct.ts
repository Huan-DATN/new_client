import { z } from 'zod';

export const CreateProductForm = z.object({
	name: z.string().min(1, { message: 'Tên là bắt buộc' }),
	description: z.string().min(1, { message: 'Mô tả là bắt buộc' }),
	price: z.coerce.number().min(0, { message: 'Giá phải lớn hơn 0' }),
	cityId: z.coerce.number().min(1, { message: 'ID thành phố là bắt buộc' }),
	groupProductId: z
		.number()
		.min(1, { message: 'ID nhóm sản phẩm là bắt buộc' }),
	categories: z
		.array(z.number())
		.nonempty({ message: 'Cần ít nhất một danh mục' }),
	star: z.coerce
		.number()
		.min(0)
		.max(4, { message: 'Đánh giá sao phải từ 0 đến 4' })
		.optional(),
	quantity: z.coerce.number().min(1, { message: 'Số lượng phải lớn hơn 0' }),
	isActive: z.boolean().optional(),
	imageUrls: z.array(z.string()),
});

export type CreateProductFormType = z.infer<typeof CreateProductForm>;
