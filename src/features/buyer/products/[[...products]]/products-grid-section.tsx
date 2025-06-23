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
	const checkedMinPrice = params.get('minPrice') || undefined;
	const checkedMaxPrice = params.get('maxPrice') || undefined;
	const checkedPage = params.get('page') || null;

	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [totalItems, setTotalItems] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [displayMode, setDisplayMode] = useState<'grid' | 'compact'>('grid');

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			try {
				const response = await productRequest.getList(
					{ page: Number(checkedPage), limit: 12 },
					{
						name: checkedName,
						cityId: Number(checkedCityId),
						groupProductId: Number(checkedGroupProductId),
					},
					{
						minPrice: Number(checkedMinPrice),
						maxPrice: Number(checkedMaxPrice),
					}
				);

				setProducts(response.payload.data as any);
				setTotalPages(response.payload.meta.totalPages);
				setTotalItems(response.payload.meta.total);
			} catch (error) {
				console.error('Error fetching products:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, [
		checkedCityId,
		checkedGroupProductId,
		checkedName,
		checkedPage,
		checkedMinPrice,
		checkedMaxPrice,
	]);

	// Column count based on display mode (more columns in compact mode)
	const gridCols = displayMode === 'compact' ? 4 : 3;

	return (
		<div className="flex flex-col w-full h-full py-4 px-5">
			{/* Header section with info and display options */}
			<div className="flex justify-between items-center border-b border-gray-200 pb-4">
				<div>
					<p className="text-sm text-gray-700">
						Hiển thị <span className="font-medium">{products.length}</span> trên
						tổng số <span className="font-medium">{totalItems}</span> sản phẩm
					</p>
				</div>
			</div>

			{/* Products grid with loading state */}
			<div className="mt-4">
				{isLoading ? (
					<div className="flex justify-center items-center py-16">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
					</div>
				) : (
					<ProductsGrid data={products} col={gridCols} />
				)}
			</div>

			{/* Pagination */}
			<ProductsPagination totalPages={totalPages} />
		</div>
	);
}

export default ProductsGridSection;
