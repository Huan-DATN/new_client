import productRequest from '@/api/productRequest';
import { Separator } from '@/components/ui/separator';
import { getRole } from '@/lib/utils';
import {
	ArrowLeft,
	CheckCircle,
	MapPin,
	Package,
	ShoppingBag,
	Star,
	Truck,
} from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import AddToCart from './add-to-cart';
import ProductSimilar from './product-similar';
import RatingsSection from './ratings-section';

async function ProductDetail({ id }: { id: string }) {
	const res = await productRequest.getDetail(Number(id));
	const data = res.payload.data;

	const resRecommend = await productRequest.getProductRecommend(Number(id), {
		limit: 4,
	});

	const recommendData = resRecommend.payload.data;

	const token = (await cookies()).get('sessionToken')?.value;
	const role = getRole(token!);

	// Format price with separators
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('vi-VN').format(price);
	};

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			{/* Breadcrumb and back button */}
			<div className="mb-6">
				<Link
					href="/buyer/products"
					className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
				>
					<ArrowLeft className="h-4 w-4 mr-1" />
					Quay lại danh sách sản phẩm
				</Link>
			</div>

			{/* Main product section */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
				{/* Product Images */}
				<div className="space-y-4">
					<div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
						<Image
							src={
								data.images && data.images.length > 0
									? data.images[0].publicUrl
									: 'https://placehold.co/600x400/png'
							}
							alt={data.name}
							fill
							className="object-cover rounded-xl transition-transform duration-300 hover:scale-105"
						/>
					</div>

					{/* Thumbnail gallery */}
					{data.images && data.images.length > 1 && (
						<div className="flex gap-2 overflow-x-auto pb-2">
							{data.images.map((image, index) => (
								<div
									key={index}
									className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 hover:border-green-500 cursor-pointer"
								>
									<Image
										src={image.publicUrl}
										alt={`${data.name} - ${index}`}
										fill
										className="object-cover"
									/>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Product Info */}
				<div className="flex flex-col">
					{/* Title and rating */}
					<div className="mb-4">
						<h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
							{data.name}
						</h1>

						<div className="flex items-center gap-2 mb-2">
							<div className="flex">
								{[...Array(4)].map((_, index) => (
									<Star
										key={index}
										className={`h-5 w-5 ${
											index < data.star!
												? 'fill-yellow-400 text-yellow-400'
												: 'text-gray-300'
										}`}
									/>
								))}
							</div>
							<span className="text-sm text-gray-500">
								({data.star || 0} sao)
							</span>
						</div>
					</div>

					{/* Price section */}
					<div className="mb-6 bg-gray-50 p-4 rounded-lg">
						<div className="text-3xl font-bold text-green-600 mb-1">
							{formatPrice(data.price)} ₫
						</div>
					</div>

					{/* Product metadata */}
					<div className="space-y-3 mb-6">
						<div className="flex items-start gap-2">
							<MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
							<div>
								<span className="text-gray-700 font-medium">Xuất xứ: </span>
								<span>{data.city?.name}</span>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<ShoppingBag className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
							<div>
								<span className="text-gray-700 font-medium">Chủ shop: </span>
								<Link
									href={`/buyer/shop/${data.user!.id}`}
									className="text-green-600 hover:underline"
								>
									{data.user!.shopName || 'Người bán'}
								</Link>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<Package className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
							<div>
								<span className="text-gray-700 font-medium">Danh mục: </span>
								<span>
									{data.categories?.map((category) => category.name).join(', ')}
								</span>
							</div>
						</div>
					</div>

					{/* Description */}
					{data.description && (
						<div className="mb-6">
							<h3 className="text-md font-semibold mb-2">Mô tả sản phẩm</h3>
							<p className="text-gray-700">{data.description}</p>
						</div>
					)}

					<Separator className="my-4" />

					{/* Delivery & benefits */}
					<div className="grid grid-cols-2 gap-3 mb-6">
						<div className="flex items-center gap-2">
							<CheckCircle className="h-5 w-5 text-green-500" />
							<span className="text-sm">Sản phẩm chính hãng</span>
						</div>
						<div className="flex items-center gap-2">
							<Truck className="h-5 w-5 text-green-500" />
							<span className="text-sm">Giao hàng nhanh chóng</span>
						</div>
					</div>

					{/* Add to cart section */}
					{role === 'BUYER' && (
						<div className="mt-auto">
							<AddToCart id={data.id} />
						</div>
					)}
				</div>
			</div>

			{/* Similar products section */}
			<div className="mb-12">
				<h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
					<span className="w-1 h-6 bg-green-500 rounded-full mr-2 inline-block"></span>
					Sản phẩm tương tự
				</h2>
				<ProductSimilar data={recommendData} />
			</div>

			{/* Ratings section */}
			<div className="mb-8">
				<h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
					<span className="w-1 h-6 bg-green-500 rounded-full mr-2 inline-block"></span>
					Đánh giá từ khách hàng
				</h2>
				<RatingsSection id={data.id} />
			</div>
		</div>
	);
}

export default ProductDetail;
