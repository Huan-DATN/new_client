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
import { Separator } from '@/components/ui/separator';
import { Calendar, Mail, MapPin, Phone, User } from 'lucide-react';
import { Account } from './schemas';

interface AccountDetailModalProps {
	account: Account | null;
	isOpen: boolean;
	onClose: () => void;
}

function AccountDetailModal({
	account,
	isOpen,
	onClose,
}: AccountDetailModalProps) {
	if (!account) return null;

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('vi-VN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		}).format(date);
	};

	const getRoleBadge = (role: string) => {
		switch (role) {
			case 'ADMIN':
				return (
					<Badge className="bg-purple-100 text-purple-800 border-purple-200">
						Quản trị viên
					</Badge>
				);
			case 'SELLER':
				return (
					<Badge className="bg-blue-100 text-blue-800 border-blue-200">
						Cửa hàng
					</Badge>
				);
			case 'BUYER':
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
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Chi tiết tài khoản</DialogTitle>
					<DialogDescription>
						Thông tin chi tiết của tài khoản #{account.id}
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col items-center py-4">
					<Avatar className="h-20 w-20 mb-2">
						<AvatarImage
							src={account.image?.publicUrl || ''}
							alt={`${account.firstName} ${account.lastName}`}
						/>
						<AvatarFallback className="bg-primary/10 text-primary text-xl">
							{account.firstName?.charAt(0) || ''}
							{account.lastName?.charAt(0) || ''}
						</AvatarFallback>
					</Avatar>
					<h3 className="text-lg font-medium mt-2">
						{account.firstName} {account.lastName}
					</h3>
					<div className="flex gap-2 mt-1">
						{getRoleBadge(account.role)}
						{getStatusBadge(account.isActive)}
					</div>
				</div>

				<Separator className="my-2" />

				<div className="space-y-4 py-2">
					<div className="flex items-center">
						<User className="h-4 w-4 mr-2 text-gray-500" />
						<span className="text-sm font-medium">ID:</span>
						<span className="text-sm ml-2">#{account.id}</span>
					</div>

					<div className="flex items-center">
						<Mail className="h-4 w-4 mr-2 text-gray-500" />
						<span className="text-sm font-medium">Email:</span>
						<span className="text-sm ml-2">{account.email}</span>
					</div>

					{account.phone && (
						<div className="flex items-center">
							<Phone className="h-4 w-4 mr-2 text-gray-500" />
							<span className="text-sm font-medium">Số điện thoại:</span>
							<span className="text-sm ml-2">{account.phone}</span>
						</div>
					)}

					{account.address && (
						<div className="flex items-start">
							<MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
							<span className="text-sm font-medium">Địa chỉ:</span>
							<span className="text-sm ml-2">{account.address}</span>
						</div>
					)}

					<div className="flex items-center">
						<Calendar className="h-4 w-4 mr-2 text-gray-500" />
						<span className="text-sm font-medium">Ngày tạo:</span>
						<span className="text-sm ml-2">
							{formatDate(account.createdAt)}
						</span>
					</div>

					<div className="flex items-center">
						<Calendar className="h-4 w-4 mr-2 text-gray-500" />
						<span className="text-sm font-medium">Cập nhật:</span>
						<span className="text-sm ml-2">
							{formatDate(account.updatedAt)}
						</span>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Đóng
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default AccountDetailModal;
