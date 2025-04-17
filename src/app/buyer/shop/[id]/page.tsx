import ShopDetail from '@/features/buyer/shop/[id]/shop-detail';

function Page({ params }: { params: { id: number } }) {
	return <ShopDetail id={params.id} />;
}

export default Page;
