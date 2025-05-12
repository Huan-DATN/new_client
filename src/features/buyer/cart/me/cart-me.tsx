import cartRequest from '@/api/cartRequest';
import { Button } from '@/components/ui/button';
import { CartType } from '@/schemaValidations/response/cart';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import CartGroupShop from './cart-group-shop';

const EmptyCartMessage = () => {
	return (
		<div className="bg-gray-50 rounded-lg p-8 text-center border">
			<ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
			<h3 className="text-lg font-medium text-gray-700 mb-2">
				Giỏ hàng của bạn đang trống
			</h3>
			<p className="text-gray-500 mb-6">Hãy thêm sản phẩm để tiếp tục mua sắm!</p>
			<Button asChild className="px-6">
				<Link href={'/buyer/products'}>
					Khám phá sản phẩm
				</Link>
			</Button>
		</div>
	);
};

async function CartMe() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;

	if (!sessionToken) {
		return (
			<div className="container mx-auto p-8 text-center">
				<div className="bg-gray-50 rounded-lg p-8 shadow-sm border">
					<ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
					<h2 className="text-xl font-medium text-gray-700 mb-2">Vui lòng đăng nhập để xem giỏ hàng</h2>
					<p className="text-gray-500 mb-6">Đăng nhập để xem và quản lý giỏ hàng của bạn</p>
					<Button asChild className="px-6">
						<Link href={'/auth/login'}>
							Đăng nhập
						</Link>
					</Button>
				</div>
			</div>
		);
	}

	const res = await cartRequest.getCartMe(sessionToken as string);
	const cartItems = res.payload.data;

	return (
		<div className="container mx-auto py-8 px-4 max-w-6xl">
			<div className="flex items-center gap-3 mb-6">
				<ShoppingCart className="text-primary" size={28} />
				<h1 className="text-2xl font-bold">Giỏ hàng của bạn</h1>
			</div>

			{cartItems.length === 0 ? (
				<EmptyCartMessage />
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 space-y-6">
						{cartItems.map((item: CartType) => (
							<CartGroupShop key={item.shop.id} data={item} />
						))}
					</div>

					{/* <div>
						<div className="bg-white rounded-lg border p-6 sticky top-6">
							<h2 className="text-lg font-semibold mb-4">Tổng đơn hàng</h2>
							<Separator className="mb-4" />

							<div className="space-y-3">
								{cartItems.map((item: CartType) => (
									<div key={item.shop.id} className="flex justify-between text-sm">
										<span className="text-gray-600">Shop: {item.shop.shopName}</span>
										<span className="font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice)}</span>
									</div>
								))}
							</div>

							<Separator className="my-4" />

							<div className="flex justify-between mb-6">
								<span className="font-semibold">Tổng thanh toán:</span>
								<span className="text-xl font-bold text-green-600">
									{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
										cartItems.reduce((total, item) => total + item.totalPrice, 0)
									)}
								</span>
							</div>

							<div className="space-y-3">
								<Button className="w-full" asChild>
									<Link href="/buyer/order/checkout/all">
										Thanh toán tất cả
									</Link>
								</Button>
								<p className="text-xs text-gray-500 text-center">
									Mua hàng để được hưởng ưu đãi và tích điểm thành viên
								</p>
							</div>
						</div>
					</div> */}
				</div>
			)}
		</div>
	);
}

export default CartMe;
