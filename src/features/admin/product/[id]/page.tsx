import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProductDetailPage from './product-detail-page';

export default async function ProductPage({
	params,
}: {
	params: { id: number };
}) {
	const sessionToken = (await cookies()).get('sessionToken')?.value;

	if (!sessionToken) {
		redirect('/auth/login');
	}

	return <ProductDetailPage sessionToken={sessionToken} id={params.id} />;
}
