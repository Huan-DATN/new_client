import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { ProductListResType } from '@/schemaValidations/response/product';
import { Eye, MessageCircle, ShoppingCart, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ButtonToggleActive from './button-toggle-active';

function ProductCard({ data }: { data: ProductListResType['data'][number] }) {
	// Format price with commas
	const formatPrice = (price: number) => {
		return price.toLocaleString('vi-VN', {
			style: 'currency',
			currency: 'VND',
		});
	};

	// Determine stock status and get appropriate badge
	const getStockBadge = () => {
		if (data.quantity <= 0) {
			return (
				<Badge variant="destructive" className="absolute top-2 left-2">
					Hết hàng
				</Badge>
			);
		} else if (data.quantity <= 5) {
			return (
				<Badge
					variant="outline"
					className="absolute top-2 left-2 bg-yellow-50 text-yellow-700 border-yellow-200"
				>
					Sắp hết
				</Badge>
			);
		}
		return null;
	};

	return (
		<Card className="overflow-hidden transition-all hover:shadow-md group">
			{/* Product Image with Status Badges */}
			<div className="relative pt-[100%] bg-gray-50 overflow-hidden">
				<Image
					src={
						data.images && data.images.length > 0
							? data.images[0].publicUrl
							: 'https://placehold.co/600x400/png'
					}
					alt={data.name}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover transition-transform group-hover:scale-105"
				/>

				{/* Status Badges */}
				{getStockBadge()}

				<Badge
					variant={data.isActive ? 'default' : 'secondary'}
					className={`absolute top-2 right-2 ${
						data.isActive
							? 'bg-green-50 text-green-700 border-green-200'
							: 'bg-gray-50 text-gray-700 border-gray-200'
					}`}
				>
					{data.isActive ? 'Đang bán' : 'Đã ẩn'}
				</Badge>

				{/* Quick Action Overlay */}
				<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link href={`/admin/product/${data.id}`}>
									<Button
										variant="secondary"
										size="icon"
										className="h-9 w-9 rounded-full"
									>
										<Eye size={16} />
									</Button>
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Xem chi tiết</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>

			{/* Product Information */}
			<CardContent className="p-4">
				<div className="space-y-2">
					<div className="flex items-start justify-between">
						<h3 className="font-medium text-sm line-clamp-2" title={data.name}>
							{data.name}
						</h3>
						{/* Static rating display for UI demonstration */}
						<div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-700 text-xs font-medium">
							<svg
								className="w-3 h-3 text-yellow-400 mr-1"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
							</svg>
							4.5
						</div>
					</div>

					<div className="flex justify-between items-center">
						<p className="font-bold text-primary">{formatPrice(data.price)}</p>
						<div className="flex items-center gap-1">
							{/* Static sold quantity for UI demonstration */}
							<span className="text-xs text-gray-500 flex items-center gap-1">
								<ShoppingCart size={12} />0 đã bán
							</span>
						</div>
					</div>

					<div className="flex justify-between items-center text-xs">
						<div className="text-gray-500">
							{data.groupProduct ? data.groupProduct.name : 'Chưa phân loại'}
						</div>
						<div className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
							Còn: {data.quantity}
						</div>
					</div>
				</div>
			</CardContent>

			{/* Action Footer */}
			<CardFooter className="bg-gray-50 p-2 border-t flex items-center justify-between">
				<ButtonToggleActive id={data.id} isActive={data.isActive} />

				<div className="flex items-center gap-1">
					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-8 p-0 text-blue-600"
					>
						<MessageCircle size={16} />
					</Button>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="h-8 w-8 p-0 text-red-600"
								>
									<Trash size={16} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Xóa sản phẩm</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</CardFooter>
		</Card>
	);
}

export default ProductCard;
