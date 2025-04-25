import CartRemoveItem from '@/features/buyer/cart/remove/item/cart-remove-item';

function Page({ params }: { params: { id: number } }) {
	return <CartRemoveItem id={params.id} />;
}

export default Page;
