import EditProductPage from '@/features/seller/product/[id]/edit/page';

function Page({params}: {
	params: {
		id: number
	}
}) {
	return <EditProductPage id={params.id} />;
}

export default Page;
