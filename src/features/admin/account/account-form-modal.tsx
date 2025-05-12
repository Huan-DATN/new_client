'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Account, AccountFormValues, accountFormSchema } from './schemas';

interface AccountFormModalProps {
	account?: Account | null;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: AccountFormValues) => void;
	isSubmitting?: boolean;
}

function AccountFormModal({
	account,
	isOpen,
	onClose,
	onSubmit,
	isSubmitting = false,
}: AccountFormModalProps) {
	const [avatarUrl, setAvatarUrl] = useState<string | null>(
		account?.image?.publicUrl || null
	);
	const isEditMode = !!account?.id;

	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues: {
			firstName: account?.firstName || '',
			lastName: account?.lastName || '',
			email: account?.email || '',
			phone: account?.phone || '',
			address: account?.address || '',
			role: (account?.role as 'ADMIN' | 'SELLER' | 'BUYER') || 'BUYER',
			isActive: account?.isActive !== undefined ? account.isActive : true,
		},
	});

	const handleFormSubmit = (values: AccountFormValues) => {
		onSubmit(values);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// In a real implementation, this would upload the file to a server
			// and get back a URL to display
			const tempUrl = URL.createObjectURL(file);
			setAvatarUrl(tempUrl);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>
						{isEditMode ? 'Chỉnh sửa tài khoản' : 'Tạo tài khoản mới'}
					</DialogTitle>
					<DialogDescription>
						{isEditMode
							? `Cập nhật thông tin cho tài khoản #${account?.id}`
							: 'Nhập thông tin để tạo tài khoản mới'}
					</DialogDescription>
				</DialogHeader>

				<div className="flex justify-center my-4">
					<div className="relative">
						<Avatar className="h-24 w-24">
							<AvatarImage src={avatarUrl || ''} />
							<AvatarFallback className="bg-primary/10 text-primary text-xl">
								{form.watch('firstName')?.charAt(0) || ''}
								{form.watch('lastName')?.charAt(0) || ''}
							</AvatarFallback>
						</Avatar>
						<label
							htmlFor="avatar-upload"
							className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer"
						>
							<Camera className="h-4 w-4 text-white" />
							<input
								id="avatar-upload"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleFileChange}
							/>
						</label>
					</div>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleFormSubmit)}
						className="space-y-4"
					>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Họ</FormLabel>
										<FormControl>
											<Input placeholder="Nhập họ" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tên</FormLabel>
										<FormControl>
											<Input placeholder="Nhập tên" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Nhập email" type="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{!isEditMode && (
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mật khẩu</FormLabel>
										<FormControl>
											<Input
												placeholder="Nhập mật khẩu"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Mật khẩu phải có ít nhất 6 ký tự
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số điện thoại</FormLabel>
									<FormControl>
										<Input
											placeholder="Nhập số điện thoại"
											{...field}
											value={field.value || ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Địa chỉ</FormLabel>
									<FormControl>
										<Input
											placeholder="Nhập địa chỉ"
											{...field}
											value={field.value || ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Vai trò</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Chọn vai trò" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="BUYER">Người mua</SelectItem>
											<SelectItem value="SELLER">Cửa hàng</SelectItem>
											<SelectItem value="ADMIN">Quản trị viên</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="isActive"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">
											Trạng thái tài khoản
										</FormLabel>
										<FormDescription>
											{field.value
												? 'Tài khoản đang hoạt động'
												: 'Tài khoản đã bị vô hiệu hóa'}
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button variant="outline" type="button" onClick={onClose}>
								Hủy
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting && (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isEditMode ? 'Cập nhật' : 'Tạo tài khoản'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default AccountFormModal;
