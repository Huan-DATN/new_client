'use client';
import ratingRequest from '@/api/ratingRequest';
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
import { Label } from '@/components/ui/label';
import { Ratings } from '@/components/ui/ratings';
import { Textarea } from '@/components/ui/textarea';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { handleErrorApi } from '@/lib/utils';
import {
	getComment,
	getRating,
	setComment,
	setRatings,
} from '@/redux/ratingProducts/ratingProductsReducer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
export function DialogDemo({
	items,
	orderId,
	sessionToken,
}: {
	items: {
		product?: any;
	}[];
	orderId: number;
	sessionToken: string;
}) {
	const ratings = useAppSelector((state) => state.ratingProduct);
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async () => {
		setLoading(true);
		if (loading) return;

		try {
			for (const item of items) {
				const productId = item.product.id;
				const ratingData = {
					rating: getRating(ratings, productId),
					comment: getComment(ratings, productId),
				};

				console.log('ratingData', ratingData);

				await ratingRequest.createRating(
					sessionToken,
					orderId,
					productId,
					ratingData
				);
			}

			toast.success('Đánh giá thành công');
			router.push('/buyer/order/me');
			router.refresh();
		} catch (error) {
			handleErrorApi({
				error,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="bg-gray-300 text-sm mt-2 hover:bg-gray-400 max-w-1/2!"
				>
					Đánh giá
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Đánh giá sản phẩm</DialogTitle>
					<DialogDescription>
						Vui lòng đánh giá sản phẩm mà bạn đã nhận được. Đánh giá của bạn sẽ
						góp phần cải thiện chất lượng dịch vụ của chúng tôi.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{items.map(({ product }) => (
						<div key={product.id} className="flex items-center">
							<div className="flex flex-col items-center">
								<Image
									src={product.images[0]?.publicUrl}
									alt={product.name}
									className="w-16 h-16 rounded"
									width={100}
									height={100}
								/>
								<Label htmlFor={`rating-${product.id}`}>{product.name}</Label>
							</div>

							<div className="ml-4 flex-1">
								<Ratings
									rating={getRating(ratings, product.id)}
									variant="destructive"
									onClick={() => {
										dispatch(
											setRatings({
												productId: product.id,
												body: {
													ratings:
														getRating(ratings, product.id) + 1 > 5
															? 1
															: getRating(ratings, product.id) + 1,
													comment: getComment(ratings, product.id),
												},
											})
										);
									}}
								/>

								<div className="grid w-full gap-1.5">
									<Label htmlFor="message">Your message</Label>
									<Textarea
										id={`comment-${product.id}`}
										value={getComment(ratings, product.id)}
										placeholder="Nhập bình luận của bạn"
										onChange={(e) => {
											dispatch(
												setComment({
													productId: product.id,
													body: {
														ratings: Number(getRating(ratings, product.id)),
														comment: e.target.value,
													},
												})
											);
										}}
									/>
								</div>
							</div>
						</div>
					))}
				</div>

				<DialogFooter>
					<Button type="submit" onClick={handleSubmit}>
						Đánh giá
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
