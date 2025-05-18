'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { UserSchema } from '@/schemaValidations/schema';
import { Ban, Edit, EyeIcon, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { RoleEnum } from '../../../constants/roleEnum';
import { getDateFormat } from '../../../lib/utils';
import AccountDetailModal from './account-detail-modal';
import AccountFormModal from './account-form-modal';
import { AccountFormValues } from './schemas';

type Account = z.infer<typeof UserSchema>;

function AccountsList({
	accounts,
	sessionToken,
}: {
	accounts: Account[];
	sessionToken: string;
}) {
	const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [isFormModalOpen, setIsFormModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { toast } = useToast();

	const handleViewAccount = (account: Account) => {
		setSelectedAccount(account);
		setIsDetailModalOpen(true);
	};

	const handleEditAccount = (account: Account) => {
		setSelectedAccount(account);
		setIsFormModalOpen(true);
	};

	const handleDeactivateAccount = (id: number) => {
		toast({
			description: `Vô hiệu hóa tài khoản #${id}`,
		});
		// In a real implementation, this would call an API to deactivate the account
	};

	const handleDeleteAccount = (id: number) => {
		toast({
			description: `Xóa tài khoản #${id}`,
		});
		// In a real implementation, this would show a confirmation dialog then delete
	};

	const handleFormSubmit = (data: AccountFormValues) => {
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			toast({
				description: selectedAccount?.id
					? `Đã cập nhật tài khoản #${selectedAccount.id}`
					: 'Đã tạo tài khoản mới',
			});
			setIsSubmitting(false);
			setIsFormModalOpen(false);
		}, 1000);
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
												onClick={() => handleDeleteAccount(account.id)}
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
			<AccountDetailModal
				account={selectedAccount}
				isOpen={isDetailModalOpen}
				onClose={() => setIsDetailModalOpen(false)}
			/>

			{/* Edit/Create Modal */}
			<AccountFormModal
				account={selectedAccount}
				isOpen={isFormModalOpen}
				onClose={() => setIsFormModalOpen(false)}
				onSubmit={handleFormSubmit}
				isSubmitting={isSubmitting}
			/>
		</>
	);
}

export default AccountsList;
