import orderRequest from '@/api/orderRequest';
import StatusComponent from '@/components/status-component';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import OrderTimeLine from '@/features/components/order-timeline';
import {
	checkCompletedOrder,
	getDateFormat,
	getPriceFormat,
} from '@/lib/utils';
import { CalendarIcon, MapPinIcon, PackageIcon, PhoneIcon, Truck, User2Icon } from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DialogDemo } from './ratings-dialog';

async function OrderDetail({ id }: { id: number }) {
	const response = await orderRequest.getOrderDetail(id);
	const { payload } = response;
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	// Determine action buttons based on order status
	const renderActionButton = () => {
		const status = payload.data.OrderStatus[0].status.type;

		if (checkCompletedOrder(payload.data.OrderStatus)) {
			return (
				<div className="flex gap-3">
					<Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
						Mua lại
					</Button>
					<DialogDemo
						items={payload.data.items}
						orderId={id}
						sessionToken={sessionToken}
					/>
				</div>
			);
		}

		switch(status) {
			case 'CANCELLED':
				return (
					<Button variant="outline" className="text-gray-600 border-gray-400 hover:bg-gray-50">
						Đơn hàng đã hủy
					</Button>
				);
			case 'SHIPPED':
				return (
					<div className="flex gap-3">
						<Button variant="default">
							Xác nhận nhận hàng
						</Button>
						<Button variant="destructive" className="bg-red-500 hover:bg-red-600">
							Hủy đơn hàng
						</Button>
					</div>
				);
			default:
				return (
					<Button variant="destructive" className="bg-red-500 hover:bg-red-600">
						Hủy đơn hàng
					</Button>
				);
		}
	};

	return (
		<div className="container mx-auto py-8 px-4 max-w-5xl">
			<div className="flex items-center gap-3 mb-6">
				<PackageIcon className="text-primary" size={28} />
				<h1 className="text-2xl font-bold">Chi tiết đơn hàng</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left column - Order details */}
				<div className="lg:col-span-2 space-y-6">
					{/* Order summary card */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
							<div className="flex flex-col">
								<div className="text-sm text-gray-500">Đơn hàng</div>
								<div className="text-lg font-bold text-primary">#MH{payload.data.id}</div>
							</div>
							<StatusComponent status={payload.data.OrderStatus[0].status.type} />
						</CardHeader>
						<CardContent className="p-6">
							<div className="flex flex-col gap-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2 text-gray-600">
										<CalendarIcon size={18} />
										<span className="text-sm">Ngày đặt hàng:</span>
									</div>
									<span className="font-medium">
										{getDateFormat(new Date(payload.data.createdAt))}
									</span>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2 text-gray-600">
										<Truck size={18} />
										<span className="text-sm">Phương thức thanh toán:</span>
									</div>
									<Badge variant="outline" className="font-medium text-blue-600 border-blue-600">
										COD
									</Badge>
								</div>

								<Separator />

								<div>
									{renderActionButton()}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Products */}
					<Card>
						<CardHeader className="bg-gray-50 border-b">
							<div className="text-lg font-semibold">Sản phẩm đã đặt</div>
						</CardHeader>
						<CardContent className="p-0">
							<div className="divide-y">
								{payload.data.items.map((item) => (
									<div key={item.id} className="flex items-center gap-4 p-4">
										<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border">
											<Image
												src={
													item.product?.images[0]?.publicUrl ??
													'https://placehold.co/200x150/png'
												}
												alt={item.product?.name || "Product"}
												fill
												className="object-cover"
											/>
										</div>

										<div className="flex-grow">
											<h4 className="font-semibold text-base mb-1">
												{item.product?.name}
											</h4>
											<div className="text-sm text-gray-600">
												{getPriceFormat(item.unitPrice)} x {item.quantity}
											</div>
										</div>

										<div className="text-right">
											<div className="text-lg font-semibold text-green-600">
												{getPriceFormat(item.unitPrice * item.quantity)}
											</div>
										</div>
									</div>
								))}
							</div>

							<div className="bg-gray-50 p-4 flex flex-col gap-2 border-t">
								<div className="flex justify-between">
									<span className="text-gray-600">Tổng tiền sản phẩm:</span>
									<span className="font-medium">{getPriceFormat(payload.data.total - 0)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Phí vận chuyển:</span>
									<span className="font-medium">{getPriceFormat(0)}</span>
								</div>
								<Separator className="my-2" />
								<div className="flex justify-between">
									<span className="text-gray-700 font-medium">Tổng thanh toán:</span>
									<span className="text-xl font-bold text-green-600">{getPriceFormat(payload.data.total)}</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Shipping Timeline */}
					<Card>
						<CardHeader className="bg-gray-50 border-b">
							<div className="text-lg font-semibold">Trạng thái đơn hàng</div>
						</CardHeader>
						<CardContent className="p-6">
							<OrderTimeLine id={payload.data.id} data={payload.data.OrderStatus} />
						</CardContent>
					</Card>
				</div>

				{/* Right column - Customer and shipping info */}
				<div className="space-y-6">
					{/* Customer info */}
					<Card>
						<CardHeader className="bg-gray-50 border-b">
							<div className="text-lg font-semibold">Thông tin khách hàng</div>
						</CardHeader>
						<CardContent className="p-0">
							<div className="p-4 space-y-3">
								<div className="flex items-start gap-3">
									<User2Icon size={18} className="text-gray-500 mt-0.5" />
									<div>
										<div className="text-sm text-gray-500">Người nhận:</div>
										<div className="font-medium">
											{payload.data.user.firstName + ' ' + payload.data.user.lastName}
										</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<PhoneIcon size={18} className="text-gray-500 mt-0.5" />
									<div>
										<div className="text-sm text-gray-500">Số điện thoại:</div>
										<div className="font-medium">
											{payload.data.user.phone || "Không có thông tin"}
										</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<MapPinIcon size={18} className="text-gray-500 mt-0.5" />
									<div>
										<div className="text-sm text-gray-500">Địa chỉ giao hàng:</div>
										<div className="font-medium">
											{payload.data.addressLine}
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Shop info */}
					<Card>
						<CardHeader className="bg-gray-50 border-b">
							<div className="text-lg font-semibold">Thông tin cửa hàng</div>
						</CardHeader>
						<CardContent className="p-4 space-y-3">
							<div className="flex items-center gap-3">
								<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border">
									<Image
										src={payload.data.shop?.image?.publicUrl || "https://placehold.co/200x200/png"}
										alt="Shop Image"
										fill
										className="object-cover"
									/>
								</div>
								<div>
									<div className="font-semibold">{payload.data.shop.shopName}</div>
									<Link
										href={`/buyer/shop/${payload.data.shop.id}`}
										className="text-sm text-primary hover:underline"
									>
										Xem cửa hàng
									</Link>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default OrderDetail;
