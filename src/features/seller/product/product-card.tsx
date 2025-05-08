import { Button } from '@/components/ui/button';
import { ProductListResType } from '@/schemaValidations/response/product';
import { Edit, Eye } from 'lucide-react';
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

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-all hover:shadow-md">
			{/* Product Image */}
			<div className="relative pt-[70%] bg-gray-50">
				<Image
					src={
						data.images.length > 0
							? data.images[0].publicUrl
							: 'https://placehold.co/600x400/png'
					}
					alt={data.name}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover"
				/>
				{/* Status Badge */}
				<div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${
					data.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
				}`}>
					{data.isActive ? 'Đang bán' : 'Đã ẩn'}
				</div>
			</div>

			{/* Product Information */}
			<div className="p-3 flex-grow">
				<h3 className="font-medium text-sm mb-1 line-clamp-2" title={data.name}>
					{data.name}
				</h3>

				<div className="flex justify-between items-center mt-2">
					<p className="font-bold text-green-700">{formatPrice(data.price)}</p>
					<span className="text-xs text-gray-600">Còn: {data.quantity}</span>
				</div>

				<div className="text-xs text-gray-500 mt-1">
					{data.groupProduct && data.groupProduct.name}
				</div>
			</div>

			{/* Action Buttons */}
			<div className="border-t border-gray-100 p-2">
				<div className="flex items-center justify-between gap-2">
					<div className="flex-shrink-0">
						<ButtonToggleActive id={data.id} isActive={data.isActive} />
					</div>

					<div className="flex items-center gap-1">
						<Link href={`/seller/product/${data.id}`}>
							<Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600">
								<Eye size={16} />
							</Button>
						</Link>

						<Link href={`/seller/product/${data.id}/edit`}>
							<Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600">
								<Edit size={16} />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
