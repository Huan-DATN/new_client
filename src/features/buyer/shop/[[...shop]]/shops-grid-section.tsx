'use client';

import userRequest from '@/api/userRequest';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ShopsListResType } from '@/schemaValidations/response/user';
import { Building, Grid3X3, LayoutList } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShopsGrid from './shops-grid';

function ShopsGridSection() {
	const router = useRouter();
	const params = useSearchParams();
	const checkedPage = params.get('page') || '1';
	const searchQuery = params.get('search') || '';
	const selectedCategory = params.get('category') || '';
	const selectedRating = params.get('rating') || '';

	const [shops, setShops] = useState<ShopsListResType['data']>([]);
	const [totalPages, setTotalPages] = useState(0);
	const [totalItems, setTotalItems] = useState(0);
	const [loading, setLoading] = useState(true);
	const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const isActive = true;
				const response = await userRequest.getActiveShops(
					{ page: Number(checkedPage) },
					isActive
				);
				setShops(response.payload.data);
				setTotalPages(response.payload.meta.totalPages);
				setTotalItems(response.payload.meta.total);
			} catch (error) {
				console.error('Error fetching shops:', error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [checkedPage, searchQuery, selectedCategory, selectedRating]);

	// Handle pagination
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(window.location.search);
		params.set('page', page.toString());
		router.push(`?${params.toString()}`);
	};

	// Active filters display
	const activeFilters = [];
	if (searchQuery)
		activeFilters.push({ key: 'search', label: `Tìm kiếm: ${searchQuery}` });
	if (selectedCategory)
		activeFilters.push({
			key: 'category',
			label: `Danh mục: ${selectedCategory}`,
		});
	if (selectedRating)
		activeFilters.push({
			key: 'rating',
			label: `Đánh giá: ${selectedRating}★+`,
		});

	return (
		<div className="space-y-6">
			{/* Header with count and controls */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-lg border p-4">
				<div>
					<h2 className="text-lg font-semibold mb-1">Tất cả cửa hàng</h2>
					<p className="text-sm text-gray-500">
						Hiển thị <span className="font-medium">{shops.length}</span> trong
						tổng số <span className="font-medium">{totalItems}</span> cửa hàng
					</p>
				</div>

				<div className="flex items-center gap-2">
					<div className="flex border rounded-md">
						<Button
							variant="ghost"
							size="sm"
							className={`px-3 rounded-none ${
								viewMode === 'grid' ? 'bg-gray-100' : ''
							}`}
							onClick={() => setViewMode('grid')}
						>
							<Grid3X3 size={18} />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className={`px-3 rounded-none ${
								viewMode === 'compact' ? 'bg-gray-100' : ''
							}`}
							onClick={() => setViewMode('compact')}
						>
							<LayoutList size={18} />
						</Button>
					</div>

					<select
						className="border rounded-md px-3 py-1 text-sm bg-white"
						onChange={(e) => {
							const params = new URLSearchParams(window.location.search);
							params.set('sort', e.target.value);
							router.push(`?${params.toString()}`);
						}}
						defaultValue="default"
					>
						<option value="default">Sắp xếp mặc định</option>
						<option value="rating_desc">Đánh giá cao nhất</option>
						<option value="products_desc">Nhiều sản phẩm nhất</option>
						<option value="latest">Mới nhất</option>
					</select>
				</div>
			</div>

			{/* Active filters */}
			{activeFilters.length > 0 && (
				<div className="flex flex-wrap gap-2 mb-4">
					{activeFilters.map((filter) => (
						<Badge
							key={filter.key}
							variant="secondary"
							className="px-3 py-1 gap-2"
						>
							{filter.label}
							<button
								className="text-gray-500 hover:text-gray-700"
								onClick={() => {
									const params = new URLSearchParams(window.location.search);
									params.delete(filter.key);
									router.push(`?${params.toString()}`);
								}}
							>
								×
							</button>
						</Badge>
					))}
					<Button
						variant="ghost"
						size="sm"
						className="text-xs"
						onClick={() => router.push('/buyer/shop')}
					>
						Xóa tất cả
					</Button>
				</div>
			)}

			{/* Loading state */}
			{loading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{Array(6)
						.fill(0)
						.map((_, index) => (
							<div key={index} className="border rounded-lg p-4">
								<div className="flex gap-3">
									<Skeleton className="h-16 w-16 rounded-full" />
									<div className="space-y-2 flex-1">
										<Skeleton className="h-4 w-3/4" />
										<Skeleton className="h-3 w-1/2" />
										<Skeleton className="h-3 w-2/3" />
									</div>
								</div>
							</div>
						))}
				</div>
			) : shops.length > 0 ? (
				<>
					<ShopsGrid data={shops} col={viewMode === 'grid' ? 3 : 2} />

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex justify-center mt-8">
							<div className="flex border rounded-md">
								<Button
									variant="ghost"
									size="sm"
									disabled={Number(checkedPage) <= 1}
									onClick={() => handlePageChange(Number(checkedPage) - 1)}
								>
									Trước
								</Button>

								{Array.from({ length: totalPages }, (_, i) => i + 1).map(
									(page) => (
										<Button
											key={page}
											variant={
												page.toString() === checkedPage ? 'default' : 'ghost'
											}
											size="sm"
											className="min-w-[40px]"
											onClick={() => handlePageChange(page)}
										>
											{page}
										</Button>
									)
								)}

								<Button
									variant="ghost"
									size="sm"
									disabled={Number(checkedPage) >= totalPages}
									onClick={() => handlePageChange(Number(checkedPage) + 1)}
								>
									Tiếp
								</Button>
							</div>
						</div>
					)}
				</>
			) : (
				<div className="bg-gray-50 rounded-lg p-8 text-center border">
					<Building size={48} className="mx-auto text-gray-400 mb-4" />
					<h3 className="text-lg font-medium text-gray-700 mb-2">
						Không tìm thấy cửa hàng
					</h3>
					<p className="text-gray-500">
						Không có cửa hàng nào phù hợp với bộ lọc đã chọn.
					</p>
				</div>
			)}
		</div>
	);
}

export default ShopsGridSection;
