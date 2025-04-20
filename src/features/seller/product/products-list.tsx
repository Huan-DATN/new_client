'use client';
import productRequest from '@/api/productRequest';
import { ProductListResType } from '@/schemaValidations/response/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductRow from './product-row';
import ProductsPagination from './products-pagination';

function ProductsList({ sessionToken }: { sessionToken: string }) {
	const params = useSearchParams();
	const page = params.get('page') || 1;
	const limit = params.get('limit') || 10;

	const [products, setProducts] = useState<ProductListResType['data']>([]);
	const [totalPages, setTotalPages] =
		useState<ProductListResType['meta']['totalPages']>(0);
	useEffect(() => {
		const fetchProducts = async () => {
			const response = await productRequest.getListByMe(sessionToken, {
				page: Number(page),
				limit: Number(limit),
			});

			const data = response.payload.data;
			setProducts(data);
			setTotalPages(response.payload.meta.totalPages);
		};

		fetchProducts();
	}, []);

	return (
		<div>
			{products.map((product) => (
				<ProductRow key={product.id} data={product} />
			))}
			<ProductsPagination totalPages={totalPages} />
		</div>
	);
}

export default ProductsList;
