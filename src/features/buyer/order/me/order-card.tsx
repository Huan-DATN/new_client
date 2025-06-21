import { Separator } from '@/components/ui/separator';
import {
	getDateFormat,
	getLastestActiveStatus,
	getPriceFormat,
} from '@/lib/utils';
import { OrderListResType } from '@/schemaValidations/response/order';
import { Calendar, ChevronRight, Package, Store } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import OrderStatusBadge from '../order-status-badge';

function OrderCard({ data }: { data: OrderListResType['data'][number] }) {
	// Determine action button based on order status

	return (
		<div className="bg-white rounded-lg shadow-sm border overflow-hidden">
			{/* Header with order info */}
			<div className="bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
				<div className="flex items-center gap-3">
					<Package className="text-gray-500" size={18} />
					<span className="font-semibold text-gray-800">
						Đơn hàng #{data.id}
					</span>
					<OrderStatusBadge status={getLastestActiveStatus(data.OrderStatus)} />
				</div>

				<div className="flex items-center gap-4 text-sm text-gray-500">
					<div className="flex items-center gap-1">
						<Calendar size={14} />
						<span>{getDateFormat(new Date(data.createdAt))}</span>
					</div>
					<div className="flex items-center gap-1">
						<Store size={14} />
						<span>{data.shop.shopName}</span>
					</div>
				</div>
			</div>

			{/* Products */}
			<div className="p-4 divide-y">
				{data.items.map((item) => (
					<div key={item.id} className="flex gap-3 py-3 items-center">
						<div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border">
							<Image
								src={
									item.product?.images[0]?.publicUrl ??
									'https://placehold.co/200x150/png'
								}
								alt={item.product?.name || 'Product image'}
								fill
								className="object-cover"
							/>
						</div>

						<div className="flex-grow min-w-0">
							<h3 className="text-base font-medium truncate">
								{item.product?.name}
							</h3>
							<p className="text-sm text-gray-500">
								{getPriceFormat(item.unitPrice)} x {item.quantity}
							</p>
						</div>

						<p className="font-medium text-green-600">
							{getPriceFormat(item.unitPrice * item.quantity)}
						</p>
					</div>
				))}
			</div>

			{/* Footer with total and actions */}
			<div className="bg-gray-50 p-4">
				<div className="flex justify-between items-center">
					<div className="text-sm text-gray-500">
						{data.items.length}{' '}
						{data.items.length > 1 ? 'sản phẩm' : 'sản phẩm'}
					</div>
					<div className="text-right">
						<div className="text-sm text-gray-500">Tổng thanh toán:</div>
						<div className="text-lg font-bold text-green-600">
							{getPriceFormat(data.total)}
						</div>
					</div>
				</div>

				<Separator className="my-3" />

				<div className="flex justify-between items-center">
					<Link
						href={`/buyer/order/${data.id}`}
						className="inline-flex items-center text-sm text-gray-600 font-medium hover:text-primary transition-colors"
					>
						Xem chi tiết <ChevronRight size={16} />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default OrderCard;
