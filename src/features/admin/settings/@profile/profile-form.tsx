'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Mail, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import mediaRequest from '@/api/mediaRequest';
import userRequest from '@/api/userRequest';
import { useAppContext } from '@/context/app-provider';
import { handleErrorApi } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Separator } from '@/components/ui/separator';

// Define the validation schema for the profile form
const profileSchema = z.object({
	firstName: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự.' }),
	lastName: z.string().min(2, { message: 'Họ phải có ít nhất 2 ký tự.' }),
	phone: z
		.string()
		.min(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự.' }),
	address: z.string().min(5, { message: 'Địa chỉ phải có ít nhất 5 ký tự.' }),
	imageUrl: z.string().nullable(),
	shopName: z
		.string()
		.min(2, { message: 'Tên cửa hàng phải có ít nhất 2 ký tự.' })
		.optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

type ProfileFormProps = {
	data: {
		id: number;
		firstName?: string | null;
		lastName?: string | null;
		email: string;
		phone?: string | null;
		address?: string | null;
		image?: { id: number; publicUrl: string } | null;
		isActive?: boolean;
		role?: string;
		createdAt?: Date;
		updatedAt?: Date;
	};
};

function ProfileForm({ data }: ProfileFormProps) {
	const [file, setFile] = useState<File | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { user, setUser } = useAppContext();
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			firstName: data.firstName || '',
			lastName: data.lastName || '',
			phone: data.phone || '',
			address: data.address || '',
			imageUrl: data.image?.publicUrl || null,
		},
	});

	const image = form.watch('imageUrl');

	async function onSubmit(values: ProfileFormData) {
		if (loading) return;
		setLoading(true);
		try {
			if (!user) {
				router.push('/auth/login');
				router.refresh();
				return;
			}

			let imageData = undefined;

			if (file) {
				const formData = new FormData();
				formData.append('image', file as Blob);
				const uploadImageResult = await mediaRequest.uploadImage(formData);
				imageData = uploadImageResult.payload.data;
			}

			const { imageUrl, ...body } = values;
			const bodyUpdateMe = {
				...body,
				...(imageData && { image: imageData }),
			};

			const result = await userRequest.updateMe(data.id, bodyUpdateMe);
			toast.success(result.payload.message || 'Thông tin đã được cập nhật');
			setUser(result.payload.data);
			router.refresh();
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
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
				noValidate
			>
				{/* Profile Avatar Section */}
				<div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem className="flex flex-col items-center">
								<FormLabel className="text-center mb-2">Ảnh đại diện</FormLabel>
								<FormControl>
									<div className="relative group">
										<Avatar className="h-32 w-32 border-4 border-white shadow-md">
											<AvatarImage
												src={
													file ? URL.createObjectURL(file) : image || undefined
												}
												alt={data.firstName || ''}
											/>
											<AvatarFallback className="bg-primary/10 text-primary text-2xl">
												{data.firstName?.charAt(0) || ''}
												{data.lastName?.charAt(0) || ''}
											</AvatarFallback>
										</Avatar>
										<button
											type="button"
											onClick={() => inputRef.current?.click()}
											className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-md hover:bg-primary/90 transition-colors"
										>
											<Camera size={18} />
										</button>
										<Input
											type="file"
											accept="image/*"
											ref={inputRef}
											className="hidden"
											onChange={(e) => {
												const selectedFile = e.target.files?.[0];
												if (selectedFile) {
													setFile(selectedFile);
													field.onChange(URL.createObjectURL(selectedFile));
												}
											}}
										/>
									</div>
								</FormControl>
								<FormDescription className="text-center text-xs mt-2">
									Ảnh hồ sơ của bạn sẽ hiển thị trong cửa hàng và các giao dịch
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex-1 w-full">
						<Card className="p-4 bg-gray-50 border-dashed">
							<div className="flex items-center gap-3 mb-1">
								<User size={18} className="text-gray-500" />
								<h3 className="font-medium">Thông tin cơ bản</h3>
							</div>
							<p className="text-sm text-gray-500 ml-7 mb-3">
								Thông tin cá nhân của bạn
							</p>

							<div className="space-y-4">
								<div className="flex flex-col sm:flex-row gap-4">
									<FormField
										control={form.control}
										name="lastName"
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Họ</FormLabel>
												<FormControl>
													<Input
														placeholder="Nhập họ của bạn"
														type="text"
														{...field}
														className="bg-white"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Tên</FormLabel>
												<FormControl>
													<Input
														placeholder="Nhập tên của bạn"
														type="text"
														{...field}
														className="bg-white"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormItem>
									<FormLabel>Email</FormLabel>
									<div className="relative">
										<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											className="pl-10 bg-gray-100 text-gray-600"
											value={data.email}
											readOnly
											disabled
										/>
									</div>
									<FormDescription>
										Email đã được xác thực và không thể thay đổi
									</FormDescription>
								</FormItem>
							</div>
						</Card>
					</div>
				</div>

				<Separator />

				{/* Contact Information */}
				<Card className="p-4 bg-gray-50 border-dashed">
					<div className="flex items-center gap-3 mb-1">
						<Phone size={18} className="text-gray-500" />
						<h3 className="font-medium">Thông tin liên hệ</h3>
					</div>
					<p className="text-sm text-gray-500 ml-7 mb-3">
						Địa chỉ và số điện thoại của bạn
					</p>

					<div className="space-y-4">
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số điện thoại</FormLabel>
									<FormControl>
										<Input
											placeholder="Nhập số điện thoại của bạn"
											type="tel"
											{...field}
											className="bg-white"
										/>
									</FormControl>
									<FormDescription>
										Số điện thoại sẽ được sử dụng để liên hệ khi có đơn hàng
									</FormDescription>
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
											placeholder="Nhập địa chỉ của bạn"
											{...field}
											className="bg-white"
										/>
									</FormControl>
									<FormDescription>
										Địa chỉ cửa hàng hoặc địa chỉ giao/nhận hàng
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</Card>

				<Separator />

				<div className="flex justify-end">
					<Button type="submit" disabled={loading}>
						{loading ? 'Đang lưu...' : 'Lưu thông tin'}
					</Button>
				</div>
			</form>
		</Form>
	);
}

export default ProfileForm;
