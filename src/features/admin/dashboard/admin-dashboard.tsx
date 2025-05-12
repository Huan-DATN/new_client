'use client';
import { useEffect, useState } from 'react';
import { AdminDashboardSystemResType } from '../../../schemaValidations/response/statistic';
import AdminDashboardStats from './admin-dashboard-stats';

function AdminDashboard({
	sessionToken,
	data,
}: {
	sessionToken: string;
	data: AdminDashboardSystemResType['data'];
}) {
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
		<div className="flex flex-col space-y-8 p-6 bg-gray-50">
			<div>
				<h1 className="text-3xl font-bold">Bảng điều khiển quản trị</h1>
				<p className="text-gray-500 mt-1">Xem thống kê tổng quan về hệ thống</p>
			</div>

			{/* Main Dashboard Stats */}
			<AdminDashboardStats data={data} />
		</div>
	);
}

export default AdminDashboard;
