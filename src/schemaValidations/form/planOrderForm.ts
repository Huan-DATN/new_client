import { z } from 'zod';

export const PlanOrderForm = z.array(
	z.object({
		date: z.coerce.date({
			required_error: 'Ngày là bắt buộc',
			invalid_type_error: 'Ngày không hợp lệ',
		}),
		statusId: z.number(),
	})
);

export type PlanOrderFormType = z.infer<typeof PlanOrderForm>;
