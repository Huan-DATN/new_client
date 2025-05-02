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
		<div className="flex flex-col justify-center items-center w-1/2 mx-auto mt-5 gap-3">
			<h1 className="text-2xl font-bold text-gray-800">Thanh toán</h1>
			<MeInfo data={userMe.payload.data} />

			<ShopInfo data={dataCheckout.shop} className="mt-5" />

			<ChcekoutItemsList cartItems={dataCheckout.cartItems} />

			<div className="flex flex-col w-full p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold text-gray-800">Tổng tiền</h2>
					<p className="text-xl font-bold text-green-800">
						{getPriceFormat(dataCheckout.totalPrice)}
					</p>
				</div>
				<p className="text-sm text-gray-500">
					(Đã bao gồm thuế và phí vận chuyển)
				</p>
				<div className="flex flex-row-reverse items-center justify-between mt-4">
					<ButtonActive
						sessionToken={sessionToken}
						shopId={dataCheckout.shop.id}
					/>
				</div>
			</div>
		</div>
	);
}

export default CheckoutPage;
