import { getDateFormat, getPriceFormat } from '@/lib/utils';
import { OrderListResType } from '@/schemaValidations/response/order';
import { Warehouse } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function OrderCard({ data }: { data: OrderListResType['data'][number] }) {
	return (
		<Link
			href={`/buyer/order/${data.id}`}
			className="flex flex-col border-white"
		>
			<div className="flex items-center justify-between p-4 border gap-2">
				<span className="font-bold">
					{getDateFormat(new Date(data.createdAt))}
				</span>
				<div className="flex items-center gap-2">
					<Warehouse />
					<span>{data.shop.shopName}</span>
				</div>
				<span>{data.OrderStatus[data.OrderStatus.length - 1].status.name}</span>
			</div>

			{data.items.map((item) => (
				<div key={item.id} className="flex gap-2 p-4">
					<Image
						src={
							item.product?.images[0]?.publicUrl ??
							'https://placehold.co/200x150/png'
						}
						alt="Product Image"
						width={200}
						height={150}
						className="object-cover rounded-lg"
					/>
					<div className="flex flex-col w-full">
						<h3 className="text-lg font-semibold">{item.product?.name}</h3>
						<p className="text-sm text-gray-500">x{item.quantity}</p>
						<p className="text-right text-green-600 font-semibold">
							{getPriceFormat(item.unitPrice * item.quantity)}
						</p>
					</div>
				</div>
			))}

			<div>
				<div className="flex items-center justify-between p-4 border-t">
					<span className="text-sm text-gray-500">
						Tổng số tiền (1 sản phẩm)
					</span>
					<span className="text-lg font-semibold text-green-600">
						{getPriceFormat(data.total)}
					</span>
				</div>
			</div>
		</Link>
	);
}

export default OrderCard;
