'use client';
import productRequest from '@/api/productRequest';
import { ProductListResType } from '@/schemaValidations/response/product';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from './product-card';
import ProductsPagination from './products-pagination';

function ProductsList({ sessionToken }: { sessionToken: string }) {
	const router = useRouter();
	const params = useSearchParams();
	const page = Number(params.get('page') || 1);
	const limit = Number(params.get('limit') || 12);

	const [products, setProducts] = useState<ProductListResType['data']>([]);
	const [totalPages, setTotalPages] = useState<ProductListResType['meta']['totalPages']>(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const response = await productRequest.getListByMe(sessionToken, {
					page,
					limit,
				});

				const { data } = response.payload;
				setProducts(data);
				setTotalPages(response.payload.meta.totalPages);
			} catch (error) {
				console.error('Error fetching products:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, [sessionToken, page, limit]);

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(window.location.search);
		params.set('page', newPage.toString());
		router.push(`/seller/product?${params.toString()}`);
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-12">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
			</div>
		);
	}

	return (
		<div className="mt-6">
			{products.length === 0 ? (
				<div className="text-center py-12 bg-gray-50 rounded-lg">
					<h3 className="text-lg font-medium text-gray-700">Không có sản phẩm nào</h3>
					<p className="text-gray-500 mt-2">Bạn chưa có sản phẩm nào. Hãy thêm sản phẩm mới.</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{products.map((product) => (
							<ProductCard key={product.id} data={product} />
						))}
					</div>
					<div className="mt-8">
						<ProductsPagination
							totalPages={totalPages}
							currentPage={page}
							onPageChange={handlePageChange}
						/>
					</div>
				</>
			)}
		</div>
	);
}

export default ProductsList;
