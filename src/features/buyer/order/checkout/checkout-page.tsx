import orderRequest from '@/api/orderRequest';
import userRequest from '@/api/userRequest';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPriceFormat } from '../../../../lib/utils';
import ButtonActive from './button-active';
import ChcekoutItemsList from './checkout-items-list';
import MeInfo from './me-info';
import ShopInfo from './shop-info';

async function CheckoutPage({ id }: { id: number }) {
	const sessionToken = (await cookies()).get('sessionToken')?.value;

	if (!sessionToken) {
		// Handle the case where the session token is not available
		// For example, redirect to a login page or show an error message
		redirect('/auth/login');
	}

	const response = await orderRequest.checkout(sessionToken, id);
	const dataCheckout = response.payload.data;

	const userMe = await userRequest.getMe(sessionToken);
	return (
		<div className="max-w-4xl mx-auto mt-8 mb-12 px-4 sm:px-6">
			<div className="flex items-center mb-8">
				<div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white font-bold mr-3">
					🛒
				</div>
				<h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
					Thanh toán đơn hàng
				</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="md:col-span-2 space-y-6">
					<div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
						<div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-800 flex items-center">
								<span className="mr-2">👤</span> Thông tin khách hàng
							</h2>
						</div>
						<div className="p-5">
							<MeInfo data={userMe.payload.data} />
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
						<div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-800 flex items-center">
								<span className="mr-2">🏪</span> Thông tin cửa hàng
							</h2>
						</div>
						<div className="p-5">
							<ShopInfo data={dataCheckout.shop} />
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
						<div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-800 flex items-center">
								<span className="mr-2">📦</span> Sản phẩm đặt mua
							</h2>
						</div>
						<div className="p-5">
							<ChcekoutItemsList cartItems={dataCheckout.cartItems} />
						</div>
					</div>
				</div>

				<div className="md:col-span-1">
					<div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 sticky top-4">
						<div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-800 flex items-center">
								<span className="mr-2">💰</span> Tổng thanh toán
							</h2>
						</div>
						<div className="p-5 space-y-4">
							<div className="flex justify-between items-center pb-4 border-b border-gray-200">
								<span className="text-gray-600">Tổng tiền hàng:</span>
								<span className="font-medium">
									{getPriceFormat(dataCheckout.totalPrice)}
								</span>
							</div>
							<div className="flex justify-between items-center pb-4 border-b border-gray-200">
								<span className="text-gray-600">Phí vận chuyển:</span>
								<span className="font-medium">Miễn phí</span>
							</div>
							<div className="flex justify-between items-center pt-2">
								<h3 className="text-lg font-semibold text-gray-800">
									Tổng cộng:
								</h3>
								<p className="text-2xl font-bold text-green-600">
									{getPriceFormat(dataCheckout.totalPrice)}
								</p>
							</div>
							<p className="text-sm text-gray-500 italic">
								(Đã bao gồm thuế và phí vận chuyển)
							</p>

							<div className="mt-6">
								<ButtonActive
									sessionToken={sessionToken}
									shopId={dataCheckout.shop.id}
									orderId={id}
									amount={dataCheckout.totalPrice}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CheckoutPage;
