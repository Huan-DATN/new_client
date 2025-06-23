'use client';

import { DollarSign, ShoppingBag, Store, Users } from 'lucide-react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../../components/ui/card';
import { DonutChart } from '../../../components/ui/donut-chart';
import { AdminDashboardSystemResType } from '../../../schemaValidations/response/statistic';
import UserYearlyLineChart from './user-yearly-line-chart';

function AdminDashboardStats({
	data,
	sessionToken,
}: {
	data: AdminDashboardSystemResType['data'];
	sessionToken: string;
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

			<section>
				<UserYearlyLineChart
					sessionToken={sessionToken}
					year={new Date().getFullYear()}
					onValueChange={() => {}}
				/>
			</section>

			{/* Shop Stats */}
			<section className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
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
								</div>
								<DonutChart
									className="mx-auto"
									data={[
										{
											name: 'Đang hoạt động',
											amount: data.shops.active,
										},
										{
											name: 'Không hoạt động',
											amount: data.shops.inactive,
										},
									]}
									category="name"
									value="amount"
									showLabel
								/>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Product Stats */}
				<div>
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
								<DonutChart
									className="mx-auto"
									data={[
										{
											name: 'Đang bán',
											amount: data.products.active,
										},
										{
											name: 'Đã ẩn',
											amount: data.products.inactive,
										},
									]}
									category="name"
									value="amount"
									showLabel
									showTooltip
								/>
							</div>
						</CardContent>
					</Card>
				</div>
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
		</div>
	);
}

export default AdminDashboardStats;
