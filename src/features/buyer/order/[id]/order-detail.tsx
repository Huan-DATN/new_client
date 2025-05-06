import orderRequest from '@/api/orderRequest';
import { Button } from '@/components/ui/button';
import { getDateFormat, getPriceFormat } from '@/lib/utils';
import Image from 'next/image';
import StatusComponent from '../../../../components/status-component';
async function OrderDetail({ id }: { id: number }) {
	const { payload } = await orderRequest.getOrderDetail(id);

	return (
		<div className="w-1/2 mx-auto p-6 shadow-md rounded-xl space-y-6">
			{/* Header */}
			<div className="flex flex-1 justify-between">
				<div className="flex flex-col flex-1">
					<p className="text-sm text-gray-500">Đơn hàng</p>
					<p className="font-bold text-red-600">#MH{payload.data.id}</p>
					<p className="text-sm text-gray-500">Ngày tạo đơn</p>
					<p className="text-red-500">
						{getDateFormat(new Date(payload.data.createdAt))}
					</p>
					<p className="text-sm text-gray-500">Phương thức thanh toán: </p>
					<p className="text-blue-500">{'COD'}</p>
					<p className="text-sm text-gray-500">Trạng thái: </p>
					<StatusComponent
						status={
							payload.data.OrderStatus[payload.data.OrderStatus.length - 1]
								.status.type
						}
					/>
					<div>
						<Button className="bg-red-300 text-sm mt-2 hover:bg-red-400 max-w-1/2!">
							Hủy đơn
						</Button>
					</div>
				</div>

				{/* Người gửi và Tài xế */}
				<div className="flex flex-1 gap-8">
					<div>
						<h3 className="font-semibold text-orange-700 mb-2">
							THÔNG TIN NGƯỜI GỬI
						</h3>
						<p>
							<strong>Họ và tên:</strong> {payload.data.shop.shopName}
						</p>
						<p>
							<strong>Địa chỉ:</strong> {payload.data.shop.address}
						</p>
					</div>
				</div>
			</div>

			{/* Sản phẩm */}
			{payload.data.items.map((item) => (
				<div key={item.id} className="flex items-center border-t pt-4">
					<Image
						src={
							item.product?.images[0]?.publicUrl ??
							'https://placehold.co/200x150/png'
						}
						alt="Product"
						width={100}
						height={100}
						className="rounded"
					/>
					<div className="ml-4">
						<h4 className="font-semibold">{item.product?.name}</h4>
						<p>
							{getPriceFormat(item.unitPrice)} x {item.quantity}
						</p>
					</div>
					<p className="ml-auto text-green-600 font-semibold">
						{getPriceFormat(item.unitPrice * item.quantity)}
					</p>
				</div>
			))}

			{/* Tổng tiền */}
			<div className="border-t pt-4">
				<p className="font-bold mt-2">
					Tổng tiền:{' '}
					<span className="float-right text-green-700">
						{getPriceFormat(payload.data.total)}
					</span>
				</p>
			</div>

			{/* Lịch sử đơn hàng */}
			<div className="border-t pt-4">
				<h4 className="font-semibold mb-2">Lịch sử đơn hàng</h4>
				<ul className="space-y-1 text-sm">
					{payload.data.OrderStatus.map((status) => (
						<li key={status.id} className="text-sm mt-2">
							{getDateFormat(new Date(status.createdAt))} - {status.status.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default OrderDetail;
