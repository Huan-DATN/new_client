import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ShoppingBag } from "lucide-react";
import { cookies } from 'next/headers';
import orderRequest from '../../../../api/orderRequest';
import OrderCard from './order-card';

async function OrdersPage() {
	const sessionToken = (await cookies().get('sessionToken'))?.value;
	if (!sessionToken) {
		return (
			<div className="container mx-auto p-8 text-center">
				<div className="bg-gray-50 rounded-lg p-8 shadow-sm border">
					<ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
					<h2 className="text-xl font-medium text-gray-700 mb-2">Vui lòng đăng nhập để xem đơn hàng</h2>
					<p className="text-gray-500">Đăng nhập để xem và quản lý tất cả đơn hàng của bạn</p>
				</div>
			</div>
		);
	}

	const response = await orderRequest.getAllOrders(sessionToken);
	const orders = response.payload.data;

	// Group orders by status
	const pendingOrders = orders.filter(order =>
		order.OrderStatus[0].status.type === 'PENDING' ||
		order.OrderStatus[0].status.type === 'PROCESSING'
	);
	const shippingOrders = orders.filter(order =>
		order.OrderStatus[0].status.type === 'SHIPPED'
	);
	const completedOrders = orders.filter(order =>
		order.OrderStatus[0].status.type === 'DELIVERED'
	);
	const cancelledOrders = orders.filter(order =>
		order.OrderStatus[0].status.type === 'CANCELLED'
	);

	return (
		<div className="container mx-auto p-4 md:p-6 max-w-5xl">
			<div className="flex items-center gap-3 mb-6">
				<Package className="text-primary" size={28} />
				<h1 className="text-2xl font-bold">Đơn hàng của bạn</h1>
			</div>

			<Tabs defaultValue="all" className="w-full">
				<TabsList className="grid grid-cols-5 mb-6">
					<TabsTrigger value="all">Tất cả ({orders.length})</TabsTrigger>
					<TabsTrigger value="pending">Chờ xử lý ({pendingOrders.length})</TabsTrigger>
					<TabsTrigger value="shipping">Đang giao ({shippingOrders.length})</TabsTrigger>
					<TabsTrigger value="completed">Hoàn thành ({completedOrders.length})</TabsTrigger>
					<TabsTrigger value="cancelled">Đã hủy ({cancelledOrders.length})</TabsTrigger>
				</TabsList>

				<TabsContent value="all" className="space-y-4">
					{orders.length > 0 ? (
						orders.map((order) => (
							<OrderCard key={order.id} data={order} />
						))
					) : (
						<EmptyOrderState message="Bạn chưa có đơn hàng nào" />
					)}
				</TabsContent>

				<TabsContent value="pending" className="space-y-4">
					{pendingOrders.length > 0 ? (
						pendingOrders.map((order) => (
							<OrderCard key={order.id} data={order} />
						))
					) : (
						<EmptyOrderState message="Không có đơn hàng nào đang chờ xử lý" />
					)}
				</TabsContent>

				<TabsContent value="shipping" className="space-y-4">
					{shippingOrders.length > 0 ? (
						shippingOrders.map((order) => (
							<OrderCard key={order.id} data={order} />
						))
					) : (
						<EmptyOrderState message="Không có đơn hàng nào đang giao" />
					)}
				</TabsContent>

				<TabsContent value="completed" className="space-y-4">
					{completedOrders.length > 0 ? (
						completedOrders.map((order) => (
							<OrderCard key={order.id} data={order} />
						))
					) : (
						<EmptyOrderState message="Không có đơn hàng nào đã hoàn thành" />
					)}
				</TabsContent>

				<TabsContent value="cancelled" className="space-y-4">
					{cancelledOrders.length > 0 ? (
						cancelledOrders.map((order) => (
							<OrderCard key={order.id} data={order} />
						))
					) : (
						<EmptyOrderState message="Không có đơn hàng nào đã hủy" />
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
}

function EmptyOrderState({ message }: { message: string }) {
	return (
		<div className="bg-gray-50 rounded-lg p-8 text-center border">
			<ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
			<h3 className="text-lg font-medium text-gray-700 mb-2">{message}</h3>
			<p className="text-gray-500">Các đơn hàng của bạn sẽ xuất hiện ở đây</p>
		</div>
	);
}

export default OrdersPage;
