'use client';

import { Edit, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import categoryRequest from '@/api/categoryRequest';
import CategoryForm from '@/components/CategoryForm';
import { CategoryWithProductCount } from '@/schemaValidations/response/category';
import { useRouter, useSearchParams } from 'next/navigation';
import CategoriesPagination from './category-pagination';
import InputSearch from './input-search';

export default function CategoryManagement() {
	const [categories, setCategories] = useState<CategoryWithProductCount[]>([]);
	const [loading, setLoading] = useState(true);

	const router = useRouter();
	const params = useSearchParams();
	const page = Number(params.get('page') || 1);
	const limit = Number(params.get('limit') || 12);
	const orderBy = params.get('orderBy') || 'createdAt';
	const order = params.get('order') || 'desc';
	const name = params.get('name') || '';
	const [isActiveFilter, setIsActiveFilter] = useState<string>('all');
	const [sortBy, setSortBy] = useState<string>('name');
	const [sortOrder, setSortOrder] = useState<string>('asc');
	const [selectedCategory, setSelectedCategory] =
		useState<CategoryWithProductCount | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const fetchCategories = async () => {
		try {
			setLoading(true);
			const params = {
				page,
				limit,
				search: name,
				isActive:
					isActiveFilter === 'all' ? undefined : isActiveFilter === 'true',
				sortBy: sortBy as 'name' | 'createdAt' | 'updatedAt' | 'isActive',
				sortOrder: sortOrder as 'asc' | 'desc',
			};

			const response = await categoryRequest.getAllCategories(
				{ name, isActive: isActiveFilter === 'true' },
				{ page, limit },
				{ sortBy, sortOrder }
			);
			setCategories(response.payload.data);
			setTotalCount(response.payload.meta.totalCount);
			setTotalPages(response.payload.meta.totalPages);
		} catch (error) {
			toast.error('Lỗi khi tải danh sách danh mục');
			console.error('Error fetching categories:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, [page, name, isActiveFilter, sortBy, sortOrder]);

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(window.location.search);
		params.set('page', newPage.toString());
		router.push(`/admin/category?${params.toString()}`);
	};

	const handleFilterChange = (value: string) => {
		setIsActiveFilter(value);
		handlePageChange(1);
	};

	const handleSortChange = (field: string) => {
		if (sortBy === field) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortBy(field);
			setSortOrder('asc');
		}
		handlePageChange(1);
	};

	const handleEdit = (category: CategoryWithProductCount) => {
		setSelectedCategory(category);
		setIsFormOpen(true);
	};

	const handleCreate = () => {
		setSelectedCategory(null);
		setIsFormOpen(true);
	};

	const handleDelete = async (id: number) => {
		try {
			const sessionToken = localStorage.getItem('sessionToken') || '';
			await categoryRequest.deleteCategory(sessionToken, id);
			toast.success('Xóa danh mục thành công');
			fetchCategories();
		} catch (error) {
			toast.error('Lỗi khi xóa danh mục');
			console.error('Error deleting category:', error);
		}
	};

	const handleFormSuccess = () => {
		fetchCategories();
		setIsFormOpen(false);
		setSelectedCategory(null);
	};

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString('vi-VN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<div className="container mx-auto p-6 space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Quản lý Danh mục</h1>
					<p className="text-muted-foreground">
						Quản lý danh mục sản phẩm trong hệ thống
					</p>
				</div>
				<Button onClick={handleCreate}>
					<Plus className="w-4 h-4 mr-2" />
					Thêm danh mục
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Bộ lọc và Tìm kiếm</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="relative flex-1">
							<InputSearch />
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Danh sách Danh mục ({totalCount} danh mục)</CardTitle>
				</CardHeader>
				<CardContent>
					{loading ? (
						<div className="flex justify-center items-center py-12">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
						</div>
					) : (
						<>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead
											className="cursor-pointer hover:bg-muted/50"
											onClick={() => handleSortChange('name')}
										>
											Tên danh mục
											{sortBy === 'name' && (
												<span className="ml-1">
													{sortOrder === 'asc' ? '↑' : '↓'}
												</span>
											)}
										</TableHead>
										<TableHead
											className="cursor-pointer hover:bg-muted/50"
											onClick={() => handleSortChange('isActive')}
										>
											Trạng thái
											{sortBy === 'isActive' && (
												<span className="ml-1">
													{sortOrder === 'asc' ? '↑' : '↓'}
												</span>
											)}
										</TableHead>
										<TableHead>Số sản phẩm</TableHead>
										<TableHead
											className="cursor-pointer hover:bg-muted/50"
											onClick={() => handleSortChange('createdAt')}
										>
											Ngày tạo
											{sortBy === 'createdAt' && (
												<span className="ml-1">
													{sortOrder === 'asc' ? '↑' : '↓'}
												</span>
											)}
										</TableHead>
										<TableHead
											className="cursor-pointer hover:bg-muted/50"
											onClick={() => handleSortChange('updatedAt')}
										>
											Ngày cập nhật
											{sortBy === 'updatedAt' && (
												<span className="ml-1">
													{sortOrder === 'asc' ? '↑' : '↓'}
												</span>
											)}
										</TableHead>
										<TableHead>Thao tác</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{categories.map((category) => (
										<TableRow key={category.id}>
											<TableCell className="font-medium">
												{category.name}
											</TableCell>
											<TableCell>
												<Badge
													variant={category.isActive ? 'default' : 'secondary'}
												>
													{category.isActive ? 'Hoạt động' : 'Không hoạt động'}
												</Badge>
											</TableCell>
											<TableCell>
												<Badge variant="outline">
													{category._count.products} sản phẩm
												</Badge>
											</TableCell>
											<TableCell>{formatDate(category.createdAt)}</TableCell>
											<TableCell>{formatDate(category.updatedAt)}</TableCell>
											<TableCell>
												<div className="flex space-x-2">
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleEdit(category)}
													>
														<Edit className="w-4 h-4" />
													</Button>
													<Button
														variant="outline"
														size="sm"
														className="text-destructive hover:text-destructive"
														onClick={() => {
															const confirmMessage = `Bạn có chắc chắn muốn xóa danh mục "${
																category.name
															}"?${
																category._count.products > 0
																	? `\n⚠️ Danh mục này có ${category._count.products} sản phẩm.`
																	: ''
															}\nHành động này không thể hoàn tác.`;

															if (confirm(confirmMessage)) {
																handleDelete(category.id);
															}
														}}
													>
														<Trash2 className="w-4 h-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>

							{categories.length === 0 && (
								<div className="text-center py-12">
									<p className="text-muted-foreground">
										Không tìm thấy danh mục nào
									</p>
								</div>
							)}
						</>
					)}
				</CardContent>
			</Card>

			<div className="flex items-center justify-center space-x-2">
				<CategoriesPagination
					totalPages={totalPages}
					currentPage={page}
					onPageChange={handlePageChange}
				/>
			</div>

			<Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{selectedCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
						</DialogTitle>
					</DialogHeader>
					<CategoryForm
						category={selectedCategory}
						onSuccess={handleFormSuccess}
						onCancel={() => setIsFormOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
