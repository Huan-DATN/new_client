import { getPriceFormat } from '@/lib/utils';
import { CheckoutOrderResType } from '@/schemaValidations/response/order';
import Image from 'next/image';
import Link from 'next/link';

function ChcekoutItemsList({
	cartItems,
}: {
	cartItems: CheckoutOrderResType['data']['cartItems'];
}) {
	return (
		<div className="space-y-4">
			{cartItems.length === 0 ? (
				<div className="text-center py-8">
					<p className="text-gray-500">Không có sản phẩm nào trong giỏ hàng</p>
				</div>
			) : (
				cartItems.map((item) => (
					<div
						key={item.id}
						className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-150"
					>
						<div className="flex items-center gap-4 mb-3 sm:mb-0">
							<div className="relative overflow-hidden rounded-md border border-gray-200 flex-shrink-0 w-[80px] h-[80px]">
								<Image
									src={
										Array.isArray(item.product.images) &&
										item.product.images.length > 0
											? item.product.images[0].publicUrl
											: 'https://placehold.co/100/png'
									}
									alt={item.product?.name || "Product Image"}
									fill
									sizes="(max-width: 768px) 80px, 100px"
									className="object-cover"
									style={{ objectFit: 'cover' }}
								/>
							</div>
							<div className="flex flex-col">
								<Link
									className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-150"
									href={`/buyer/products/${item.product?.id}`}
								>
									{item.product?.name}
								</Link>
								<div className="flex items-center mt-1">
									<span className="inline-flex items-center justify-center px-2 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-800">
										{item.quantity} × {getPriceFormat(item.product.price)}
									</span>
								</div>
							</div>
						</div>
						<div className="flex flex-col items-end ml-auto">
							<p className="text-lg font-bold text-green-600">
								{getPriceFormat(item.quantity * item.product.price)}
							</p>
						</div>
					</div>
				))
			)}

			{cartItems.length > 0 && (
				<div className="pt-4 border-t border-gray-200 mt-4">
					<p className="text-right text-sm text-gray-600">
						Tổng {cartItems.length} sản phẩm
					</p>
				</div>
			)}
		</div>
	);
}

export default ChcekoutItemsList;
