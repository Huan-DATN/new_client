'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
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
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/context/app-provider';
import { handleErrorApi } from '@/lib/utils';
import {
	CreateProductForm,
	CreateProductFormType,
} from '@/schemaValidations/form/createProduct';
import { CreateProductBodyType } from '@/schemaValidations/request/product';
import {
	CategoryListResType,
	CityListResType,
	GroupProductsListResType,
} from '@/schemaValidations/response/common';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import mediaRequest from '../../../../api/mediaRequest';
import productRequest from '../../../../api/productRequest';

const ProductAddForm = ({
	categoriesData,
	groupProductsData,
	citiesData,
	sessionToken,
}: {
	categoriesData: CategoryListResType['data'];
	groupProductsData: GroupProductsListResType['data'];
	citiesData: CityListResType['data'];
	sessionToken: string;
}) => {
	const [files, setFiles] = useState<File[] | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { user, setUser } = useAppContext();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const form = useForm<CreateProductFormType>({
		resolver: zodResolver(CreateProductForm),
		defaultValues: {
			name: '',
			price: 0,
			quantity: 0,
			description: '',
			categories: [],
			imageUrls: [],
			isActive: true,
			cityId: citiesData[0].id,
			groupProductId: groupProductsData[0].id,
		},
	});

	const images = form.watch('imageUrls');

	// 2. Define a submit handler.
	async function onSubmit(values: CreateProductFormType) {
		if (loading) return;
		setLoading(true);
		console.log(values);
		try {
			let images: number[] = [];
			if (files) {
				files.map(async (file) => {
					const formData = new FormData();
					formData.append('image', file as Blob);
					const uploadImageResult = await mediaRequest.uploadImage(formData);
					images.push(uploadImageResult.payload.data.id);
				});
			}
			const { imageUrls, ...body } = values;
			const bodyCreateProduct: CreateProductBodyType = {
				...body,
				images: images as any,
			};

			console.log(bodyCreateProduct);
			const result = await productRequest.create(
				sessionToken,
				bodyCreateProduct
			);

			toast.success(result.payload.message);
			router.back();
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
				className="space-y-2 mx-auto flex-shrink-0 w-10/12"
				noValidate
			>
				<FormField
					control={form.control}
					name="imageUrls"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hình ảnh</FormLabel>
							<FormControl>
								<Input
									type="file"
									multiple
									accept="image/*"
									ref={inputRef}
									onChange={(e) => {
										const files = e.target.files;
										if (files && files.length > 0) {
											setFiles(Array.from(files));
											field.onChange(
												Array.from(files || []).map((file: File) => {
													return 'http://localhost:3000/' + file.name;
												})
											);
											console.log(images);
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{(files || images.length > 0) && (
					<div className="flex flex-row gap-2">
						{(files || images).map((file, index) => (
							<div key={index}>
								<Image
									src={
										typeof file === 'string' ? file : URL.createObjectURL(file)
									}
									alt="product"
									width={100}
									height={100}
									className="w-32 h-32 object-cover"
								/>
								<Button
									type="button"
									variant={'destructive'}
									size={'sm'}
									onClick={() => {
										if (files) {
											const updatedFiles = files.filter((_, i) => i !== index);
											setFiles(updatedFiles);
											form.setValue(
												'imageUrls',
												updatedFiles.map((file) =>
													typeof file === 'string'
														? file
														: 'http://localhost:3000/' + file.name
												)
											);
											if (inputRef.current && inputRef.current.files) {
												const fileArray = Array.from(inputRef.current!.files);
												const updatedFiles = fileArray.filter(
													(_, i: number) => i !== index
												);
												const dataTransfer = new DataTransfer();
												updatedFiles.forEach((file) =>
													dataTransfer.items.add(file)
												);
												inputRef.current!.files = dataTransfer.files;
											}
										}
									}}
								>
									Xóa hình ảnh
								</Button>
							</div>
						))}
					</div>
				)}

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Tên</FormLabel>
							<FormControl>
								<Input
									placeholder="Tên sản phẩm"
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
					name="description"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Mô tả</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Giá tiền</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="quantity"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Số lượng trong kho</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="cityId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Thành phố</FormLabel>
							<FormControl>
								<Select>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Thành phố" />
									</SelectTrigger>
									<SelectContent>
										{citiesData.map((city) => (
											<SelectItem key={city.id} value={String(city.id)}>
												{city.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="groupProductId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nhóm sản phẩm</FormLabel>
							<FormControl>
								<Select>
									<SelectTrigger className="w-full">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{groupProductsData.map((group) => (
											<SelectItem key={group.id} value={String(group.id)}>
												{group.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-wrap gap-2">
					{categoriesData.map((item) => (
						<FormField
							key={item.id}
							control={form.control}
							name="categories"
							render={({ field }) => {
								return (
									<FormItem
										key={item.id}
										className="flex flex-row items-start space-x-3 space-y-0"
									>
										<FormControl>
											<Checkbox
												checked={field.value?.includes(item.id)}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([...field.value, item.id])
														: field.onChange(
																field.value?.filter(
																	(value) => value !== item.id
																)
														  );
												}}
											/>
										</FormControl>
										<FormLabel className="text-sm font-normal">
											{item.name}
										</FormLabel>
									</FormItem>
								);
							}}
						/>
					))}
				</div>

				<Button type="submit" className="!mt-8 w-full">
					Cập nhật
				</Button>
			</form>
		</Form>
	);
};

export default ProductAddForm;
