'use client';

import { DollarSign, ShoppingBag, Store, Users } from 'lucide-react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../../components/ui/card';
import { Progress } from '../../../components/ui/progress';
import { cn } from '../../../lib/utils';
import { AdminDashboardSystemResType } from '../../../schemaValidations/response/statistic';

function AdminDashboardStats({
	data,
}: {
	data: AdminDashboardSystemResType['data'];
}) {
	// Format number with commas as thousand separators
	const formatNumber = (num: number) => {
		return num.toLocaleString('vi-VN');
	};

	// Format currency
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(amount);
	};

	// Status color mapping
	const statusColorMap: Record<string, { dot: string; progress: string }> = {
		PENDING: { dot: 'bg-yellow-500', progress: '[&>div]:bg-yellow-500' },
		CONFIRMED: { dot: 'bg-blue-500', progress: '[&>div]:bg-blue-500' },
		PROCESSING: { dot: 'bg-indigo-500', progress: '[&>div]:bg-indigo-500' },
		SHIPPED: { dot: 'bg-violet-500', progress: '[&>div]:bg-violet-500' },
		DELIVERED: { dot: 'bg-green-500', progress: '[&>div]:bg-green-500' },
		CANCELLED: { dot: 'bg-red-500', progress: '[&>div]:bg-red-500' },
	};

	return (
		<div className="space-y-6">
			{/* User Stats */}
			<section>
				<h2 className="text-2xl font-bold mb-4">Thống kê người dùng</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium">
								Tổng người dùng
							</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{formatNumber(data.users.totalUsers)}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium">Cửa hàng</CardTitle>
							<Store className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{formatNumber(data.users.totalShops)}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium">Người mua</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{formatNumber(data.users.totalBuyers)}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium">
								Quản trị viên
							</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{formatNumber(data.users.totalAdmins)}
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Shop Stats */}
			<section>
				<h2 className="text-2xl font-bold mb-4">Thống kê cửa hàng</h2>
				<Card>
					<CardHeader>
						<CardTitle>Trạng thái cửa hàng</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium">
										Tổng số: {formatNumber(data.shops.total)}
									</p>
								</div>
								<div className="text-sm text-muted-foreground">100%</div>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
										<p className="text-sm">Đang hoạt động</p>
									</div>
									<div className="text-sm font-medium">
										{formatNumber(data.shops.active)} (
										{((data.shops.active / data.shops.total) * 100).toFixed(1)}
										%)
									</div>
								</div>
								<Progress
									value={(data.shops.active / data.shops.total) * 100}
									className={cn('h-2 [&>div]:bg-green-500')}
								/>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
										<p className="text-sm">Không hoạt động</p>
									</div>
									<div className="text-sm font-medium">
										{formatNumber(data.shops.inactive)} (
										{((data.shops.inactive / data.shops.total) * 100).toFixed(
											1
										)}
										%)
									</div>
								</div>
								<Progress
									value={(data.shops.inactive / data.shops.total) * 100}
									className={cn('h-2 [&>div]:bg-red-500')}
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Product Stats */}
			<section>
				<h2 className="text-2xl font-bold mb-4">Thống kê sản phẩm</h2>
				<Card>
					<CardHeader>
						<CardTitle>Trạng thái sản phẩm</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium">
										Tổng số: {formatNumber(data.products.total)}
									</p>
								</div>
								<div className="text-sm text-muted-foreground">100%</div>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
										<p className="text-sm">Đang bán</p>
									</div>
									<div className="text-sm font-medium">
										{formatNumber(data.products.active)} (
										{(
											(data.products.active / data.products.total) *
											100
										).toFixed(1)}
										%)
									</div>
								</div>
								<Progress
									value={(data.products.active / data.products.total) * 100}
									className={cn('h-2 [&>div]:bg-green-500')}
								/>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
										<p className="text-sm">Ngừng bán</p>
									</div>
									<div className="text-sm font-medium">
										{formatNumber(data.products.inactive)} (
										{(
											(data.products.inactive / data.products.total) *
											100
										).toFixed(1)}
										%)
									</div>
								</div>
								<Progress
									value={(data.products.inactive / data.products.total) * 100}
									className={cn('h-2 [&>div]:bg-red-500')}
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Order Stats */}
			<section>
				<h2 className="text-2xl font-bold mb-4">Thống kê đơn hàng</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium">
								Tổng đơn hàng
							</CardTitle>
							<ShoppingBag className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{formatNumber(data.orders.total)}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium">
								Tổng doanh thu
							</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{formatCurrency(data.revenue.total)}
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Order Status Breakdown */}
			<section>
				<Card>
					<CardHeader>
						<CardTitle>Trạng thái đơn hàng</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{data.orders.byStatus.map((status, index) => {
								const statusColors = statusColorMap[status.statusType] || {
									dot: 'bg-blue-500',
									progress: '[&>div]:bg-blue-500',
								};

								return (
									<div key={index} className="space-y-2">
										<div className="flex items-center justify-between">
											<div className="flex items-center">
												<div
													className={cn(
														'w-2 h-2 rounded-full mr-2',
														statusColors.dot
													)}
												></div>
												<p className="text-sm">{status.statusName}</p>
											</div>
											<div className="text-sm font-medium">
												{formatNumber(status.count)} (
												{((status.count / data.orders.total) * 100).toFixed(1)}
												%)
											</div>
										</div>
										<Progress
											value={(status.count / data.orders.total) * 100}
											className={cn('h-2', statusColors.progress)}
										/>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}

export default AdminDashboardStats;
