import cartRequest from '@/api/cartRequest';
import { CartType } from '@/schemaValidations/response/cart';
import { cookies } from 'next/headers';
import CartGroupShop from './cart-group-shop';

async function CartMe() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;

	const res = await cartRequest.getCartMe(sessionToken as string);

	return (
		<div className="flex flex-col justify-center items-center w-1/2 mx-auto mt-5">
			{res.payload.data.map((item: CartType) => (
				<CartGroupShop key={item.shop.id} data={item} />
			))}
		</div>
	);
}

export default CartMe;
