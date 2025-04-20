import ProductDetail from '@/features/buyer/products/detail/product-detail';

function Page({ params }: { params: { id: string } }) {
	return (
		<div className="flex flex-col gap-4">
			<ProductDetail id={params.id} />
		</div>
	);
}

export default Page;
