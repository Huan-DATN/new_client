import { z } from 'zod';
import { OrderStatusEnum } from '../constants/orderStatusEnum';

// Enums
export const RoleEnum = z.enum(['BUYER', 'SELLER', 'ADMIN']);

// User
export const UserSchema = z.object({
	id: z.number().int(),
	firstName: z.string().nullable().optional(),
	lastName: z.string().nullable().optional(),
	email: z.string().email(),
	shopName: z.string().nullable().optional(),
	password: z.string(),
	phone: z.string().nullable().optional(),
	address: z.string().nullable().optional(),
	isActive: z.boolean().default(true),
	role: RoleEnum.default('BUYER'),
	createdAt: z.date(),
	updatedAt: z.date(),
	image: z
		.object({
			id: z.number().int(),
			publicUrl: z.string(),
		})
		.nullable(),
});

// Session
export const SessionSchema = z.object({
	token: z.string(),
	userId: z.number().int(),
	expiresAt: z.date(),
	createdAt: z.date(),
});

// CartItem
export const CartItemSchema = z.object({
	id: z.number().int(),
	userId: z.number().int(),
	productId: z.number().int(),
	quantity: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),

	product: z.object({
		id: z.number().int(),
		name: z.string(),
		price: z.number(),
		description: z.string().nullable().optional(),
		images: z.array(
			z.object({
				id: z.number().int(),
				publicUrl: z.string(),
			})
		),
	}),
});

// Product
export const ProductSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	description: z.string().nullable().optional(),
	price: z.number(),
	userId: z.number().int(),
	quantity: z.number().int(),
	image: z.string().nullable().optional(),
	star: z.number().nullable().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
	groupProductId: z.number().int(),
	isActive: z.boolean().default(true),
	groupProduct: z
		.object({
			id: z.number().int(),
			name: z.string(),
			image: z.string().nullable().optional(),
			isActive: z.boolean().default(true),
		})
		.optional(),
	categories: z
		.array(
			z.object({
				id: z.number().int(),
				name: z.string(),
				isActive: z.boolean().default(true),
			})
		)
		.optional(),
	user: z
		.object({
			id: z.number().int(),
			shopName: z.string().nullable().optional(),
		})
		.optional(),
	city: z
		.object({
			id: z.number().int(),
			name: z.string(),
		})
		.optional(),
	images: z.array(
		z.object({
			id: z.number().int(),
			publicUrl: z.string(),
		})
	),
});

// OrderDetail
export const OrderDetailSchema = z.object({
	id: z.number().int(),
	userId: z.number().int(),
	addressLine: z.string(),
	phone: z.string(),
	total: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
	isCommented: z.boolean().default(false),

	shop: z.object({
		id: z.number().int(),
		shopName: z.string().nullable().optional(),
		phone: z.string().nullable().optional(),
		address: z.string().nullable().optional(),
		image: z
			.object({
				id: z.number().int(),
				publicUrl: z.string(),
			})
			.optional(),
	}),
	user: z.object({
		id: z.number().int(),
		firstName: z.string().nullable().optional(),
		lastName: z.string().nullable().optional(),
		email: z.string().email(),
		phone: z.string().nullable().optional(),
	}),
	items: z.array(
		z.object({
			id: z.number().int(),
			orderId: z.number().int(),
			productId: z.number().int(),
			quantity: z.number().int(),
			unitPrice: z.number(),
			createdAt: z.date(),
			updatedAt: z.date(),

			product: z
				.object({
					id: z.number().int(),
					name: z.string(),
					price: z.number(),
					description: z.string().nullable().optional(),
					images: z.array(
						z.object({
							id: z.number().int(),
							publicUrl: z.string(),
						})
					),
				})
				.optional(),
		})
	),
	paymentMethod: z.enum(['BANK_TRANSFER', 'CASH']),
	payment: z
		.object({
			id: z.number().int(),
			orderId: z.number().int(),
			image: z.object({
				id: z.number().int(),
				publicUrl: z.string(),
			}),
			createdAt: z.date(),
		})
		.optional(),
	OrderStatus: z.array(
		z.object({
			id: z.number().int(),
			orderId: z.number().int(),
			statusId: z.number().int(),
			date: z.date(),
			isActive: z.boolean().default(true),
			createdAt: z.date(),
			status: z.object({
				id: z.number().int(),
				type: z.nativeEnum(OrderStatusEnum),
				name: z.string(),
				createdAt: z.date(),
				updatedAt: z.date(),
			}),
			updatedAt: z.date(),
		})
	),
});

