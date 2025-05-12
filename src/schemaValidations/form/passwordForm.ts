import { z } from 'zod';

export const passwordFormSchema = z
	.object({
		currentPassword: z.string().min(6, {
			message: 'Mật khẩu hiện tại phải có ít nhất 6 ký tự',
		}),
		newPassword: z.string().min(6, {
			message: 'Mật khẩu mới phải có ít nhất 6 ký tự',
		}),
		confirmPassword: z.string().min(6, {
			message: 'Xác nhận mật khẩu phải có ít nhất 6 ký tự',
		}),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'Mật khẩu xác nhận không khớp',
		path: ['confirmPassword'],
	});

export type PasswordFormValues = z.infer<typeof passwordFormSchema>;
