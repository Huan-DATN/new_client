import Image from 'next/image';
import Link from 'next/link';

function ProductCard({ data }: { data: any }) {
	// Format price with commas
	const formatPrice = (price: number) => {
		return price?.toLocaleString('vi-VN') + ' ₫' || '0 ₫';
	};

	return (
		<Link
			key={data?.id || Math.random()}
			className="group flex flex-col overflow-hidden bg-white border border-gray-200 rounded-md shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
			href={`/buyer/products/${data?.id}`}
		>
			<div className="relative w-full pt-[80%] overflow-hidden bg-gray-100">
				<Image
					src={
						data?.images && data?.images.length > 0
							? data.images[0].publicUrl
							: 'https://placehold.co/600x400/png'
					}
					alt={data?.name || 'Product image'}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
					loading="lazy"
				/>
				{data?.discount > 0 && (
					<div className="absolute top-1 left-1 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-sm">
						-{data.discount}%
					</div>
				)}
			</div>
			<div className="flex flex-col flex-grow p-2">
				<h3 className="text-xs text-gray-800 font-medium line-clamp-2 min-h-[2.5rem]">{data?.name}</h3>
				<div className="mt-1.5">
					<div className="flex items-center">
						<p className="text-sm text-green-700 font-bold">{formatPrice(data?.price)}</p>
						{data?.originalPrice && data?.originalPrice > data?.price && (
							<p className="ml-1.5 text-[10px] text-gray-500 line-through">
								{formatPrice(data.originalPrice)}
							</p>
						)}
					</div>
					<div className="flex items-center mt-1">
						<div className="flex items-center">
							<svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
							</svg>
							<span className="ml-0.5 text-[10px] text-gray-600">{data?.rating || '4.5'}</span>
						</div>
						<div className="mx-1 text-gray-300 text-[10px]">|</div>
						<span className="text-[10px] text-gray-600">Đã bán {data?.soldCount || '0'}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
