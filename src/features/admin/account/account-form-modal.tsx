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
import { UserSchema } from '@/schemaValidations/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import mediaRequest from '../../../api/mediaRequest';
import userRequest from '../../../api/userRequest';
import { handleErrorApi } from '../../../lib/utils';
import {
	CreateUserType,
	UpdateUserType,
} from '../../../schemaValidations/request/user';
import { AccountFormValues, accountFormSchema } from './schemas';

interface AccountFormModalProps {
	account?: Account | null;
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
	sessionToken: string;
	isSubmitting?: boolean;
}

type Account = z.infer<typeof UserSchema>;

function AccountFormModal({
	account,
	isOpen,
	onClose,
	onSuccess,
	sessionToken,
}: AccountFormModalProps) {
	const isEditMode = !!account?.id;
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(
		account?.image?.publicUrl || null
	);

	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues: {
			firstName: account?.firstName || '',
			lastName: account?.lastName || '',
			email: account?.email || '',
			phone: account?.phone || '',
			address: account?.address || '',
			shopName: account?.shopName || '',
			role: (account?.role as 'ADMIN' | 'SELLER' | 'BUYER') || 'BUYER',
			isActive: account?.isActive !== undefined ? account.isActive : true,
		},
	});

	// Reset form when modal is opened with account data or closed
	useEffect(() => {
		if (isOpen && account) {
			// When editing an existing account, reset form with account data
			form.reset({
				firstName: account.firstName || '',
				lastName: account.lastName || '',
				email: account.email || '',
				phone: account.phone || '',
				address: account.address || '',
				role: account.role as 'ADMIN' | 'SELLER' | 'BUYER',
				isActive: account.isActive !== undefined ? account.isActive : true,
			});
			setPreviewUrl(account.image?.publicUrl || null);
		} else if (!isOpen) {
			// When closing the modal, reset to empty form
			form.reset({
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				address: '',
				role: 'BUYER',
				shopName: '',
				isActive: true,
			});
			setPreviewUrl(null);
		}
	}, [isOpen, account, form]);

	const handleFormSubmit = async (values: AccountFormValues) => {
		setIsSubmitting(true);
		try {
			let imageId = account?.image?.id || 0;

			// Upload image if a new one is selected
			if (selectedImage) {
				const formData = new FormData();
				formData.append('image', selectedImage);
				const uploadResponse = await mediaRequest.uploadImage(formData);
				imageId = uploadResponse.payload.data.id;
			}

			if (account) {
				const updateData: UpdateUserType = {
					imageId,
					firstName: values.firstName,
					lastName: values.lastName,
					phone: values.phone,
					address: values.address,
					isActive: values.isActive,
					shopName: values.shopName,
					role: values.role,
				};

				if (imageId !== account.image?.id) {
					updateData.imageId = imageId;
				}

				const response = await userRequest.updateUser(
					sessionToken,
					account.id,
					updateData
				);
				onSuccess();
			} else {
				// Create new account
				const createData: CreateUserType = {
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
					password: values.password || '',
					role: values.role,
					shopName: values.shopName || '',
					phone: values.phone || '',
					address: values.address || '',
					isActive: values.isActive,
					imageId: imageId === 0 ? undefined : imageId,
				};

				const response = await userRequest.createUser(sessionToken, createData);
				onSuccess();
			}
		} catch (error) {
			handleErrorApi({
				error,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
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
							<AvatarImage src={previewUrl || ''} />
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
								onChange={handleImageChange}
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
							name="shopName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên cửa hàng</FormLabel>
									<FormControl>
										<Input placeholder="Nhập tên cửa hàng" {...field} />
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
