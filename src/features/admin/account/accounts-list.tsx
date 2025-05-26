'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { handleErrorApi } from '@/lib/utils';
import { UserSchema } from '@/schemaValidations/schema';
import { Ban, Edit, EyeIcon, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import userRequest from '../../../api/userRequest';
import { RoleEnum } from '../../../constants/roleEnum';
import { getDateFormat } from '../../../lib/utils';
import AccountDetailModal from './account-detail-modal';
import AccountFormModal from './account-form-modal';
import { AccountFormValues } from './schemas';

type Account = z.infer<typeof UserSchema>;

function AccountsList({
	accounts,
	sessionToken,
	onAccountUpdated,
}: {
	accounts: Account[];
	sessionToken: string;
	onAccountUpdated?: () => void;
}) {
	const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { toast } = useToast();

	const handleViewAccount = (account: Account) => {
		setSelectedAccount(account);
		setIsDetailModalOpen(true);
	};

	const handleEditAccount = (account: Account) => {
		setSelectedAccount(account);
		setIsEditModalOpen(true);
	};

	const handleDeactivateAccount = async (id: number) => {
		try {
			// In a real implementation, this would call an API to deactivate the account
			// await userRequest.deactivateUser(sessionToken, id);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 500));

			toast({
				title: 'Thành công',
				description: `Vô hiệu hóa tài khoản #${id} thành công`,
			});

			// Refresh the account list
			if (onAccountUpdated) {
				onAccountUpdated();
			}
		} catch (error) {
			handleErrorApi({ error });
		}
	};

	const handleDeleteAccount = async () => {
		if (!selectedAccount) return;

		try {
			// In a real implementation, this would call an API to delete the account
			// await userRequest.deleteUser(sessionToken, selectedAccount.id);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 500));

			toast({
				title: 'Thành công',
				description: `Xóa tài khoản #${selectedAccount.id} thành công`,
			});

			setIsDeleteModalOpen(false);

			// Refresh the account list
			if (onAccountUpdated) {
				onAccountUpdated();
			}
		} catch (error) {
			handleErrorApi({ error });
		}
	};

	const openDeleteDialog = (account: Account) => {
		setSelectedAccount(account);
		setIsDeleteModalOpen(true);
	};

	const handleFormSubmit = async (data: AccountFormValues) => {
		if (!selectedAccount) return;

		setIsSubmitting(true);

		try {
			// In a real implementation, this would call an API to update the account
			await userRequest.updateUser(sessionToken, selectedAccount.id, data);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast({
				title: 'Thành công',
				description: `Đã cập nhật tài khoản #${selectedAccount.id}`,
			});

			setIsEditModalOpen(false);

			// Refresh the account list
			if (onAccountUpdated) {
				onAccountUpdated();
			}
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Lỗi',
				description: 'Đã xảy ra lỗi khi cập nhật tài khoản',
			});
		} finally {
			setIsSubmitting(false);
		}
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

	if (accounts.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-500">Không có tài khoản nào được tìm thấy.</p>
			</div>
		);
	}

	return (
		<>
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="bg-gray-50">
							<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
								ID
							</th>
							<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
								Tài khoản
							</th>
							<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
								Email
							</th>
							<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
								Vai trò
							</th>
							<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
								Trạng thái
							</th>
							<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
								Ngày tạo
							</th>
							<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
								Thao tác
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{accounts.map((account) => (
							<tr key={account.id} className="hover:bg-gray-50">
								<td className="px-4 py-3 text-sm text-gray-900">
									#{account.id}
								</td>
								<td className="px-4 py-3">
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
										<div>
											<div className="font-medium text-gray-900">
												{account.firstName} {account.lastName}
											</div>
										</div>
									</div>
								</td>
								<td className="px-4 py-3 text-sm text-gray-900">
									{account.email}
								</td>
								<td className="px-4 py-3 text-sm">
									{getRoleBadge(account.role)}
								</td>
								<td className="px-4 py-3 text-sm">
									{getStatusBadge(account.isActive)}
								</td>
								<td className="px-4 py-3 text-sm text-gray-500">
									{getDateFormat(account.createdAt)}
								</td>
								<td className="px-4 py-3 text-sm">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon" className="h-8 w-8">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem
												onClick={() => handleViewAccount(account)}
											>
												<EyeIcon className="mr-2 h-4 w-4" />
												Xem chi tiết
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => handleEditAccount(account)}
											>
												<Edit className="mr-2 h-4 w-4" />
												Chỉnh sửa
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => handleDeactivateAccount(account.id)}
												className="text-amber-600"
												disabled={!account.isActive}
											>
												<Ban className="mr-2 h-4 w-4" />
												{account.isActive ? 'Vô hiệu hóa' : 'Đã vô hiệu'}
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => openDeleteDialog(account)}
												className="text-red-600"
											>
												<Trash2 className="mr-2 h-4 w-4" />
												Xóa tài khoản
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Detail Modal */}
			<Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Chi tiết tài khoản</DialogTitle>
					</DialogHeader>
					<AccountDetailModal
						account={selectedAccount}
						isOpen={isDetailModalOpen}
						onClose={() => setIsDetailModalOpen(false)}
					/>
				</DialogContent>
			</Dialog>

			{/* Edit Modal */}
			<Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
						<DialogDescription>Cập nhật thông tin tài khoản</DialogDescription>
					</DialogHeader>
					<AccountFormModal
						account={selectedAccount}
						isOpen={isEditModalOpen}
						onClose={() => setIsEditModalOpen(false)}
						onSubmit={handleFormSubmit}
						isSubmitting={isSubmitting}
					/>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Xóa tài khoản</DialogTitle>
						<DialogDescription>
							Hành động này không thể hoàn tác.
						</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<p>
							Bạn có chắc chắn muốn xóa tài khoản{' '}
							<strong>
								{selectedAccount?.firstName} {selectedAccount?.lastName}
							</strong>
							?
						</p>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsDeleteModalOpen(false)}
						>
							Hủy
						</Button>
						<Button variant="destructive" onClick={handleDeleteAccount}>
							Xóa
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default AccountsList;
