import clsx from 'clsx';
import { ProductListResType } from '../schemaValidations/response/product';
import ProductCard from './product-card';

function ProductsGrid({
	data,
	col,
}: {
	data: ProductListResType['data'];
	col: number;
}) {
	const gridStyle = clsx({
		'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3':
			col === 2,
		'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3':
			col === 3,
		'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3':
			col === 4,
		'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-3':
			col === 5,
	});

	// If no products, show empty state
	if (!data || data.length === 0) {
		return (
			<div className="w-full mt-5 py-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
				<svg
					className="w-16 h-16 text-gray-300"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1}
						d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
					/>
				</svg>
				<p className="mt-4 text-gray-500">Không tìm thấy sản phẩm nào</p>
			</div>
		);
	}

	return (
		<div className={`${gridStyle} w-full mt-3`}>
			{data.map((item: any) => (
				<ProductCard key={item.id} data={item} />
			))}
		</div>
	);
}

export default ProductsGrid;
