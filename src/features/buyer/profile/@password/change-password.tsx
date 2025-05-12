'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/context/app-provider';
import { handleErrorApi } from '@/lib/utils';
import {
	passwordFormSchema,
	PasswordFormValues,
} from '@/schemaValidations/form/passwordForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Loader2, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ChangePassword() {
	const { user } = useAppContext();
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<PasswordFormValues>({
		resolver: zodResolver(passwordFormSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	async function onSubmit(data: PasswordFormValues) {
		if (loading) return;

		setLoading(true);
		try {
			if (!user) {
				router.push('/auth/login');
				router.refresh();
				return;
			}

			// This is a mock implementation - replace with actual API call
			// const result = await userRequest.changePassword(user.id, {
			// 	currentPassword: data.currentPassword,
			// 	newPassword: data.newPassword,
			// });

			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast.success('Mật khẩu đã được cập nhật thành công');
			form.reset();
		} catch (error: any) {
			handleErrorApi({
				error,
				setError: form.setError,
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<div className="mb-6">
				<h2 className="text-xl font-semibold">Thay đổi mật khẩu</h2>
				<p className="text-sm text-gray-500 mt-1">
					Cập nhật mật khẩu của bạn để đảm bảo tài khoản luôn an toàn
				</p>
			</div>

			<Card className="p-6 bg-gray-50 border-dashed">
				<div className="flex items-center gap-3 mb-4">
					<KeyRound size={18} className="text-gray-500" />
					<h3 className="font-medium">Cập nhật mật khẩu</h3>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="currentPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mật khẩu hiện tại</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Nhập mật khẩu hiện tại"
											{...field}
											className="bg-white"
										/>
									</FormControl>
									<FormDescription>
										Nhập mật khẩu hiện tại của bạn để xác thực
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="newPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mật khẩu mới</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Nhập mật khẩu mới"
											{...field}
											className="bg-white"
										/>
									</FormControl>
									<FormDescription>
										Mật khẩu phải có ít nhất 6 ký tự
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Xác nhận mật khẩu mới</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Xác nhận mật khẩu mới"
											{...field}
											className="bg-white"
										/>
									</FormControl>
									<FormDescription>
										Nhập lại mật khẩu mới để xác nhận
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="pt-4 flex flex-col gap-4">
							<div className="bg-blue-50 p-4 rounded-md border border-blue-100">
								<div className="flex gap-2">
									<ShieldCheck className="h-5 w-5 text-blue-600" />
									<div>
										<h4 className="font-medium text-blue-800">
											Lời khuyên về bảo mật
										</h4>
										<ul className="text-sm text-blue-700 mt-1 list-disc ml-5 space-y-1">
											<li>Sử dụng ít nhất 8 ký tự</li>
											<li>Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
											<li>Không sử dụng thông tin cá nhân như ngày sinh</li>
											<li>Không sử dụng lại mật khẩu từ các trang web khác</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="flex justify-end">
								<Button
									type="submit"
									className="min-w-[150px]"
									disabled={loading}
								>
									{loading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang cập
											nhật
										</>
									) : (
										'Cập nhật mật khẩu'
									)}
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</Card>
		</div>
	);
}
