import * as z from 'zod';

// Define the schema for account forms
export const accountFormSchema = z.object({
	firstName: z.string().min(1, 'Họ không được để trống'),
	lastName: z.string().min(1, 'Tên không được để trống'),
	email: z.string().email('Email không hợp lệ'),
	password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').optional(),
	phone: z.string().optional(),
	address: z.string().optional(),
	role: z.enum(['ADMIN', 'SELLER', 'BUYER']),
	shopName: z.string().optional(),
	isActive: z.boolean(),
});

// Define shared interfaces
export interface AccountImage {
	id: number;
	publicUrl: string;
}

export interface Account {
	id: number;
	firstName: string | null;
	lastName: string | null;
	email: string;
	phone: string | null;
	address: string | null;
	role: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	image: AccountImage | null;
}

export interface AccountFormValues extends z.infer<typeof accountFormSchema> {}

export interface AccountsData {
	users: Account[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}
