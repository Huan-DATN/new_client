import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getPriceFormat } from '@/lib/utils';
import { CartType } from '@/schemaValidations/response/cart';
import Image from 'next/image';
import Link from 'next/link';

function CartGroupShop({ data }: { data: CartType }) {
	return (
		<div className="border border-gray-300 rounded-lg w-full p-4 mb-4">
			<div className="flex justify-between items-center">
				<div className="flex flex-col ">
					<h2 className="text-lg font-semibold">
						{data.shop?.shopName || 'shop'}
					</h2>
					<p className="text-sm text-gray-500">
						{data.shop?.address || 'dia chi'}
					</p>
				</div>
			</div>
			<div>
				{data.cartItems.map((item) => (
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
							<DropdownMenu>
								<DropdownMenuTrigger>...</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link href={`/buyer/products/${item.product?.id}`}>
											Chi tiết
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Link href={`/buyer/cart/remove/item/${item.id}`}>
											Xoá sản phẩm
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				))}
			</div>
			<div>
				<div className="flex flex-row-reverse mt-4">
					<div className="flex flex-col items-end">
						<p className="text-2xl font-bold text-green-800">
							Tổng cộng: {getPriceFormat(data.totalPrice)}
						</p>
						<div>
							<Button asChild>
								<Link
									className="bg-red-600 text-white mr-2 hover:bg-red-700"
									href={`/buyer/cart/remove/shop/${data.shop.id}`}
								>
									Xoá giỏ hàng
								</Link>
							</Button>
							<Button className="bg-green-600 text-white hover:bg-green-700">
								<Link href={`/buyer/order/checkout/${data.shop.id}`}>
									Thanh toán
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartGroupShop;
