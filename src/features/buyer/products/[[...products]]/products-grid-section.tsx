'use client';
import productRequest from '@/api/productRequest';
import ProductsGrid from '@/components/products-grid';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductsPagination from './products-pagination';

function ProductsGridSection() {
	const params = useSearchParams();
	const checkedCityId = params.get('cityId') || undefined;
	const checkedGroupProductId = params.get('groupProductId') || undefined;
	const checkedName = params.get('name') || undefined;
	const checkedPage = params.get('page') || null;

	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		async function fetchData() {
			const response = await productRequest.getList(
				{ page: Number(checkedPage) },
				{
					name: checkedName,
					cityId: Number(checkedCityId),
					groupProductId: Number(checkedGroupProductId),
				}
			);

			setProducts(response.payload.data as any);
			setTotalPages(response.payload.meta.totalPages);
			setTotalItems(response.payload.meta.total);
		}
		fetchData();
	}, [checkedCityId, checkedGroupProductId, checkedName, checkedPage]);

	return (
		<div className="flex flex-col gap-2 w-full h-full mt-5">
			<div className="flex flex-col gap-2 px-5">
				<span>
					Hiện có <span>{totalItems}</span> sản phẩm cùng danh mục
				</span>
			</div>

			<div className="flex flex-col gap-2 px-5">
				<ProductsGrid data={products} col={3} />
			</div>

			<div>
				<ProductsPagination totalPages={totalPages} />
			</div>
		</div>
	);
}

export default ProductsGridSection;
