'use client';

import { carouselRequest } from '@/api/carouselRequest';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CarouselForm, { CarouselFormData } from './components/carousel-form';

// Type for carousel data
type CarouselItemType = {
	id: number;
	title: string;
	imageId: number;
	image: {
		id: number;
		publicUrl: string;
		altText?: string;
	};
	linkUrl: string;
	order: number;
	isActive: boolean;
};

export default function CarouselManagement({
	sessionToken,
}: {
	sessionToken: string;
}) {
	const t = useTranslations('Admin');
	const [carouselItems, setCarouselItems] = useState<CarouselItemType[]>([]);
	const [loading, setLoading] = useState(true);
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState<CarouselItemType | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Fetch carousel items
	const fetchCarouselItems = async () => {
		if (!sessionToken) return;

		try {
			setLoading(true);
			const response = await carouselRequest.getCarouselAdmin(sessionToken);
			if (response.payload) {
				setCarouselItems(
					response.payload.data as unknown as CarouselItemType[]
				);
			}
		} catch (error) {
			console.error('Error fetching carousel items:', error);
			toast({
				title: 'Error',
				description: 'Failed to load carousel items',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (sessionToken) {
			fetchCarouselItems();
		}
	}, [sessionToken]);

	// Open edit dialog
	const openEditDialog = (item: CarouselItemType) => {
		setCurrentItem(item);
		setIsEditDialogOpen(true);
	};

	// Open delete dialog
	const openDeleteDialog = (item: CarouselItemType) => {
		setCurrentItem(item);
		setIsDeleteDialogOpen(true);
	};

	// Add new carousel item
	const handleAddItem = async (formData: CarouselFormData) => {
		if (!sessionToken) return;

		try {
			setIsSubmitting(true);
			await carouselRequest.createCarousel(sessionToken, formData);

			toast({
				title: 'Success',
				description: 'Carousel item added successfully',
			});

			setIsAddDialogOpen(false);
			fetchCarouselItems();
		} catch (error) {
			console.error('Error adding carousel item:', error);
			toast({
				title: 'Error',
				description: 'Failed to add carousel item',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Update carousel item
	const handleUpdateItem = async (formData: CarouselFormData) => {
		if (!currentItem || !sessionToken) return;

		try {
			setIsSubmitting(true);
			await carouselRequest.updateCarousel(
				sessionToken,
				currentItem.id,
				formData
			);

			toast({
				title: 'Success',
				description: 'Carousel item updated successfully',
			});

			setIsEditDialogOpen(false);
			fetchCarouselItems();
		} catch (error) {
			console.error('Error updating carousel item:', error);
			toast({
				title: 'Error',
				description: 'Failed to update carousel item',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Delete carousel item
	const handleDeleteItem = async () => {
		if (!currentItem || !sessionToken) return;

		try {
			await carouselRequest.deleteCarousel(sessionToken, currentItem.id);

			toast({
				title: 'Success',
				description: 'Carousel item deleted successfully',
			});

			setIsDeleteDialogOpen(false);
			fetchCarouselItems();
		} catch (error) {
			console.error('Error deleting carousel item:', error);
			toast({
				title: 'Error',
				description: 'Failed to delete carousel item',
				variant: 'destructive',
			});
		}
	};

	// Toggle carousel item status
	const handleToggleStatus = async (id: number, currentStatus: boolean) => {
		if (!sessionToken) return;

		try {
			await carouselRequest.toggleCarousel(sessionToken, id, !currentStatus);

			toast({
				title: 'Success',
				description: `Carousel item ${
					!currentStatus ? 'activated' : 'deactivated'
				} successfully`,
			});

			fetchCarouselItems();
		} catch (error) {
			console.error('Error updating status:', error);
			toast({
				title: 'Error',
				description: 'Failed to update status',
				variant: 'destructive',
			});
		}
	};

	return (
		<div className="container mx-auto py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">{t('carouselManagement')}</h1>
				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
					<DialogTrigger asChild>
						<Button>{t('addNewItem')}</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{t('addNewCarouselItem')}</DialogTitle>
							<DialogDescription>
								{t('fillDetailsToAddNewCarouselItem')}
							</DialogDescription>
						</DialogHeader>
						<CarouselForm
							onSubmit={handleAddItem}
							submitButtonText={t('add')}
							onCancel={() => setIsAddDialogOpen(false)}
							isSubmitting={isSubmitting}
						/>
					</DialogContent>
				</Dialog>
			</div>

			{loading ? (
				<div className="flex justify-center items-center h-64">
					<Spinner size="lg" />
				</div>
			) : (
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>{t('id')}</TableHead>
								<TableHead>{t('title')}</TableHead>
								<TableHead>{t('image')}</TableHead>
								<TableHead>{t('link')}</TableHead>
								<TableHead>{t('order')}</TableHead>
								<TableHead>{t('status')}</TableHead>
								<TableHead>{t('actions')}</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{carouselItems.length === 0 ? (
								<TableRow>
									<TableCell colSpan={7} className="text-center py-8">
										{t('noCarouselItemsFound')}
									</TableCell>
								</TableRow>
							) : (
								carouselItems.map((item) => (
									<TableRow key={item.id}>
										<TableCell>{item.id}</TableCell>
										<TableCell className="max-w-[200px] truncate">
											{item.title}
										</TableCell>
										<TableCell>
											<div className="relative w-16 h-10 overflow-hidden rounded">
												<Image
													src={
														item.image?.publicUrl ||
														'https://placehold.co/300x150/png'
													}
													alt={item.title}
													fill
													className="object-cover"
												/>
											</div>
										</TableCell>
										<TableCell className="max-w-[200px] truncate">
											{item.linkUrl}
										</TableCell>
										<TableCell>{item.order}</TableCell>
										<TableCell>
											<Switch
												checked={item.isActive}
												onCheckedChange={() =>
													handleToggleStatus(item.id, item.isActive)
												}
											/>
										</TableCell>
										<TableCell>
											<div className="flex space-x-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => openEditDialog(item)}
												>
													{t('edit')}
												</Button>
												<Button
													variant="destructive"
													size="sm"
													onClick={() => openDeleteDialog(item)}
												>
													{t('delete')}
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			)}

			{/* Edit Dialog */}
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('editCarouselItem')}</DialogTitle>
						<DialogDescription>
							{t('updateCarouselItemDetails')}
						</DialogDescription>
					</DialogHeader>
					{currentItem && (
						<CarouselForm
							initialData={{
								title: currentItem.title,
								imageId: currentItem.imageId,
								linkUrl: currentItem.linkUrl,
								order: currentItem.order,
								isActive: currentItem.isActive,
							}}
							onSubmit={handleUpdateItem}
							submitButtonText={t('save')}
							onCancel={() => setIsEditDialogOpen(false)}
							isSubmitting={isSubmitting}
						/>
					)}
				</DialogContent>
			</Dialog>

			{/* Delete Dialog */}
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('deleteCarouselItem')}</DialogTitle>
						<DialogDescription>
							{t('confirmDeleteCarouselItem')}
						</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<p>
							{t('areYouSureDelete')} <strong>{currentItem?.title}</strong>?
						</p>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsDeleteDialogOpen(false)}
						>
							{t('cancel')}
						</Button>
						<Button variant="destructive" onClick={handleDeleteItem}>
							{t('delete')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