// OrderItem
export const OrderItemSchema = z.object({
	id: z.number().int(),
	orderId: z.number().int(),
	productId: z.number().int(),
	quantity: z.number().int(),
	unitPrice: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),

	product: z
		.object({
			id: z.number().int(),
			name: z.string(),
			price: z.number(),
			description: z.string().nullable().optional(),
		})
		.optional(),
});

// Category
export const CategorySchema = z.object({
	id: z.number().int(),
	name: z.string(),
	isActive: z.boolean().default(true),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// GroupProduct
export const GroupProductSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	isActive: z.boolean().default(true),
	createdAt: z.date(),
	updatedAt: z.date(),
	image: z
		.object({
			id: z.number().int(),
			publicUrl: z.string(),
		})
		.optional(),
});

// Status
export const StatusSchema = z.object({
	id: z.number().int(),
	type: z.nativeEnum(OrderStatusEnum),
	name: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// OrderStatus
export const OrderStatusSchema = z.object({
	id: z.number().int(),
	orderId: z.number().int(),
	statusId: z.number().int(),
	createdAt: z.date(),
});

export const CitySchema = z.object({
	id: z.number().int(),
	name: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const ImageSchema = z.object({
	id: z.number().int(),
	publicUrl: z.string(),
	productId: z.string().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const RatingSchema = z.object({
	id: z.number().int(),
	userId: z.number().int(),
	productId: z.number().int(),
	rating: z.number().int(),
	comment: z.string().nullable().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
	user: z
		.object({
			id: z.number().int(),
			firstName: z.string().nullable().optional(),
			lastName: z.string().nullable().optional(),
			email: z.string().email(),
			phone: z.string().nullable().optional(),
			image: z
				.object({
					id: z.number().int(),
					publicUrl: z.string(),
				})
				.nullable()
				.optional(),
		})
		.optional(),
	product: z
		.object({
			id: z.number().int(),
			name: z.string(),
			price: z.number(),
			description: z.string().nullable().optional(),
			images: z.array(
				z.object({
					id: z.number().int(),
					publicUrl: z.string(),
				})
			),
			user: z
				.object({
					id: z.number().int(),
					shopName: z.string().nullable().optional(),
					phone: z.string().nullable().optional(),
					address: z.string().nullable().optional(),
					image: z
						.object({
							id: z.number().int(),
							publicUrl: z.string(),
						})
						.nullable()
						.optional(),
					city: z
						.object({
							id: z.number().int(),
							name: z.string(),
						})
						.optional(),
					categories: z
						.array(
							z.object({
								id: z.number().int(),
								name: z.string(),
								isActive: z.boolean().default(true),
							})
						)
						.optional(),
					groupProduct: z
						.object({
							id: z.number().int(),
							name: z.string(),
							image: z.string().nullable().optional(),
							isActive: z.boolean().default(true),
						})
						.optional(),
				})
				.optional(),
		})
		.optional(),
});

export const CarouselItemSchema = z.object({
	id: z.number().int(),
	title: z.string(),
	imageId: z.number().int(),
	linkUrl: z.string(),
	order: z.number().int(),
	isActive: z.boolean().default(true),
	createdAt: z.date(),
	updatedAt: z.date(),
	image: z.object({
		id: z.number().int(),
		publicUrl: z.string(),
	}),
});
