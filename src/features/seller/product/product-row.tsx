import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductListResType } from '@/schemaValidations/response/product';
import { Edit, Eye, ShoppingCart, Star, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ButtonToggleActive from './button-toggle-active';

function ProductRow({ data }: { data: ProductListResType['data'][number] }) {
	// Format price with commas
	const formatPrice = (price: number) => {
		return price.toLocaleString('vi-VN', {
			style: 'currency',
			currency: 'VND',
		});
	};

	return (
		<div className="w-full bg-white border rounded-lg overflow-hidden transition-shadow hover:shadow-md">
			<div className="flex flex-col sm:flex-row items-stretch">
				{/* Product Image */}
				<div className="relative w-full sm:w-24 h-24 sm:h-auto bg-gray-50">
					<Image
						src={
							data.images && data.images.length > 0
								? data.images[0].publicUrl
								: 'https://placehold.co/200x200/f5f5f5/a3a3a3?text=No+Image'
						}
						alt={data.name}
						fill
						sizes="(max-width: 768px) 100vw, 96px"
						className="object-cover"
					/>
				</div>

				{/* Product Information */}
				<div className="flex-1 flex flex-col sm:flex-row p-3 gap-4">
					<div className="flex-1">
						<div className="flex items-start gap-2">
							<h3
								className="font-medium text-sm line-clamp-1 flex-1"
								title={data.name}
							>
								{data.name}
							</h3>
							<div className="flex items-center gap-1">
								<Badge
									variant={data.isActive ? 'default' : 'secondary'}
									className={
										data.isActive
											? 'bg-green-50 text-green-700 border-green-200'
											: ''
									}
								>
									{data.isActive ? 'Đang bán' : 'Đã ẩn'}
								</Badge>
								{data.quantity <= 5 && (
									<Badge
										variant="outline"
										className="bg-yellow-50 text-yellow-700 border-yellow-200"
									>
										Sắp hết
									</Badge>
								)}
								{data.quantity <= 0 && (
									<Badge variant="destructive">Hết hàng</Badge>
								)}
							</div>
						</div>

						<div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
							<span>ID: #{data.id}</span>
							<span className="flex items-center">
								<Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
								{data.star}
							</span>
							<span className="flex items-center">
								<ShoppingCart className="h-3 w-3 mr-1" />0 đã bán
							</span>
							<span>
								{data.groupProduct ? data.groupProduct.name : 'Chưa phân loại'}
							</span>
						</div>
					</div>

					<div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 mt-2 sm:mt-0 min-w-[160px]">
						<div className="font-bold text-primary">
							{formatPrice(data.price)}
						</div>
						<div className="text-sm">
							Còn lại: <span className="font-medium">{data.quantity}</span>
						</div>
					</div>

					<div className="flex flex-wrap sm:flex-col justify-end items-center gap-1 mt-3 sm:mt-0">
						<ButtonToggleActive id={data.id} isActive={data.isActive} />

						<div className="flex items-center gap-1">
							<Link href={`/seller/product/${data.id}`}>
								<Button variant="outline" size="sm" className="h-8 w-8 p-0">
									<Eye size={15} />
								</Button>
							</Link>
							<Link href={`/seller/product/${data.id}/edit`}>
								<Button
									variant="outline"
									size="sm"
									className="h-8 w-8 p-0 text-primary"
								>
									<Edit size={15} />
								</Button>
							</Link>
							<Button
								variant="outline"
								size="sm"
								className="h-8 w-8 p-0 text-red-600"
							>
								<Trash size={15} />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductRow;
