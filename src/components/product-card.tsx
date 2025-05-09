import Image from 'next/image';
import Link from 'next/link';

function ProductCard({ data }: { data: any }) {
	return (
		<Link
			key={Math.random()}
			className="flex flex-col border-3 border-gray-300 shadow-lg rounded-lg"
			href={`/buyer/products/${data.id}`}
		>
			<Image
				src={
					data.images && data.images.length > 0
						? data.images[0].publicUrl
						: 'https://placehold.co/600x400/png'
				}
				alt={`Product ${String(Math.random())}`}
				width={245}
				height={300}
				className="w-full h-full object-cover rounded-t-lg hover:scale-105 transition-transform duration-300 ease-in-out"
				loading="lazy"
			/>
			<div className="flex flex-col px-2 py-4">
				<h3 className="text-lg font-semibold">{data.name}</h3>
				<p className="text-green-700 font-bold">{data.price}</p>
				<p className="text-gray-500">Đánh giá: {`4.5 (44)`}</p>
			</div>
		</Link>
	);
}

export default ProductCard;
