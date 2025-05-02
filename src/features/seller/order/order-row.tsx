import Link from 'next/link';
import { getDateFormat, getPriceFormat } from '../../../lib/utils';
import { OrderListResType } from '../../../schemaValidations/response/order';

function OrderRow({ data }: { data: OrderListResType['data'][number] }) {
	console.log(data);
	return (
		<div className="w-full flex flex-row  border-b border-gray-300 py-4 gap-5">
			<div className="flex-1">
				<span className="font-semibold text-gray-400">Mã đơn hàng</span>
				<p className="font-bold">#MH{data.id}</p>
			</div>

			<div className="flex-1">
				<span className="font-semibold text-gray-400">Ngày đặt hàng</span>
				<p className="font-bold">{getDateFormat(new Date(data.createdAt))}</p>
			</div>

			<div className="flex-1">
				<span className="font-semibold text-gray-400">Tổng tiền</span>
				<p className="font-bold">{getPriceFormat(data.total)}</p>
			</div>

			<div className="flex-1">
				<span className="font-semibold text-gray-400">Trạng thái</span>
				<p className="font-bold">
					{data.OrderStatus[data.OrderStatus.length - 1].status.name}
				</p>
			</div>

			<div className="flex-1 flex">
				<div className="flex-1 justify-center items-center flex gap-2">
					<Link
						href={`/seller/order/${data.id}`}
						className="text-blue-500 bg-white hover:bg-blue-500 hover:text-white border border-blue-500 rounded-md px-2"
					>
						Xem chi tiết
					</Link>
				</div>
			</div>
		</div>
	);
}

export default OrderRow;
