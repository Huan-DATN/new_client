import ProductDetailPage from '@/features/admin/product/[id]/product-detail-page';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function Page({ params }: { params: { id: number } }) {
	const sessionToken = (await cookies()).get('sessionToken')?.value;

	if (!sessionToken) {
		redirect('/auth/login');
	}

	return <ProductDetailPage sessionToken={sessionToken} id={params.id} />;
}

export default Page;
