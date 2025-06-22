'use client';

import { Edit, Eye, Plus } from 'lucide-react';
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

import userRequest from '@/api/userRequest';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RoleEnum } from '@/constants/roleEnum';
import { UserSchema } from '@/schemaValidations/schema';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import AccountDetailModal from './account-detail-modal';
import AccountFormModal from './account-form-modal';
import AccountsPagination from './account-pagination';
import InputSearch from './input-search';

type Account = z.infer<typeof UserSchema>;

export default function AccountManagement({
	sessionToken,
}: {
	sessionToken: string;
}) {
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [loading, setLoading] = useState(true);

	const router = useRouter();
	const params = useSearchParams();
	const page = Number(params.get('page') || 1);
	const orderBy = params.get('orderBy') || 'createdAt';
	const order = params.get('order') || 'desc';
	const search = params.get('search') || '';
	const [roleFilter, setRoleFilter] = useState<RoleEnum | undefined>(undefined);
	const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(
		undefined
	);
	const [sortBy, setSortBy] = useState<string>('createdAt');
	const [sortOrder, setSortOrder] = useState<string>('desc');
	const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isDetailOpen, setIsDetailOpen] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const [totalPages, setTotalPages] = useState(1);

	const fetchAccounts = async () => {
		try {
			setLoading(true);

			const response = await userRequest.getAllUsers(
				sessionToken,
				isActiveFilter,
				roleFilter,
				page,
				search,
				orderBy,
				order
			);

			setAccounts(response.payload.data);
			setTotalCount(response.payload.meta.total);
			setTotalPages(response.payload.meta.totalPages);
		} catch (error) {
			toast.error('Lỗi khi tải danh sách tài khoản');
			console.error('Error fetching accounts:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAccounts();
	}, [page, search, roleFilter, isActiveFilter, orderBy, order]);

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(window.location.search);
		params.set('page', newPage.toString());
		router.push(`/admin/account?${params.toString()}`);
	};

	const handleSortChange = (field: string) => {
		if (sortBy === field) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortBy(field);
			setSortOrder('asc');
		}

		const params = new URLSearchParams(window.location.search);
		params.set('orderBy', field);
		params.set('order', sortOrder === 'asc' ? 'desc' : 'asc');
		params.set('page', '1');
		router.push(`/admin/account?${params.toString()}`);
	};

	const handleView = (account: Account) => {
		setSelectedAccount(account);
		setIsDetailOpen(true);
	};

	const handleEdit = (account: Account) => {
		setSelectedAccount(account);
		setIsFormOpen(true);
	};

	const handleCreate = () => {
		setSelectedAccount(null);
		setIsFormOpen(true);
	};

	const handleFormSuccess = () => {
		fetchAccounts();
		setIsFormOpen(false);
		setSelectedAccount(null);
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

	const getRoleBadge = (role: string) => {
		switch (role) {
			case RoleEnum.ADMIN:
				return (
					<Badge className="bg-purple-100 text-purple-800 border-purple-200">
						Quản trị viên
					</Badge>
				);
			case RoleEnum.SELLER:
				return (
					<Badge className="bg-blue-100 text-blue-800 border-blue-200">
						Cửa hàng
					</Badge>
				);
			case RoleEnum.BUYER:
				return (
					<Badge className="bg-green-100 text-green-800 border-green-200">
						Người mua
					</Badge>
				);
			default:
				return (
					<Badge className="bg-gray-100 text-gray-800 border-gray-200">
						{role}
					</Badge>
				);
		}
	};

	const getStatusBadge = (isActive: boolean) => {
		if (isActive) {
			return (
				<Badge className="bg-green-100 text-green-800 border-green-200">
					Hoạt động
				</Badge>
			);
		} else {
			return (
				<Badge className="bg-red-100 text-red-800 border-red-200">
					Vô hiệu
				</Badge>
			);
		}
	};

	return (
		<div className="container mx-auto p-6 space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Quản lý Tài khoản</h1>
					<p className="text-muted-foreground">
						Quản lý tài khoản người dùng trong hệ thống
					</p>
				</div>
				<Button onClick={handleCreate}>
					<Plus className="w-4 h-4 mr-2" />
					Thêm tài khoản
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
					<CardTitle>Danh sách Tài khoản ({totalCount} tài khoản)</CardTitle>
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
										<TableHead>ID</TableHead>
										<TableHead
											className="cursor-pointer hover:bg-muted/50"
											onClick={() => handleSortChange('firstName')}
										>
											Tài khoản
											{sortBy === 'firstName' && (
												<span className="ml-1">
													{sortOrder === 'asc' ? '↑' : '↓'}
												</span>
											)}
										</TableHead>
										<TableHead>Email</TableHead>
										<TableHead
											className="cursor-pointer hover:bg-muted/50"
											onClick={() => handleSortChange('role')}
										>
											Vai trò
											{sortBy === 'role' && (
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
										<TableHead>Thao tác</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{accounts.map((account) => (
										<TableRow key={account.id}>
											<TableCell>#{account.id}</TableCell>
											<TableCell>
												<div className="flex items-center">
													<Avatar className="h-8 w-8 mr-3">
														<AvatarImage
															src={account.image?.publicUrl || ''}
															alt={`${account.firstName} ${account.lastName}`}
														/>
														<AvatarFallback className="bg-primary/10 text-primary">
															{account.firstName?.charAt(0) || ''}
															{account.lastName?.charAt(0) || ''}
														</AvatarFallback>
													</Avatar>
													<div className="font-medium">
														{account.firstName} {account.lastName}
													</div>
												</div>
											</TableCell>
											<TableCell>{account.email}</TableCell>
											<TableCell>{getRoleBadge(account.role)}</TableCell>
											<TableCell>{getStatusBadge(account.isActive)}</TableCell>
											<TableCell>{formatDate(account.createdAt)}</TableCell>
											<TableCell>
												<div className="flex space-x-2">
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleView(account)}
													>
														<Eye className="w-4 h-4" />
													</Button>
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleEdit(account)}
													>
														<Edit className="w-4 h-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>

							{accounts.length === 0 && (
								<div className="text-center py-12">
									<p className="text-muted-foreground">
										Không tìm thấy tài khoản nào
									</p>
								</div>
							)}
						</>
					)}
				</CardContent>
			</Card>

			<div className="flex items-center justify-center space-x-2">
				<AccountsPagination
					totalPages={totalPages}
					currentPage={page}
					onPageChange={handlePageChange}
				/>
			</div>

			{/* Form Modal */}
			<Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{selectedAccount ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}
						</DialogTitle>
					</DialogHeader>
					<AccountFormModal
						account={selectedAccount}
						isOpen={isFormOpen}
						onClose={() => setIsFormOpen(false)}
						onSuccess={handleFormSuccess}
						sessionToken={sessionToken}
					/>
				</DialogContent>
			</Dialog>

			{/* Detail Modal */}
			{selectedAccount && (
				<AccountDetailModal
					account={selectedAccount}
					isOpen={isDetailOpen}
					onClose={() => {
						setIsDetailOpen(false);
						setSelectedAccount(null);
					}}
				/>
			)}
		</div>
	);
}
