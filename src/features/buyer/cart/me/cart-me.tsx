import cartRequest from '@/api/cartRequest';
import { CartType } from '@/schemaValidations/response/cart';
import { cookies } from 'next/headers';
import Link from 'next/link';
import CartGroupShop from './cart-group-shop';

const EmptyCartMessage = () => {
	return (
		<div className="flex flex-col items-center justify-center p-8 text-gray-600">
			<svg
				className="w-16 h-16 mb-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
			>
				<circle cx="12" cy="12" r="10" />
				<path d="M12 16v.01" />
				<path d="M12 8v4" />
			</svg>
			<h3 className="text-lg font-semibold mb-2">
				Giỏ hàng của bạn đang trống
			</h3>
			<p className="text-sm">Hãy thêm sản phẩm để tiếp tục mua sắm!</p>
			<Link
				href={'/buyer/products'}
				className="mt-4 text-green-500 hover:underline"
			>
				Đi tới trang mua sắm
			</Link>
		</div>
	);
};

async function CartMe() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;

	const res = await cartRequest.getCartMe(sessionToken as string);

	return (
		<div className="flex flex-col justify-center items-center w-1/2 mx-auto mt-5">
			{res.payload.data.length === 0 && <EmptyCartMessage />}
			{res.payload.data.length > 0 &&
				res.payload.data.map((item: CartType) => (
					<CartGroupShop key={item.shop.id} data={item} />
				))}
		</div>
	);
}

export default CartMe;
