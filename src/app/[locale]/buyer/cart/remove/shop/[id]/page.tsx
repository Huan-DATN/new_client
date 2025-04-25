import CartRemoveShop from '@/features/buyer/cart/remove/shop/cart-remove-shop';

function Page({ params }: { params: { id: number } }) {
	return <CartRemoveShop id={params.id} />;
}

export default Page;
