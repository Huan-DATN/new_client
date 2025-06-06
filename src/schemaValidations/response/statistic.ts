import { z } from 'zod';

export const statisticResponseSchema = z.object({
	data: z.array(
		z.object({
			date: z.string(),
			revenue: z.number(),
			orderCount: z.number(),
		})
	),
	message: z.string(),
});

export type StatisticResponseType = z.infer<typeof statisticResponseSchema>;

const StatisticDashboardResponseSchema = z.object({
	data: z.object({
		totalRevenue: z.object({
			value: z.string(),
		}),
		completedOrders: z.object({
			value: z.string(),
		}),
		shippingOrders: z.object({
			value: z.string(),
		}),
		cancelledOrders: z.object({
			value: z.string(),
		}),
	}),
	message: z.string(),
});

export type StatisticDashboardResponseSchemaType = z.infer<
	typeof StatisticDashboardResponseSchema
>;

export const AdminDashboardSystemRes = z.object({
	data: z.object({
		users: z.object({
			totalShops: z.number(),
			totalBuyers: z.number(),
			totalAdmins: z.number(),
			totalUsers: z.number(),
		}),
		shops: z.object({
			total: z.number(),
			active: z.number(),
			inactive: z.number(),
		}),
		products: z.object({
			total: z.number(),
			active: z.number(),
			inactive: z.number(),
		}),
		orders: z.object({
			total: z.number(),
			byStatus: z.array(
				z.object({
					statusId: z.number(),
					statusName: z.string(),
					statusType: z.string(),
					count: z.number(),
				})
			),
		}),
		revenue: z.object({
			total: z.number(),
		}),
	}),
	message: z.string(),
});

export type AdminDashboardSystemResType = z.infer<
	typeof AdminDashboardSystemRes
>;
