'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Filter, RefreshCw, UserPlus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import AccountFormModal from './account-form-modal';
import AccountsList from './accounts-list';
import InputSearch from './input-search';
import { Account, AccountFormValues, AccountsData } from './schemas';

function AdminAccount({
	sessionToken,
	data,
}: {
	sessionToken: string;
	data: AccountsData;
}) {
	const [isMounted, setIsMounted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { toast } = useToast();

	useEffect(() => {
		setIsMounted(true);

		// Mock data for demonstration
		const mockAccounts = [
			{
				id: 1,
				firstName: 'Admin',
				lastName: 'User',
				email: 'admin@example.com',
				phone: '+84123456789',
				address: 'Hà Nội, Việt Nam',
				role: 'ADMIN',
				isActive: true,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				image: null,
			},
			{
				id: 2,
				firstName: 'John',
				lastName: 'Seller',
				email: 'seller@example.com',
				phone: '+84987654321',
				address: 'Hồ Chí Minh, Việt Nam',
				role: 'SELLER',
				isActive: true,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				image: null,
			},
			{
				id: 3,
				firstName: 'Alice',
				lastName: 'Buyer',
				email: 'buyer@example.com',
				phone: '+84555555555',
				address: 'Đà Nẵng, Việt Nam',
				role: 'BUYER',
				isActive: true,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				image: null,
			},
			{
				id: 4,
				firstName: 'Inactive',
				lastName: 'User',
				email: 'inactive@example.com',
				phone: null,
				address: null,
				role: 'BUYER',
				isActive: false,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				image: null,
			},
		];

		setAccounts(mockAccounts);
	}, []);

	// If not mounted yet (during SSR), show a simplified version to avoid hydration errors
	if (!isMounted) {
		return (
			<div className="flex flex-col w-full h-full bg-gray-100 p-6">
				<h1 className="text-2xl font-bold mb-4">
					Đang tải trang quản lý tài khoản...
				</h1>
			</div>
		);
	}

	const refreshAccounts = () => {
		setIsLoading(true);
		// In a real implementation, this would call an API
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};

	const handleCreateAccount = (data: AccountFormValues) => {
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			toast({
				description: 'Đã tạo tài khoản mới thành công',
			});
			setIsSubmitting(false);
			setIsCreateModalOpen(false);

			// In a real implementation, the new account would be returned from the API
			// and added to the accounts list
			const newAccount: Account = {
				id: accounts.length + 1,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phone: data.phone || null,
				address: data.address || null,
				role: data.role,
				isActive: data.isActive,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				image: null,
			};

			setAccounts([newAccount, ...accounts]);
		}, 1000);
	};

	return (
		<div className="max-w-7xl mx-auto p-4 md:p-6">
			{/* Header with title and description */}
			<div className="mb-8">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 flex items-center">
							<Users className="mr-2 h-6 w-6 text-primary" />
							Quản lý tài khoản
						</h1>
						<p className="text-gray-500 mt-1">
							Quản lý danh sách tài khoản người dùng, cửa hàng và quản trị viên
						</p>
					</div>

					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={refreshAccounts}
							disabled={isLoading}
						>
							<RefreshCw
								className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
							/>
							Làm mới
						</Button>
						<Button variant="outline" size="sm">
							<Filter className="mr-2 h-4 w-4" />
							Bộ lọc
						</Button>
						<Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
							<UserPlus className="mr-2 h-4 w-4" />
							Thêm tài khoản
						</Button>
					</div>
				</div>
			</div>

			{/* Account Tabs */}
			<Tabs defaultValue="all" className="w-full">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
					<TabsList className="bg-muted h-10">
						<TabsTrigger value="all" className="rounded-md">
							Tất cả tài khoản
						</TabsTrigger>
						<TabsTrigger value="admin" className="rounded-md">
							Quản trị viên
						</TabsTrigger>
						<TabsTrigger value="seller" className="rounded-md">
							Cửa hàng
						</TabsTrigger>
						<TabsTrigger value="buyer" className="rounded-md">
							Người mua
						</TabsTrigger>
						<TabsTrigger value="inactive" className="rounded-md">
							Đã vô hiệu
						</TabsTrigger>
					</TabsList>

					<div className="relative w-full sm:w-auto">
						<InputSearch />
					</div>
				</div>

				<TabsContent value="all">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
						<div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
							<h2 className="font-medium text-gray-700">Tất cả tài khoản</h2>
							<div className="text-sm text-gray-500">
								Tổng số: {accounts.length} tài khoản
							</div>
						</div>
						<div className="p-4">
							<AccountsList accounts={accounts} sessionToken={sessionToken} />
						</div>
					</div>
				</TabsContent>

				<TabsContent value="admin">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
						<div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
							<h2 className="font-medium text-gray-700">Quản trị viên</h2>
							<div className="text-sm text-gray-500">
								Tổng số:{' '}
								{accounts.filter((account) => account.role === 'ADMIN').length}{' '}
								tài khoản
							</div>
						</div>
						<div className="p-4">
							<AccountsList
								accounts={accounts.filter(
									(account) => account.role === 'ADMIN'
								)}
								sessionToken={sessionToken}
							/>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="seller">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
						<div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
							<h2 className="font-medium text-gray-700">Cửa hàng</h2>
							<div className="text-sm text-gray-500">
								Tổng số:{' '}
								{accounts.filter((account) => account.role === 'SELLER').length}{' '}
								tài khoản
							</div>
						</div>
						<div className="p-4">
							<AccountsList
								accounts={accounts.filter(
									(account) => account.role === 'SELLER'
								)}
								sessionToken={sessionToken}
							/>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="buyer">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
						<div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
							<h2 className="font-medium text-gray-700">Người mua</h2>
							<div className="text-sm text-gray-500">
								Tổng số:{' '}
								{accounts.filter((account) => account.role === 'BUYER').length}{' '}
								tài khoản
							</div>
						</div>
						<div className="p-4">
							<AccountsList
								accounts={accounts.filter(
									(account) => account.role === 'BUYER'
								)}
								sessionToken={sessionToken}
							/>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="inactive">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
						<div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
							<h2 className="font-medium text-gray-700">
								Tài khoản đã vô hiệu
							</h2>
							<div className="text-sm text-gray-500">
								Tổng số:{' '}
								{accounts.filter((account) => !account.isActive).length} tài
								khoản
							</div>
						</div>
						<div className="p-4">
							<AccountsList
								accounts={accounts.filter((account) => !account.isActive)}
								sessionToken={sessionToken}
							/>
						</div>
					</div>
				</TabsContent>
			</Tabs>

			{/* Create Account Modal */}
			<AccountFormModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onSubmit={handleCreateAccount}
				isSubmitting={isSubmitting}
			/>
		</div>
	);
}

export default AdminAccount;
