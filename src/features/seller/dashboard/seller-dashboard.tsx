'use client';
import { Card } from '@/components/ui/card';
import { Package, ShoppingBag, TrendingUp, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import MonthlyChart from './monthly-chart';
import RowCard from './row-card';
import YearlyChart from './yearly-chart';

function SellerDashboard({ sessionToken }: { sessionToken: string }) {
	const [isMounted, setIsMounted] = useState(false);
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleYearChange = (year: number) => {
		setCurrentYear(year);
	};

	const handleMonthSelect = (month: number | undefined) => {
		if (month) {
			setCurrentMonth(month - 1); // Convert from 1-12 to 0-11
		}
	};

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
			</div>

			<RowCard sessionToken={sessionToken} />

			{/* Yearly Chart */}
			<div className="mb-6">
				<YearlyChart
					sessionToken={sessionToken}
					year={currentYear}
					onValueChange={handleMonthSelect}
				/>
			</div>

			{/* Monthly Chart */}
			<div>
				<MonthlyChart
					sessionToken={sessionToken}
					month={currentMonth}
					year={currentYear}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
					<ShoppingBag className="w-8 h-8 text-blue-600 mb-2" />
					<h3 className="font-medium">Quản lý đơn hàng</h3>
					<p className="text-sm text-gray-500 text-center">
						Xử lý đơn hàng mới và đang vận chuyển
					</p>
				</Card>

				<Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
					<Package className="w-8 h-8 text-green-600 mb-2" />
					<h3 className="font-medium">Quản lý sản phẩm</h3>
					<p className="text-sm text-gray-500 text-center">
						Thêm, sửa và quản lý kho hàng
					</p>
				</Card>

				<Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
					<TrendingUp className="w-8 h-8 text-orange-600 mb-2" />
					<h3 className="font-medium">Báo cáo bán hàng</h3>
					<p className="text-sm text-gray-500 text-center">
						Phân tích doanh thu và hiệu quả
					</p>
				</Card>

				<Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
					<UserCheck className="w-8 h-8 text-purple-600 mb-2" />
					<h3 className="font-medium">Đánh giá và phản hồi</h3>
					<p className="text-sm text-gray-500 text-center">
						Quản lý đánh giá từ khách hàng
					</p>
				</Card>
			</div>
		</div>
	);
}

export default SellerDashboard;
