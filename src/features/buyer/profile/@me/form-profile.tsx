'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { handleErrorApi } from '@/lib/utils';

import mediaRequest from '@/api/mediaRequest';
import userRequest from '@/api/userRequest';
import { useAppContext } from '@/context/app-provider';
import {
	UpdateBuyerMeForm,
	UpdateBuyerMeFormType,
} from '@/schemaValidations/form/updateBuyerMeForm';
import { AccountResType } from '@/schemaValidations/response/account';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Profile = AccountResType['data'];

const FormProfile = ({ profile }: { profile: Profile }) => {
	const [file, setFile] = useState<File | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { user, setUser } = useAppContext();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const form = useForm<UpdateBuyerMeFormType>({
		resolver: zodResolver(UpdateBuyerMeForm),
		defaultValues: {
			phone: profile.phone || '',
			firstName: profile.firstName || '',
			lastName: profile.lastName || '',
			address: profile.address || '',
			imageUrl: profile.image?.publicUrl || null,
		},
	});

	const image = form.watch('imageUrl');

	// 2. Define a submit handler.
	async function onSubmit(values: UpdateBuyerMeFormType) {
		if (loading) return;
		setLoading(true);
		try {
			if (!user) {
				router.push('/auth/login');
				router.refresh();
				return;
			}

			const formData = new FormData();
			formData.append('image', file as Blob);
			const uploadImageResult = await mediaRequest.uploadImage(formData);

			const { imageUrl, ...body } = values;
			const bodyUpdateMe = {
				...body,
				image: uploadImageResult.payload.data,
			};

			const result = await userRequest.updateMe(user.id, bodyUpdateMe);
			toast.success(result.payload.message);
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
				className="space-y-2 max-w-[600px] mx-auto flex-shrink-0 w-full"
				noValidate
			>
				<FormField
					control={form.control}
					name="imageUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hình ảnh</FormLabel>
							<FormControl>
								<Input
									type="file"
									accept="image/*"
									ref={inputRef}
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (file) {
											setFile(file);
											field.onChange('http://localhost:3000/' + file.name);
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{(file || image) && (
					<div>
						<Image
							src={file ? URL.createObjectURL(file) : image || ''}
							width={128}
							height={128}
							alt="preview"
							className="w-32 h-32 object-cover"
						/>
						<Button
							type="button"
							variant={'destructive'}
							size={'sm'}
							onClick={() => {
								setFile(null);
								form.setValue('imageUrl', '');
								if (inputRef.current) {
									inputRef.current.value = '';
								}
							}}
						>
							Xóa hình ảnh
						</Button>
					</div>
				)}

				<FormLabel>Email</FormLabel>
				<FormControl>
					<Input
						placeholder="shadcn"
						type="email"
						value={profile.email}
						readOnly
					/>
				</FormControl>
				<FormMessage />

				<div className="flex flex-row min-w-full gap-2">
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Họ</FormLabel>
								<FormControl>
									<Input
										placeholder="Họ"
										type="text"
										{...field}
										className="disabled:bg-gray-500"
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
									<Input placeholder="Tên" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Số điện thoại</FormLabel>
							<FormControl>
								<Input placeholder="Số diện thoại" type="text" {...field} />
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
								<Input placeholder="Email" type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="!mt-8 w-full">
					Cập nhật
				</Button>
			</form>
		</Form>
	);
};

export default FormProfile;
