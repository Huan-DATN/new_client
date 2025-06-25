'use client';

import orderRequest from '@/api/orderRequest';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import OrderTimeLine from '@/features/components/order-timeline';
import {
	checkCompletedOrder,
	getDateFormat,
	getLastestActiveStatus,
	getPriceFormat,
} from '@/lib/utils';
import {
	CalendarIcon,
	MapPinIcon,
	PackageIcon,
	PhoneIcon,
	Truck,
	User2Icon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { OrderDetailResType } from '../../../../schemaValidations/response/order';
import OrderStatusBadge from '../order-status-badge';
import ConfirmButton from './confirm-button';
import RatingsDialog from './ratings-dialog';

function OrderDetail({
	sessionToken,
	id,
}: {
	sessionToken: string;
	id: number;
}) {
	const [orderDetail, setOrderDetail] = useState<
		OrderDetailResType['data'] | null
	>(null);

	useEffect(() => {
		async function getOrderDetail() {
			const response = await orderRequest.getOrderDetail(id);
			const { payload } = response;
			setOrderDetail(payload.data);
		}

		getOrderDetail();
	}, [id]);

	if (!orderDetail) return null;

	const latestActiveStatus = getLastestActiveStatus(orderDetail.OrderStatus);

	const renderActionButton = () => {
		if (
			checkCompletedOrder(orderDetail.OrderStatus) &&
			!orderDetail?.isCommented
		) {
			return (
				<div className="flex gap-3">
					<RatingsDialog
						items={orderDetail?.items ?? []}
						orderId={id}
						sessionToken={sessionToken}
					/>
				</div>
			);
		}

		switch (latestActiveStatus.type) {
			case 'CANCELLED':
				return (
					<Button
						variant="outline"
						className="text-gray-600 border-gray-400 hover:bg-gray-50"
					>
						Đơn hàng đã hủy
					</Button>
				);
			case 'SHIPPED':
				return (
					<div className="flex gap-3">
						<ConfirmButton id={id} />
					</div>
				);
			default:
				return null;
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
								<div className="text-lg font-bold text-primary">
									#MH{orderDetail.id}
								</div>
							</div>
							<OrderStatusBadge status={latestActiveStatus} size="lg" />
						</CardHeader>
						<CardContent className="p-6">
							<div className="flex flex-col gap-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2 text-gray-600">
										<CalendarIcon size={18} />
										<span className="text-sm">Ngày đặt hàng:</span>
									</div>
									<span className="font-medium">
										{getDateFormat(new Date(orderDetail.createdAt))}
									</span>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2 text-gray-600">
										<Truck size={18} />
										<span className="text-sm">Phương thức thanh toán:</span>
									</div>
									{orderDetail.paymentMethod === 'BANK_TRANSFER' ? (
										<>
											<Badge
												variant="outline"
												className="font-medium text-blue-600 border-blue-600"
											>
												Chuyển khoản
											</Badge>
											<Image
												src={orderDetail.payment?.image?.publicUrl || ''}
												alt="Bank Transfer"
												width={100}
												height={100}
												className="object-contain"
											/>
										</>
									) : (
										<Badge
											variant="outline"
											className="font-medium text-blue-600 border-blue-600"
										>
											COD
										</Badge>
									)}
								</div>

								<Separator />

								<div>{renderActionButton()}</div>
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
								{orderDetail.items.map((item) => (
									<div key={item.id} className="flex items-center gap-4 p-4">
										<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border">
											<Image
												src={
													item.product?.images[0]?.publicUrl ??
													'https://placehold.co/200x150/png'
												}
												alt={item.product?.name || 'Product'}
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
									<span className="font-medium">
										{getPriceFormat(orderDetail.total - 0)}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Phí vận chuyển:</span>
									<span className="font-medium">{getPriceFormat(0)}</span>
								</div>
								<Separator className="my-2" />
								<div className="flex justify-between">
									<span className="text-gray-700 font-medium">
										Tổng thanh toán:
									</span>
									<span className="text-xl font-bold text-green-600">
										{getPriceFormat(orderDetail.total)}
									</span>
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
							<OrderTimeLine
								id={orderDetail.id}
								data={orderDetail.OrderStatus}
							/>
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
											{orderDetail.user.firstName +
												' ' +
												orderDetail.user.lastName}
										</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<PhoneIcon size={18} className="text-gray-500 mt-0.5" />
									<div>
										<div className="text-sm text-gray-500">Số điện thoại:</div>
										<div className="font-medium">
											{orderDetail.user.phone || 'Không có thông tin'}
										</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<MapPinIcon size={18} className="text-gray-500 mt-0.5" />
									<div>
										<div className="text-sm text-gray-500">
											Địa chỉ giao hàng:
										</div>
										<div className="font-medium">{orderDetail.addressLine}</div>
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
										src={
											orderDetail.shop?.image?.publicUrl ||
											'https://placehold.co/200x200/png'
										}
										alt="Shop Image"
										fill
										className="object-cover"
									/>
								</div>
								<div>
									<div className="font-semibold">
										{orderDetail.shop.shopName}
									</div>
									<Link
										href={`/buyer/shop/${orderDetail.shop.id}`}
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
