import commonRequest from '@/api/commonRequest';
import orderRequest from '@/api/orderRequest';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { OrderStatusEnum } from '@/constants/orderStatusEnum';
import OrderTimeLine from '@/features/components/order-timeline';
import {
	getDateFormat,
	getLastestActiveStatus,
	getPriceFormat,
} from '@/lib/utils';
import {
	AlertTriangle,
	ArrowLeft,
	Calendar,
	MapPin,
	Receipt,
	ShoppingBag,
	Truck,
	User,
} from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../../../../components/ui/badge';
import OrderStatusBadge from './order-status-badge';
import UpdateStatus from './update-status';

async function OrderDetail({ id }: { id: number }) {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	const response = await orderRequest.getOrderDetail(id);
	const { payload } = response;
	const order = payload.data;
	const latestActiveStatus = getLastestActiveStatus(order.OrderStatus);

	// Fetch all available statuses
	const statusesResponse = await commonRequest.getAllStatus();
	const allStatuses = statusesResponse.payload.data;

	// Helper function to determine button states
	const canCancel = [
		OrderStatusEnum.PENDING,
		OrderStatusEnum.CONFIRMED,
	].includes(latestActiveStatus.type as OrderStatusEnum);
	const canConfirm = latestActiveStatus.type === OrderStatusEnum.PENDING;

	return (
		<div className="container max-w-5xl mx-auto py-6 space-y-6">
			{/* Back button and page title */}
			<div className="flex items-center justify-between">
				<Button variant="outline" size="sm" asChild className="gap-1">
					<Link href="/seller/order">
						<ArrowLeft className="h-4 w-4" />
						Trở về danh sách
					</Link>
				</Button>
				<h1 className="text-xl font-bold">Chi tiết đơn hàng #{id}</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Order summary and actions */}
				<div className="lg:col-span-2 space-y-6">
					{/* Order Summary Card */}
					<Card>
						<CardHeader className="pb-3">
							<div className="flex justify-between items-start">
								<div>
									<CardTitle className="text-lg">Thông tin đơn hàng</CardTitle>
									<CardDescription>
										Chi tiết đơn hàng và thông tin về khách hàng
									</CardDescription>
								</div>
								<OrderStatusBadge status={latestActiveStatus} size="lg" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Order Information */}
								<div className="space-y-3">
									<h3 className="text-sm font-medium text-muted-foreground">
										Thông tin đơn hàng
									</h3>

									<div className="flex items-start gap-2 text-sm">
										<Receipt className="h-4 w-4 mt-0.5 text-muted-foreground" />
										<div>
											<p className="font-medium">Mã đơn hàng</p>
											<p className="text-muted-foreground">#MH{order.id}</p>
										</div>
									</div>

									<div className="flex items-start gap-2 text-sm">
										<Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
										<div>
											<p className="font-medium">Ngày đặt hàng</p>
											<p className="text-muted-foreground">
												{getDateFormat(new Date(order.createdAt))}
											</p>
										</div>
									</div>
								</div>

								{/* Customer Information */}
								<div className="space-y-3">
									<h3 className="text-sm font-medium text-muted-foreground">
										Thông tin người nhận
									</h3>

									<div className="flex items-start gap-2 text-sm">
										<User className="h-4 w-4 mt-0.5 text-muted-foreground" />
										<div>
											<p className="font-medium">Người nhận</p>
											<p className="text-muted-foreground">
												{order.user.firstName} {order.user.lastName}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-2 text-sm">
										<MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
										<div>
											<p className="font-medium">Địa chỉ</p>
											<p className="text-muted-foreground">
												{order.addressLine}
											</p>
										</div>
									</div>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2 text-gray-600">
										<Truck size={18} />
										<span className="text-sm">Phương thức thanh toán:</span>
									</div>
									{payload.data.paymentMethod === 'BANK_TRANSFER' ? (
										<>
											<Badge
												variant="outline"
												className="font-medium text-blue-600 border-blue-600"
											>
												Chuyển khoản
											</Badge>
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
								{payload.data.paymentMethod === 'BANK_TRANSFER' && (
									<div className="flex items-center gap-2">
										<Image
											src={payload.data.payment?.image?.publicUrl || ''}
											alt="Bank Transfer"
											width={300}
											height={300}
											className="object-contain"
										/>
									</div>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Products card */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-lg">Sản phẩm</CardTitle>
							<CardDescription>
								Danh sách sản phẩm trong đơn hàng
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{order.items.map((item) => (
									<div
										key={item.id}
										className="flex items-start gap-4 py-4 first:pt-0 last:pb-0 border-b last:border-0"
									>
										<div className="relative h-20 w-20 rounded-md overflow-hidden border bg-muted flex-shrink-0">
											<Image
												src={
													item.product?.images[0]?.publicUrl ??
													'/placeholder.png'
												}
												alt={item.product?.name || 'Product image'}
												fill
												className="object-cover"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<h4 className="font-medium truncate">
												{item.product?.name}
											</h4>
											<p className="text-sm text-muted-foreground">
												{getPriceFormat(item.unitPrice)} x {item.quantity}
											</p>
										</div>
										<div className="font-medium">
											{getPriceFormat(item.unitPrice * item.quantity)}
										</div>
									</div>
								))}

								<Separator />

								{/* Total */}
								<div className="flex justify-between items-center pt-2">
									<p className="font-medium">
										Tổng cộng ({order.items.length} sản phẩm):
									</p>
									<p className="font-bold text-primary text-lg">
										{getPriceFormat(order.total)}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Order status and actions */}
				<div className="space-y-6">
					{/* Action card */}
					{latestActiveStatus.type !== OrderStatusEnum.CANCELLED &&
						latestActiveStatus.type !== OrderStatusEnum.DELIVERED && (
							<>
								{/* New Status Update Card */}
								<UpdateStatus
									id={id}
									currentStatus={latestActiveStatus}
									allStatuses={allStatuses}
								/>

								{/* Cancel Order Option */}
								{canCancel && (
									<Card>
										<CardHeader className="pb-3">
											<CardTitle className="text-lg text-destructive">
												Tùy chọn thêm
											</CardTitle>
										</CardHeader>
										<CardContent>
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															variant="destructive"
															className="w-full justify-start"
															size="sm"
														>
															<AlertTriangle className="mr-2 h-4 w-4" />
															Hủy đơn hàng
														</Button>
													</TooltipTrigger>
													<TooltipContent>
														<p>Hủy đơn hàng này</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</CardContent>
									</Card>
								)}
							</>
						)}

					{latestActiveStatus.type === OrderStatusEnum.PENDING && (
						<Card>
							<CardHeader className="pb-3">
								<CardTitle className="text-lg">Xác nhận đơn hàng</CardTitle>
							</CardHeader>
							<CardContent>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="default"
												className="w-full justify-start"
												size="sm"
												asChild
											>
												<Link href={`${order.id}/plan`}>
													<ShoppingBag className="mr-2 h-4 w-4" />
													Lập kế hoạch đơn hàng
												</Link>
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Xác nhận và lập kế hoạch cho đơn hàng</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</CardContent>
						</Card>
					)}

					{/* Timeline card */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-lg">Lịch sử trạng thái</CardTitle>
							<CardDescription>
								Theo dõi các thay đổi trạng thái đơn hàng
							</CardDescription>
						</CardHeader>
						<CardContent>
							<OrderTimeLine
								id={order.id}
								data={order.OrderStatus}
								isSeller={true}
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default OrderDetail;
