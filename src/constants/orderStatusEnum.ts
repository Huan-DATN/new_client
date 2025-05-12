export enum OrderStatusEnum {
	PENDING = 'PENDING',
	CONFIRMED = 'CONFIRMED',
	PROCESSING = 'PROCESSING',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED',
	CANCELLED = 'CANCELLED',
	RETURNED = 'RETURNED',
	FAILED = 'FAILED',
}

export const OrderStatusPlanArray = [
	OrderStatusEnum.CONFIRMED,
	OrderStatusEnum.PROCESSING,
	OrderStatusEnum.SHIPPED,
];

export const OrderStatusArray = [
	OrderStatusEnum.PENDING,
	OrderStatusEnum.CONFIRMED,
	OrderStatusEnum.PROCESSING,
	OrderStatusEnum.SHIPPED,
	OrderStatusEnum.DELIVERED,
	OrderStatusEnum.CANCELLED,
	OrderStatusEnum.RETURNED,
	OrderStatusEnum.FAILED,
];
