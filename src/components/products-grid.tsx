import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { ProductListResType } from '../schemaValidations/response/product';

function ProductsGrid({
	data,
	col,
}: {
	data: ProductListResType['data'];
	col: number;
}) {
	const gridStyle = clsx({
		'grid grid-cols-2 gap-4': col === 2,
		'grid grid-cols-3 gap-4': col === 3,
		'grid grid-cols-4 gap-4': col === 4,
		'grid grid-cols-5 gap-4': col === 5,
	});
	return (
		<div className={`${gridStyle} w-full mt-5`}>
			{data.map((item: any) => (
				<Link
					key={Math.random()}
					className="flex flex-col border-3 border-gray-300 shadow-lg rounded-lg"
					href={`/buyer/products/${item.id}`}
				>
					<Image
						src={item.image}
						alt={`Product ${String(Math.random())}`}
						width={245}
						height={300}
						className="w-full h-full object-cover rounded-t-lg hover:scale-105 transition-transform duration-300 ease-in-out"
						loading="lazy"
					/>
					<div className="flex flex-col px-2 py-4">
						<h3 className="text-lg font-semibold">{item.name}</h3>
						<p className="text-green-700 font-bold">{item.price}</p>
						<p className="text-gray-500">Đánh giá: {`4.5 (44)`}</p>
					</div>
				</Link>
			))}
		</div>
	);
}

export default ProductsGrid;
