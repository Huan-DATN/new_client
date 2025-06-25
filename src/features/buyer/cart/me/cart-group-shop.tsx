import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getPriceFormat } from '@/lib/utils';
import { CartType } from '@/schemaValidations/response/cart';
import { MoreVertical, ShoppingCart, Store, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function CartGroupShop({ data }: { data: CartType }) {
	return (
		<Card className="overflow-hidden">
			<CardHeader className="bg-gray-50 p-4 flex flex-row items-center justify-between border-b">
				<div className="flex items-center gap-2">
					<Store size={18} className="text-gray-500" />
					<h3 className="font-medium">{data.shop?.shopName || 'Shop'}</h3>
				</div>
			</CardHeader>

			<CardContent className="p-0">
				<div className="divide-y">
					{data.cartItems.map((item) => (
						<div key={item.id} className="p-4">
							<div className="flex gap-4">
								<Link
									href={`/buyer/products/${item.product?.id}`}
									className="shrink-0"
								>
									<div className="relative h-24 w-24 overflow-hidden rounded-md border">
										<Image
											src={
												Array.isArray(item.product.images) &&
												item.product.images.length > 0
													? item.product.images[0].publicUrl
													: 'https://placehold.co/100/png'
											}
											alt={item.product?.name || 'Product'}
											fill
											className="object-cover"
										/>
									</div>
								</Link>

								<div className="flex flex-col flex-grow min-w-0">
									<Link
										href={`/buyer/products/${item.product?.id}`}
										className="text-base font-medium line-clamp-2 hover:text-primary transition-colors"
									>
										{item.product?.name}
									</Link>

									<div className="text-sm text-gray-500 mt-1">
										{getPriceFormat(item.product.price)} / sản phẩm
									</div>

									<div className="mt-auto pt-3 flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div className="text-sm text-gray-500">Số lượng</div>

											<div className="flex items-center border rounded-md">
												<span className="px-3 py-1 border-x text-center min-w-10">
													{item.quantity}
												</span>
											</div>
										</div>

										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon" className="h-8 w-8">
													<MoreVertical size={16} />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem asChild>
													<Link href={`/buyer/products/${item.product?.id}`}>
														Xem chi tiết sản phẩm
													</Link>
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem
													asChild
													className="text-red-500 focus:text-red-500"
												>
													<Link
														href={`/buyer/cart/remove/item/${item.id}`}
														className="flex items-center"
													>
														<Trash2 size={16} className="mr-2" />
														<span>Xoá sản phẩm</span>
													</Link>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</div>

								<div className="text-right">
									<div className="font-semibold text-lg text-green-600">
										{getPriceFormat(item.quantity * item.product.price)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="bg-gray-50 p-4 border-t">
					<div className="flex justify-between items-center mb-4">
						<span className="text-gray-600">
							Tổng ({data.cartItems.length} sản phẩm):
						</span>
						<span className="text-lg font-semibold text-green-600">
							{getPriceFormat(data.totalPrice)}
						</span>
					</div>

					<div className="flex flex-col sm:flex-row gap-3 justify-end">
						<Button variant="outline" asChild className="sm:order-1">
							<Link
								href={`/buyer/cart/remove/shop/${data.shop.id}`}
								className="flex items-center"
							>
								<Trash2 size={16} className="mr-2" />
								<span>Xoá tất cả</span>
							</Link>
						</Button>

						<Button
							variant="default"
							className="bg-green-600 hover:bg-green-700 text-white font-medium"
							asChild
						>
							<Link
								href={`/buyer/order/checkout/${data.shop.id}`}
								className="flex items-center "
							>
								<ShoppingCart size={16} className="mr-2" />
								Mua hàng
							</Link>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default CartGroupShop;
