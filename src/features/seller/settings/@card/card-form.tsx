'use client';

import cardRequest from '@/api/cardRequest';
import mediaRequest from '@/api/mediaRequest';
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
import { toast } from '@/components/ui/use-toast';
import {
	CreateCardType,
	UpdateCardType,
} from '@/schemaValidations/request/card';
import { CardResponseType } from '@/schemaValidations/response/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	accountNumber: z.string().min(1, 'Account number is required'),
	bankName: z.string().min(1, 'Bank name is required'),
	imageId: z.number().int().positive('Bank logo is required'),
	isActive: z.boolean().default(true).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CardFormProps {
	sessionToken: string;
	onSuccess: (card: CardResponseType) => void;
	onCancel: () => void;
	card?: CardResponseType;
}

export function CardForm({
	sessionToken,
	onSuccess,
	onCancel,
	card,
}: CardFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(
		card?.image.publicUrl || null
	);
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: card
			? {
					name: card.name,
					accountNumber: card.accountNumber,
					bankName: card.bankName,
					imageId: card.imageId,
					isActive: card.isActive,
			  }
			: {
					name: '',
					accountNumber: '',
					bankName: '',
					imageId: 0,
					isActive: true,
			  },
	});

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

	const onSubmit = async (values: FormValues) => {
		setIsSubmitting(true);
		try {
			let imageId = values.imageId;

			// Upload image if a new one is selected
			if (selectedImage) {
				const formData = new FormData();
				formData.append('image', selectedImage);
				const uploadResponse = await mediaRequest.uploadImage(formData);
				imageId = uploadResponse.payload.data.id;
			}

			if (card) {
				// Update existing card
				const updateData: UpdateCardType = {
					name: values.name,
					accountNumber: values.accountNumber,
					bankName: values.bankName,
					isActive: values.isActive,
				};

				if (imageId !== card.imageId) {
					updateData.imageId = imageId;
				}

				const response = await cardRequest.updateCard(
					sessionToken,
					card.id,
					updateData
				);
				onSuccess(response.payload.data);
			} else {
				// Create new card
				// Ensure we have a valid imageId before submitting
				if (!selectedImage && imageId <= 0) {
					toast({
						title: 'Error',
						description: 'Please upload a QR code image',
						variant: 'destructive',
					});
					setIsSubmitting(false);
					return;
				}

				const createData: CreateCardType = {
					name: values.name,
					accountNumber: values.accountNumber,
					bankName: values.bankName,
					imageId,
				};

				const response = await cardRequest.createCard(sessionToken, createData);
				onSuccess(response.payload.data);
			}
		} catch (error) {
			console.error('Error submitting card:', error);
			toast({
				title: 'Error',
				description: 'Failed to save card information',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
				noValidate
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên chủ tài khoản</FormLabel>
							<FormControl>
								<Input placeholder="e.g., NGUYEN VAN A" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="bankName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên ngân hàng</FormLabel>
							<FormControl>
								<Input placeholder="e.g., VietcomBank" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="accountNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Số tài khoản</FormLabel>
							<FormControl>
								<Input placeholder="e.g., 1234567890" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="space-y-2">
					<FormLabel>QR Code</FormLabel>
					<div className="flex items-center gap-4">
						{previewUrl && (
							<div className="h-16 w-16 rounded-md border overflow-hidden">
								<img
									src={previewUrl}
									alt="Bank logo preview"
									className="h-full w-full object-contain"
								/>
							</div>
						)}
						<Input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="max-w-xs"
						/>
					</div>
				</div>

				{card && (
					<FormField
						control={form.control}
						name="isActive"
						render={({ field }) => (
							<FormItem className="flex items-center justify-between rounded-lg border p-3">
								<div className="space-y-0.5">
									<FormLabel>Trạng thái</FormLabel>
									<div className="text-sm text-muted-foreground">
										Đặt trạng thái hoạt động của chuyển khoản này
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
				)}

				<div className="flex justify-end space-x-2">
					<Button type="button" variant="outline" onClick={onCancel}>
						Huỷ
					</Button>
					<Button type="submit" onClick={() => onSubmit(form.getValues())}>
						{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{card ? 'Cập nhật' : 'Thêm'}
					</Button>
				</div>
			</form>
		</Form>
	);
}
