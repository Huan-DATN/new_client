'use client';

import orderRequest from '@/api/orderRequest';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Loader2, PackageX, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { OrderListResType } from '../../../schemaValidations/response/order';
import OrdersPagination from './order-pagination';
import OrderRow from './order-row';

function OrdersList({ sessionToken }: { sessionToken: string }) {
	const router = useRouter();
	const params = useSearchParams();
	const page = params.get('page') || 1;
	const limit = params.get('limit') || 10;
	const search = params.get('search') || '';
	const status = params.get('status') || '';

	const [orders, setOrders] = useState<OrderListResType['data']>([]);
	const [totalPages, setTotalPages] =
		useState<OrderListResType['meta']['totalPages']>(0);
	const [isLoading, setIsLoading] = useState(true);
	const [searchInput, setSearchInput] = useState(search);

	useEffect(() => {
		const fetchOrders = async () => {
			setIsLoading(true);
			try {
				const response = await orderRequest.getAllOrders(sessionToken, {
					page: Number(page),
					limit: Number(limit),
					...(search && { search }),
					...(status && { status }),
				});
				setOrders(response.payload.data);
				setTotalPages(response.payload.meta.totalPages);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchOrders();
	}, [page, limit, search, status, sessionToken]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams();
		if (searchInput) params.set('search', searchInput);
		if (status) params.set('status', status);
		params.set('page', '1');
		params.set('limit', String(limit));
		router.push(`?${params.toString()}`);
	};

	const handleStatusChange = (value: string) => {
		const params = new URLSearchParams();
		if (search) params.set('search', search);
		if (value && value !== 'ALL') params.set('status', value);
		params.set('page', '1');
		params.set('limit', String(limit));
		router.push(`?${params.toString()}`);
	};

	return (
		<Card>
			<CardHeader className="p-4 pb-0">
				<CardTitle>Danh sách đơn hàng</CardTitle>
			</CardHeader>
			<CardContent className="p-4 space-y-4">
				{/* Filter area */}
				<div className="flex flex-col md:flex-row gap-4">
					<form onSubmit={handleSearch} className="flex-1 flex gap-2">
						<div className="relative flex-1">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Tìm kiếm theo mã đơn hàng..."
								className="pl-8"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
							/>
						</div>
						<Button type="submit">Tìm</Button>
					</form>
					<div className="w-full md:w-48">
						<Select value={status || 'ALL'} onValueChange={handleStatusChange}>
							<SelectTrigger>
								<SelectValue placeholder="Trạng thái" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="ALL">Tất cả</SelectItem>
								<SelectItem value="PENDING">Chờ xử lý</SelectItem>
								<SelectItem value="CONFIRMED">Đã xác nhận</SelectItem>
								<SelectItem value="PREPARING">Đang chuẩn bị</SelectItem>
								<SelectItem value="SHIPPING">Đang giao</SelectItem>
								<SelectItem value="COMPLETED">Hoàn thành</SelectItem>
								<SelectItem value="CANCELLED">Đã hủy</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Orders list */}
				{isLoading ? (
					<div className="flex justify-center items-center py-8">
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
					</div>
				) : orders.length > 0 ? (
					<div className="border rounded-md overflow-hidden">
						{/* Header */}
						<div className="grid grid-cols-6 bg-muted p-3 text-sm font-medium">
							<div>Mã đơn hàng</div>
							<div>Ngày đặt hàng</div>
							<div>Tổng tiền</div>
							<div>Trạng thái</div>
							<div>Phương thức thanh toán</div>
							<div className="text-center">Thao tác</div>
						</div>

						{/* Order rows */}
						<div className="divide-y">
							{orders.map((order) => (
								<OrderRow key={order.id} data={order} />
							))}
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
						<PackageX className="h-12 w-12 text-muted-foreground" />
						<h3 className="text-lg font-medium">Không có đơn hàng nào</h3>
						<p className="text-muted-foreground max-w-md">
							{search || status
								? 'Không tìm thấy đơn hàng nào phù hợp với bộ lọc của bạn'
								: 'Bạn chưa có đơn hàng nào. Đơn hàng sẽ hiển thị ở đây khi có khách đặt hàng'}
						</p>
					</div>
				)}

				{/* Pagination */}
				{!isLoading && orders.length > 0 && (
					<div className="mt-4">
						<OrdersPagination totalPages={totalPages} />
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export default OrdersList;
