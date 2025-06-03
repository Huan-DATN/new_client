'use client';
import productRequest from '@/api/productRequest';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductListResType } from '@/schemaValidations/response/product';
import { Download, Grid3X3, LayoutList, RefreshCw, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from './product-card';
import ProductRow from './product-row';
import ProductsPagination from './products-pagination';

function ProductsList({
	sessionToken,
	isActive = undefined,
}: {
	sessionToken: string;
	isActive?: boolean;
}) {
	const router = useRouter();
	const params = useSearchParams();
	const page = Number(params.get('page') || 1);
	const limit = Number(params.get('limit') || 12);
	const orderBy = params.get('orderBy') || 'createdAt';
	const order = params.get('order') || 'desc';
	const name = params.get('name') || '';

	const [products, setProducts] = useState<ProductListResType['data']>([]);
	const [totalProducts, setTotalProducts] = useState<number>(0);
	const [totalPages, setTotalPages] =
		useState<ProductListResType['meta']['totalPages']>(0);
	const [isLoading, setIsLoading] = useState(true);
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
	const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				// console.log(orderBy, order);
				const response = await productRequest.getListByAdmin(
					sessionToken,
					{
						page,
						limit,
					},
					{
						sortBy: orderBy as 'name' | 'createdAt' | 'price',
						sortOrder: order as 'desc' | 'asc',
					},
					{
						name,
						isActive,
					}
				);

				const { data } = response.payload;
				setProducts(data);
				setTotalProducts(response.payload.meta.total);
				setTotalPages(response.payload.meta.totalPages);
			} catch (error) {
				console.error('Error fetching products:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, [sessionToken, page, limit, orderBy, order, name]);

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(window.location.search);
		params.set('page', newPage.toString());
		router.push(`/admin/product?${params.toString()}`);
	};

	const toggleSelectAll = () => {
		if (selectedProducts.length === products.length) {
			setSelectedProducts([]);
		} else {
			setSelectedProducts(products.map((product) => product.id));
		}
	};

	const toggleSelectProduct = (id: number) => {
		if (selectedProducts.includes(id)) {
			setSelectedProducts(
				selectedProducts.filter((productId) => productId !== id)
			);
		} else {
			setSelectedProducts([...selectedProducts, id]);
		}
	};

	if (isLoading) {
		return (
			<div className="space-y-4">
				{viewMode === 'grid' ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{Array(8)
							.fill(0)
							.map((_, index) => (
								<div
									key={index}
									className="bg-white border rounded-lg overflow-hidden"
								>
									<div className="h-40 bg-gray-200 animate-pulse" />
									<div className="p-3 space-y-2">
										<div className="h-4 bg-gray-200 rounded animate-pulse" />
										<div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
										<div className="flex justify-between">
											<div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
											<div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
										</div>
									</div>
								</div>
							))}
					</div>
				) : (
					<div className="space-y-3">
						{Array(6)
							.fill(0)
							.map((_, index) => (
								<div
									key={index}
									className="bg-white border rounded-lg p-3 flex items-center gap-4"
								>
									<div className="h-16 w-16 bg-gray-200 rounded animate-pulse" />
									<div className="flex-1 space-y-2">
										<div className="h-4 bg-gray-200 rounded animate-pulse" />
										<div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
									</div>
									<div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
								</div>
							))}
					</div>
				)}
			</div>
		);
	}

	if (products.length === 0) {
		return (
			<div className="bg-gray-50 rounded-lg p-8 text-center border">
				<div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
					<svg
						className="h-8 w-8 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-medium text-gray-700 mb-2">
					Không có sản phẩm nào
				</h3>
				<p className="text-gray-500 mb-4">
					Bạn chưa có sản phẩm nào. Hãy thêm sản phẩm mới để bắt đầu bán hàng.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Toolbar */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
				<div className="flex items-center gap-2">
					<Checkbox
						id="select-all"
						checked={
							selectedProducts.length === products.length && products.length > 0
						}
						onCheckedChange={toggleSelectAll}
					/>
					<label htmlFor="select-all" className="text-sm text-gray-500">
						Chọn tất cả ({selectedProducts.length}/{products.length})
					</label>

					{selectedProducts.length > 0 && (
						<>
							<Button variant="outline" size="sm" className="text-red-600">
								<Trash2 className="mr-1 h-4 w-4" />
								Xóa đã chọn
							</Button>
							<Button variant="outline" size="sm">
								<Download className="mr-1 h-4 w-4" />
								Xuất
							</Button>
						</>
					)}
				</div>

				<div className="flex items-center gap-2">
					<Button variant="ghost" size="sm" className="h-8">
						<RefreshCw className="h-4 w-4 mr-1" />
						Làm mới
					</Button>

					<div className="flex border rounded-md">
						<Button
							variant="ghost"
							size="sm"
							className={`px-2 rounded-none ${
								viewMode === 'grid' ? 'bg-gray-100' : ''
							}`}
							onClick={() => setViewMode('grid')}
						>
							<Grid3X3 size={16} />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className={`px-2 rounded-none ${
								viewMode === 'list' ? 'bg-gray-100' : ''
							}`}
							onClick={() => setViewMode('list')}
						>
							<LayoutList size={16} />
						</Button>
					</div>
				</div>
			</div>

			{/* Product List */}
			{viewMode === 'grid' ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{products.map((product) => (
						<div key={product.id} className="relative">
							<div className="absolute left-2 top-2 z-10">
								<Checkbox
									checked={selectedProducts.includes(product.id)}
									onCheckedChange={() => toggleSelectProduct(product.id)}
									className="bg-white border-gray-300"
								/>
							</div>
							<ProductCard key={product.id} data={product} />
						</div>
					))}
				</div>
			) : (
				<div className="space-y-3">
					{products.map((product) => (
						<div key={product.id} className="flex items-center gap-2">
							<Checkbox
								checked={selectedProducts.includes(product.id)}
								onCheckedChange={() => toggleSelectProduct(product.id)}
							/>
							<div className="flex-1">
								<ProductRow data={product} />
							</div>
						</div>
					))}
				</div>
			)}

			{/* Pagination */}
			<div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="text-sm text-gray-500">
					Hiển thị {(page - 1) * limit + 1} đến{' '}
					{Math.min(page * limit, totalProducts)} trong tổng số {totalProducts}{' '}
					sản phẩm
				</div>

				<ProductsPagination
					totalPages={totalPages}
					currentPage={page}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
}

export default ProductsList;
