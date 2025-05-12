'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingBag, TrendingUp, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import RowCard from './row-card';


import ChartDashboardCard from './chart-dashboard-card';

const products = [
	{ name: 'Áo phông basic', stock: 24, sold: 12 },
	{ name: 'Quần jeans dài', stock: 18, sold: 8 },
	{ name: 'Áo khoác bomber', stock: 12, sold: 5 },
	{ name: 'Váy liền thân', stock: 8, sold: 6 },
	{ name: 'Giày thể thao', stock: 14, sold: 9 },
];

function SellerDashboard({ sessionToken }: { sessionToken: string }) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// If not mounted yet (during SSR), show a simplified version to avoid hydration errors
	if (!isMounted) {
		return (
			<div className="flex flex-col w-full h-full bg-gray-100 p-6">
				<h1 className="text-2xl font-bold mb-4">Đang tải trang quản lý...</h1>
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full h-full bg-gray-100 p-6 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Tổng quan cửa hàng</h1>
				<div className="flex gap-2">
					<Button variant="outline">Tuần này</Button>
					<Button variant="outline">Tháng này</Button>
					<Button variant="outline">Năm nay</Button>
				</div>
			</div>

			<RowCard sessionToken={sessionToken} />

			<div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
				<div className="col-span-1 lg:col-span-4">
					{
						isMounted && (
							<ChartDashboardCard sessionToken={sessionToken} />
						)
					}
				</div>

				<div className="col-span-1 lg:col-span-3">
					<Card className="h-full">
						<CardHeader>
							<CardTitle>Hàng tồn kho cần chú ý</CardTitle>
							<CardDescription>Sản phẩm bán chạy hoặc sắp hết hàng</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{products.map((product, idx) => (
									<div key={idx} className="flex justify-between items-center border-b pb-3">
										<div>
											<p className="font-medium">{product.name}</p>
											<p className="text-sm text-gray-500">
												Còn lại: {product.stock} | Đã bán: {product.sold}
											</p>
										</div>
										<div className="w-20 bg-gray-200 rounded-full h-2.5">
											<div
												className="bg-blue-600 h-2.5 rounded-full"
												style={{ width: `${(product.sold / (product.sold + product.stock)) * 100}%` }}
											></div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
					<ShoppingBag className="w-8 h-8 text-blue-600 mb-2" />
					<h3 className="font-medium">Quản lý đơn hàng</h3>
					<p className="text-sm text-gray-500 text-center">Xử lý đơn hàng mới và đang vận chuyển</p>
				</Card>

				<Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
					<Package className="w-8 h-8 text-green-600 mb-2" />
					<h3 className="font-medium">Quản lý sản phẩm</h3>
					<p className="text-sm text-gray-500 text-center">Thêm, sửa và quản lý kho hàng</p>
				</Card>

				<Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
					<TrendingUp className="w-8 h-8 text-orange-600 mb-2" />
					<h3 className="font-medium">Báo cáo bán hàng</h3>
					<p className="text-sm text-gray-500 text-center">Phân tích doanh thu và hiệu quả</p>
				</Card>

				<Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
					<UserCheck className="w-8 h-8 text-purple-600 mb-2" />
					<h3 className="font-medium">Đánh giá và phản hồi</h3>
					<p className="text-sm text-gray-500 text-center">Quản lý đánh giá từ khách hàng</p>
				</Card>
			</div>
		</div>
	);
}

export default SellerDashboard;
