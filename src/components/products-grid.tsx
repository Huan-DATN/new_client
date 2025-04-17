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
		'grid grid-cols-2 gap-4': col === 2,
		'grid grid-cols-3 gap-4': col === 3,
		'grid grid-cols-4 gap-4': col === 4,
		'grid grid-cols-5 gap-4': col === 5,
	});
	return (
		<div className={`${gridStyle} w-full mt-5`}>
			{data.map((item: any) => (
				<ProductCard key={item.id} data={item} />
			))}
		</div>
	);
}

export default ProductsGrid;
