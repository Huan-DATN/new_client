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
		<div className="border border-gray-300 rounded-lg w-full p-4 mb-4">
			{cartItems.map((item) => (
				<div key={item.id} className="flex items-center justify-between mt-4">
					<div className="flex items-center gap-4">
						<Image
							src={
								Array.isArray(item.product.images) &&
								item.product.images.length > 0
									? item.product.images[0].publicUrl
									: 'https://placehold.co/100/png'
							}
							alt="Product Image"
							width={100}
							height={100}
							className="rounded-md"
						/>
						<div className="flex flex-col">
							<div>
								<Link
									className="text-md font-semibold"
									href={`/buyer/products/${item.product?.id}`}
								>
									{item.product?.name}
								</Link>
								<p className="text-xl text-gray-500 font-bold">
									Số lượng: {item.quantity}
								</p>
								<p className="text-l text-gray-500">
									{item.quantity} x {getPriceFormat(item.product.price)}
								</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col items-end">
						<p className="text-l font-bold text-green-800">
							{getPriceFormat(item.quantity * item.product.price)}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default ChcekoutItemsList;
