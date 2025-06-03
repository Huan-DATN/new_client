'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
import { Switch } from '@/components/ui/switch';

import categoryRequest from '@/api/categoryRequest';
import {
	CreateCategoryRequest,
	createCategoryRequestSchema,
} from '@/schemaValidations/request/category';
import { CategoryWithProductCount } from '@/schemaValidations/response/category';

interface CategoryFormProps {
	category?: CategoryWithProductCount | null;
	onSuccess: () => void;
	onCancel: () => void;
}

export default function CategoryForm({
	category,
	onSuccess,
	onCancel,
}: CategoryFormProps) {
	const isEditing = !!category;

	const form = useForm<CreateCategoryRequest>({
		resolver: zodResolver(createCategoryRequestSchema),
		defaultValues: {
			name: '',
			isActive: true,
		},
	});

	useEffect(() => {
		if (category) {
			form.reset({
				name: category.name,
				isActive: category.isActive,
			});
		} else {
			form.reset({
				name: '',
				isActive: true,
			});
		}
	}, [category, form]);

	const onSubmit: SubmitHandler<CreateCategoryRequest> = async (data) => {
		try {
			const sessionToken = localStorage.getItem('sessionToken') || '';

			if (isEditing && category) {
				await categoryRequest.updateCategory(sessionToken, category.id, data);
				toast.success('Cập nhật danh mục thành công');
			} else {
				await categoryRequest.createCategory(sessionToken, data);
				toast.success('Tạo danh mục thành công');
			}

			onSuccess();
		} catch (error) {
			const errorMessage = isEditing
				? 'Lỗi khi cập nhật danh mục'
				: 'Lỗi khi tạo danh mục';
			toast.error(errorMessage);
			console.error('Error saving category:', error);
		}
	};

	return (
		<div className="p-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tên danh mục *</FormLabel>
								<FormControl>
									<Input placeholder="Nhập tên danh mục..." {...field} />
								</FormControl>
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
										Trạng thái hoạt động
									</FormLabel>
									<div className="text-sm text-muted-foreground">
										Bật để cho phép danh mục hiển thị trong hệ thống
									</div>
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

					<div className="flex justify-end space-x-2">
						<Button type="button" variant="outline" onClick={onCancel}>
							Hủy
						</Button>
						<Button type="submit" disabled={form.formState.isSubmitting}>
							{form.formState.isSubmitting
								? isEditing
									? 'Đang cập nhật...'
									: 'Đang tạo...'
								: isEditing
								? 'Cập nhật'
								: 'Tạo'}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
