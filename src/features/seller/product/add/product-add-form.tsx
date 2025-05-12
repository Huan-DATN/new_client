'use client';

import mediaRequest from '@/api/mediaRequest';
import productRequest from '@/api/productRequest';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { ScrollArea } from '@/components/ui/scroll-area';
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
import {
	ArrowRight,
	FileImage,
	Info,
	Loader2,
	Package,
	PackageCheck,
	Tag,
	Upload,
	X
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
			cityId: citiesData[0]?.id || 0,
			groupProductId: groupProductsData[0]?.id || 0,
		},
	});

	const images = form.watch('imageUrls');

	// Handle file drop for image uploads
	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles?.length) {
			setFiles(prevFiles => {
				const newFiles = prevFiles ? [...prevFiles, ...acceptedFiles] : acceptedFiles;

				// Update form value
				form.setValue(
					'imageUrls',
					newFiles.map(file => URL.createObjectURL(file))
				);

				return newFiles;
			});
		}
	}, [form]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.jpeg', '.jpg', '.png', '.webp']
		},
		maxSize: 5 * 1024 * 1024, // 5MB
	});

	// Remove an image
	const removeImage = (index: number) => {
		if (files) {
			const updatedFiles = files.filter((_, i) => i !== index);
			setFiles(updatedFiles);

			form.setValue(
				'imageUrls',
				updatedFiles.map(file => URL.createObjectURL(file))
			);
		}
	};

	// 2. Define a submit handler.
	async function onSubmit(values: CreateProductFormType) {
		if (loading) return;
		if (!files || files.length === 0) {
			toast.error("Vui lòng thêm ít nhất một hình ảnh sản phẩm");
			return;
		}

		setLoading(true);

		try {
			let images: number[] = [];

			// Upload all images
			const uploadPromises = files.map(async (file) => {
				const formData = new FormData();
				formData.append('image', file as Blob);
				const uploadImageResult = await mediaRequest.uploadImage(formData);
				return uploadImageResult.payload.data.id;
			});

			images = await Promise.all(uploadPromises);

			const { imageUrls, ...body } = values;
			const bodyCreateProduct: CreateProductBodyType = {
				...body,
				images: images as any,
			};

			const result = await productRequest.create(
				sessionToken,
				bodyCreateProduct
			);

			toast.success(result.payload.message || "Thêm sản phẩm thành công");
			router.push('/seller/product');
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
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Main form column */}
					<div className="lg:col-span-2 space-y-6">
						{/* Basic Product Information */}
						<Card>
							<CardContent className="p-6 space-y-4">
								<div className="flex items-center gap-2 mb-4">
									<Package className="h-5 w-5 text-primary" />
									<h2 className="font-medium text-lg">Thông tin cơ bản</h2>
								</div>

								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Tên sản phẩm <span className="text-red-500">*</span></FormLabel>
											<FormControl>
												<Input
													placeholder="Nhập tên sản phẩm"
													type="text"
													{...field}
													className="disabled:bg-gray-500"
												/>
											</FormControl>
											<FormDescription>
												Tên của sản phẩm sẽ được hiển thị cho người mua
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Mô tả sản phẩm</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Nhập mô tả chi tiết sản phẩm"
													className="min-h-[120px]"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Mô tả chi tiết về sản phẩm, tính năng và đặc điểm nổi bật
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>

						{/* Images section */}
						<Card>
							<CardContent className="p-6 space-y-4">
								<div className="flex items-center gap-2 mb-4">
									<FileImage className="h-5 w-5 text-primary" />
									<h2 className="font-medium text-lg">Hình ảnh sản phẩm</h2>
								</div>

								<FormField
									control={form.control}
									name="imageUrls"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Thêm hình ảnh <span className="text-red-500">*</span></FormLabel>
											<FormControl>
												<div
													{...getRootProps()}
													className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
														${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:bg-gray-50'}
													`}
												>
													<input {...getInputProps()} ref={inputRef} />
													<div className="flex flex-col items-center gap-3">
														<div className="p-3 rounded-full bg-primary/10">
															<Upload className="h-6 w-6 text-primary" />
														</div>
														{isDragActive ? (
															<p className="text-sm text-gray-700">Thả hình ảnh vào đây...</p>
														) : (
															<>
																<p className="text-sm text-gray-700">Kéo và thả hình ảnh vào đây hoặc nhấp để chọn</p>
																<p className="text-xs text-gray-500">JPG, PNG hoặc WEBP (tối đa 5MB)</p>
															</>
														)}
													</div>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{files && files.length > 0 && (
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
										{files.map((file, index) => (
											<div key={index} className="relative group">
												<div className="aspect-square relative border rounded-lg overflow-hidden">
													<Image
														src={URL.createObjectURL(file)}
														alt={`product-${index}`}
														fill
														className="object-cover"
													/>
												</div>
												<button
													type="button"
													onClick={() => removeImage(index)}
													className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-80 hover:opacity-100"
												>
													<X className="h-4 w-4" />
												</button>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>

						{/* Pricing and inventory section */}
						<Card>
							<CardContent className="p-6 space-y-4">
								<div className="flex items-center gap-2 mb-4">
									<Tag className="h-5 w-5 text-primary" />
									<h2 className="font-medium text-lg">Giá bán & Tồn kho</h2>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<FormField
										control={form.control}
										name="price"
										render={({ field: { onChange, ...field } }) => (
											<FormItem>
												<FormLabel>Giá bán <span className="text-red-500">*</span></FormLabel>
												<FormControl>
													<div className="relative">
														<Input
															type="number"
															min={0}
															onChange={e => onChange(Number(e.target.value))}
															placeholder="0"
															{...field}
														/>
														<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
															VND
														</div>
													</div>
												</FormControl>
												<FormDescription>
													Giá bán sản phẩm sau thuế
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="quantity"
										render={({ field: { onChange, ...field } }) => (
											<FormItem>
												<FormLabel>Số lượng <span className="text-red-500">*</span></FormLabel>
												<FormControl>
													<Input
														type="number"
														min={0}
														placeholder="0"
														onChange={e => onChange(Number(e.target.value))}
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Số lượng sản phẩm trong kho
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar column */}
					<div className="space-y-6">
						{/* Action card */}
						<Card>
							<CardContent className="p-6 space-y-4">
								<div className="flex items-center gap-2 mb-4">
									<Info className="h-5 w-5 text-primary" />
									<h2 className="font-medium text-lg">Thao tác</h2>
								</div>

								<Button
									type="submit"
									className="w-full"
									disabled={loading}
								>
									{loading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Đang xử lý
										</>
									) : (
										<>
											Thêm sản phẩm
											<ArrowRight className="ml-2 h-4 w-4" />
										</>
									)}
								</Button>

								<Button
									type="button"
									variant="outline"
									className="w-full"
									onClick={() => router.push('/seller/product')}
									disabled={loading}
								>
									Hủy
								</Button>
							</CardContent>
						</Card>

						{/* Classification card */}
						<Card>
							<CardContent className="p-6 space-y-4">
								<div className="flex items-center gap-2 mb-4">
									<PackageCheck className="h-5 w-5 text-primary" />
									<h2 className="font-medium text-lg">Phân loại</h2>
								</div>

								<FormField
									control={form.control}
									name="groupProductId"
									render={({ field: { value, onChange, ...field } }) => (
										<FormItem>
											<FormLabel>Nhóm sản phẩm <span className="text-red-500">*</span></FormLabel>
											<FormControl>
												<Select
													value={String(value)}
													onValueChange={(value) => onChange(Number(value))}
												>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Chọn nhóm sản phẩm" />
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

								<FormField
									control={form.control}
									name="cityId"
									render={({ field: { value, onChange, ...field } }) => (
										<FormItem>
											<FormLabel>Thành phố <span className="text-red-500">*</span></FormLabel>
											<FormControl>
												<Select
													value={String(value)}
													onValueChange={(value) => onChange(Number(value))}
												>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Chọn thành phố" />
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
									name="isActive"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel className="text-sm font-normal">
													Hiển thị sản phẩm
												</FormLabel>
												<FormDescription>
													Sản phẩm sẽ được hiển thị cho người mua ngay sau khi tạo
												</FormDescription>
											</div>
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>

						{/* Categories card */}
						<Card>
							<CardContent className="p-6 space-y-4">
								<div className="flex items-center gap-2 mb-4">
									<Tag className="h-5 w-5 text-primary" />
									<h2 className="font-medium text-lg">Danh mục</h2>
								</div>

								<ScrollArea className="h-[200px] pr-4">
									{categoriesData.map((item) => (
										<FormField
											key={item.id}
											control={form.control}
											name="categories"
											render={({ field }) => {
												return (
													<FormItem
														key={item.id}
														className="flex flex-row items-start space-x-3 space-y-0 py-2"
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
								</ScrollArea>
							</CardContent>
						</Card>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default ProductAddForm;
