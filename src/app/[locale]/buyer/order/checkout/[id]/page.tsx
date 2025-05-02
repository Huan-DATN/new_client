import CheckoutPage from '@/features/buyer/order/checkout/checkout-page';

function Page({ params }: { params: { id: number } }) {
	return <CheckoutPage id={params.id} />;
}

export default Page;
