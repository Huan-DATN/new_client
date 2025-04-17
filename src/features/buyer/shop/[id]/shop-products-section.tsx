'use client';
import productRequest from '@/api/productRequest';
import ProductsGrid from '@/components/products-grid';
import ProductsPagination from '@/features/buyer/products/[[...products]]/products-pagination';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function ShopProductsSection({ id }: { id: number }) {
	const params = useSearchParams();
	const checkedPage = params.get('page') || null;

	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		async function fetchData() {
			const response = await productRequest.getListByShopId(Number(id), {
				page: Number(checkedPage),
				limit: 12,
			});

			setProducts(response.payload.data as any);
			setTotalPages(response.payload.meta.totalPages);
			setTotalItems(response.payload.meta.total);
		}
		fetchData();
	}, [checkedPage, id]);

	return (
		<div>
			<div className="flex flex-col gap-2 px-5">
				<ProductsGrid data={products} col={4} />
			</div>

			<div>
				<ProductsPagination totalPages={totalPages} />
			</div>
		</div>
	);
}

export default ShopProductsSection;
