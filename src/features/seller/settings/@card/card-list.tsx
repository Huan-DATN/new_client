'use client';

import cardRequest from '@/api/cardRequest';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { CardResponseType } from '@/schemaValidations/response/card';
import { CreditCard, Edit, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CardForm } from './card-form';

interface CardListProps {
	cards: CardResponseType[];
	sessionToken: string;
}

export function CardList({ cards: initialCards, sessionToken }: CardListProps) {
	const [cards, setCards] = useState<CardResponseType[]>(initialCards);
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState<CardResponseType | null>(
		null
	);
	const router = useRouter();

	const handleAddCard = async (newCard: CardResponseType) => {
		setCards([...cards, newCard]);
		setIsAddDialogOpen(false);
		toast({
			title: 'Success',
			description: 'Card added successfully',
		});
		router.refresh();
	};

	const handleUpdateCard = async (updatedCard: CardResponseType) => {
		setCards(
			cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
		);
		setIsEditDialogOpen(false);
		setSelectedCard(null);
		toast({
			title: 'Success',
			description: 'Card updated successfully',
		});
		router.refresh();
	};

	const handleDeleteCard = async (cardId: number) => {
		try {
			await cardRequest.deleteCard(sessionToken, cardId);
			setCards(cards.filter((card) => card.id !== cardId));
			toast({
				title: 'Success',
				description: 'Card deleted successfully',
			});
			router.refresh();
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to delete card',
				variant: 'destructive',
			});
		}
	};

	const openEditDialog = (card: CardResponseType) => {
		setSelectedCard(card);
		setIsEditDialogOpen(true);
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Chuyển khoản</h2>
				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="outline">
							<Plus className="mr-2 h-4 w-4" />
							Thêm chuyển khoản
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Thêm chuyển khoản</DialogTitle>
							<DialogDescription>
								Nhập thông tin chuyển khoản của bạn dưới đây.
							</DialogDescription>
						</DialogHeader>
						<CardForm
							sessionToken={sessionToken}
							onSuccess={handleAddCard}
							onCancel={() => setIsAddDialogOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>

			{cards.length === 0 ? (
				<div className="text-center py-10">
					<CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
					<h3 className="mt-4 text-lg font-semibold">
						Không tìm thấy chuyển khoản
					</h3>
					<p className="mt-2 text-sm text-muted-foreground">
						Thêm chuyển khoản để quản lý các phương thức thanh toán của bạn.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{cards.map((card) => (
						<Card key={card.id} className={!card.isActive ? 'opacity-60' : ''}>
							<CardHeader className="pb-2">
								<CardTitle className="flex justify-between items-center">
									<span>{card.name}</span>
									{!card.isActive && (
										<span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
											Không hoạt động
										</span>
									)}
								</CardTitle>
								<CardDescription>{card.bankName}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col space-y-4">
									<div className="flex items-center space-x-2">
										<p className="font-bold">{card.accountNumber}</p>
									</div>
									<div className="flex justify-center">
										<img
											src={card.image.publicUrl}
											alt="QR Code"
											className="h-24 w-24 object-contain"
										/>
									</div>
								</div>
							</CardContent>
							<CardFooter className="flex justify-end space-x-2">
								<Button
									variant="outline"
									size="icon"
									onClick={() => openEditDialog(card)}
								>
									<Edit className="h-4 w-4" />
								</Button>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button variant="outline" size="icon">
											<Trash2 className="h-4 w-4 text-destructive" />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Xóa chuyển khoản</AlertDialogTitle>
											<AlertDialogDescription>
												Bạn có chắc chắn muốn xóa chuyển khoản này? Thao tác này
												không thể hoàn tác.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => handleDeleteCard(card.id)}
											>
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</CardFooter>
						</Card>
					))}
				</div>
			)}

			{/* Edit Dialog */}
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Chỉnh sửa chuyển khoản</DialogTitle>
						<DialogDescription>
							Chỉnh sửa thông tin chuyển khoản của bạn dưới đây.
						</DialogDescription>
					</DialogHeader>
					{selectedCard && (
						<CardForm
							sessionToken={sessionToken}
							onSuccess={handleUpdateCard}
							onCancel={() => setIsEditDialogOpen(false)}
							card={selectedCard}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
