'use client';

import mediaRequest from '@/api/mediaRequest';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export type CarouselFormData = {
	title: string;
	imageId: number;
	linkUrl: string;
	order: number;
	isActive: boolean;
};

interface CarouselFormProps {
	initialData?: CarouselFormData;
	onSubmit: (data: CarouselFormData) => Promise<void>;
	submitButtonText: string;
	onCancel: () => void;
	isSubmitting?: boolean;
}

export default function CarouselForm({
	initialData = {
		title: '',
		imageId: 0,
		linkUrl: '',
		order: 0,
		isActive: true,
	},
	onSubmit,
	submitButtonText,
	onCancel,
	isSubmitting = false,
}: CarouselFormProps) {
	const t = useTranslations('Admin');
	const [formData, setFormData] = useState<CarouselFormData>(initialData);
	const [imageUrl, setImageUrl] = useState<string>('');
	const [uploading, setUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Load image URL for edit mode
	useEffect(() => {
		if (initialData.imageId > 0) {
			// Try to fetch the image URL if we have an imageId but no URL
			const fetchImageUrl = async () => {
				try {
					const response = await fetch(`/api/media/${initialData.imageId}`);
					if (response.ok) {
						const data = await response.json();
						setImageUrl(data.publicUrl);
					}
				} catch (error) {
					console.error('Error fetching image URL:', error);
				}
			};

			fetchImageUrl();
		}
	}, [initialData.imageId]);

	// Handle form input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;
		setFormData({
			...formData,
			[name]: type === 'number' ? parseInt(value) : value,
		});
	};

	// Handle switch change
	const handleSwitchChange = (checked: boolean) => {
		setFormData({
			...formData,
			isActive: checked,
		});
	};

	// Handle image file upload
	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			setUploading(true);
			const formData = new FormData();
			formData.append('image', file as Blob);

			const response = await mediaRequest.uploadImage(formData);

			if (response.payload && response.payload.data) {
				const uploadedImage = response.payload.data;
				setFormData((prev) => ({
					...prev,
					imageId: uploadedImage.id,
				}));
				setImageUrl(uploadedImage.publicUrl);

				toast({
					title: 'Success',
					description: t('imageUploadedSuccessfully'),
				});
			}
		} catch (error) {
			console.error('Error uploading image:', error);
			toast({
				title: 'Error',
				description: t('failedToUploadImage'),
				variant: 'destructive',
			});
		} finally {
			setUploading(false);
			// Clear the file input
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	// Trigger file input click
	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	// Handle form submission
	const handleSubmit = async () => {
		if (formData.imageId === 0) {
			toast({
				title: 'Error',
				description: t('pleaseUploadImage'),
				variant: 'destructive',
			});
			return;
		}

		await onSubmit(formData);
	};

	return (
		<>
			{/* Hidden file input */}
			<input
				type="file"
				ref={fileInputRef}
				className="hidden"
				accept="image/*"
				onChange={handleFileChange}
			/>

			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="title" className="text-right">
						{t('title')}
					</Label>
					<Input
						id="title"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label className="text-right">{t('image')}</Label>
					<div className="col-span-3 flex flex-col gap-2">
						{imageUrl && (
							<div className="relative w-full h-32 overflow-hidden rounded-md mb-2">
								<Image
									src={imageUrl}
									alt={formData.title || 'Carousel image'}
									fill
									className="object-cover"
								/>
							</div>
						)}
						<Button
							type="button"
							variant="outline"
							onClick={handleUploadClick}
							disabled={uploading}
						>
							{uploading ? (
								<>
									<Spinner className="mr-2 h-4 w-4" />
									{t('uploading')}
								</>
							) : (
								<>{imageUrl ? t('changeImage') : t('uploadImage')}</>
							)}
						</Button>
						{formData.imageId > 0 && (
							<div className="text-sm text-muted-foreground">
								{t('imageId')}: {formData.imageId}
							</div>
						)}
					</div>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="linkUrl" className="text-right">
						{t('linkUrl')}
					</Label>
					<Input
						id="linkUrl"
						name="linkUrl"
						value={formData.linkUrl}
						onChange={handleInputChange}
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="order" className="text-right">
						{t('order')}
					</Label>
					<Input
						id="order"
						name="order"
						type="number"
						value={formData.order}
						onChange={handleInputChange}
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="isActive" className="text-right">
						{t('active')}
					</Label>
					<div className="col-span-3 flex items-center">
						<Switch
							id="isActive"
							checked={formData.isActive}
							onCheckedChange={handleSwitchChange}
						/>
					</div>
				</div>
			</div>

			<div className="flex justify-end gap-2 mt-4">
				<Button variant="outline" onClick={onCancel}>
					{t('cancel')}
				</Button>
				<Button onClick={handleSubmit} disabled={isSubmitting}>
					{isSubmitting ? <Spinner className="mr-2 h-4 w-4" /> : null}
					{submitButtonText}
				</Button>
			</div>
		</>
	);
}
