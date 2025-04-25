import ProductDetail from '@/features/buyer/products/detail/product-detail';

function Page({ params }: { params: { id: string } }) {
	return <ProductDetail id={params.id} />;
}

export default Page;
