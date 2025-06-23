'use client';

import cardRequest from '@/api/cardRequest';
import mediaRequest from '@/api/mediaRequest';
import paymentRequest from '@/api/paymentRequest';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { handleErrorApi } from '@/lib/utils';
import { CardResponseType } from '@/schemaValidations/response/card';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import orderRequest from '../../../../api/orderRequest';

interface BankTransferProps {
	sessionToken: string;
	shopId: number;
	orderId?: number;
	amount: number;
	isOpen: boolean;
	onClose: () => void;
}

export default function BankTransfer({
	sessionToken,
	shopId,
	orderId,
	amount,
	isOpen,
	onClose,
}: BankTransferProps) {
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [cards, setCards] = useState<CardResponseType[]>([]);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (isOpen) {
			fetchCards();
		}
	}, [isOpen]);

	const fetchCards = async () => {
		try {
			setLoading(true);
			const response = await cardRequest.getCardByShopId(sessionToken, shopId);
			setCards(response.payload.data);
		} catch (error) {
			handleErrorApi({ error });
		} finally {
			setLoading(false);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async () => {
		if (!selectedFile || !orderId) {
			toast.error('Vui lòng tải lên ảnh chứng từ chuyển khoản');
			return;
		}

		try {
			setSubmitting(true);

			const orderResponse = await orderRequest.createOrder(
				sessionToken,
				shopId,
				{
					paymentMethod: 'BANK_TRANSFER',
				}
			);

			// Upload the payment proof image
			const formData = new FormData();
			formData.append('image', selectedFile);
			const uploadResponse = await mediaRequest.uploadImage(formData);
			const imageId = uploadResponse.payload.data.id;

			// Create the payment record
			await paymentRequest.createPayment(sessionToken, {
				orderId: Number(orderResponse.payload.data.id),
				imageId,
				amount,
			});

			toast.success('Thanh toán thành công');

			onClose();
			router.push('/buyer/order/me');
		} catch (error) {
			handleErrorApi({ error });
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
				<DialogHeader>
					<DialogTitle className="text-center">
						Thanh toán chuyển khoản
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4 py-4">
					{loading ? (
						<div className="flex justify-center py-8">
							<Loader2 className="h-8 w-8 animate-spin text-primary" />
						</div>
					) : cards.length === 0 ? (
						<div className="text-center py-4">
							<p className="text-muted-foreground">
								Không có thông tin tài khoản ngân hàng
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{cards.map((card) => (
								<div key={card.id} className="border rounded-lg p-4">
									<div className="flex items-center justify-between mb-2">
										<h3 className="font-medium">{card.bankName}</h3>
									</div>
									<Separator className="my-2" />
									<div className="space-y-2 text-sm">
										<p>
											<span className="text-muted-foreground">Tên TK:</span>{' '}
											{card.name}
										</p>
										<p>
											<span className="text-muted-foreground">Số TK:</span>{' '}
											{card.accountNumber}
										</p>
										<p>
											<span className="text-muted-foreground">Số tiền:</span>{' '}
											<span className="font-semibold text-green-600">
												{new Intl.NumberFormat('vi-VN', {
													style: 'currency',
													currency: 'VND',
												}).format(amount)}
											</span>
										</p>
										<div className="relative w-full h-auto aspect-[2/1] my-2">
											<Image
												src={card.image.publicUrl}
												alt={card.bankName}
												className="object-contain rounded-md border"
												width={400}
												height={100}
											/>
										</div>
										<p className="text-xs text-muted-foreground italic">
											Nội dung CK: Thanh toán đơn hàng #{orderId}
										</p>
									</div>
								</div>
							))}

							<div className="mt-6">
								<label className="block text-sm font-medium mb-2">
									Tải lên ảnh chứng từ chuyển khoản
								</label>
								<input
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-primary-foreground
                    hover:file:bg-primary/90"
								/>
								{previewUrl && (
									<div className="mt-2 relative w-full h-auto aspect-[2/1]">
										<Image
											src={previewUrl}
											alt="Payment proof"
											fill
											sizes="(max-width: 768px) 100vw, 400px"
											className="object-contain rounded-md border"
										/>
									</div>
								)}
							</div>
						</div>
					)}
				</div>

				<div className="flex justify-end gap-2">
					<Button variant="outline" onClick={onClose}>
						Hủy
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={submitting || !selectedFile}
						className="bg-green-600 hover:bg-green-700"
					>
						{submitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử lý...
							</>
						) : (
							'Xác nhận thanh toán'
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
