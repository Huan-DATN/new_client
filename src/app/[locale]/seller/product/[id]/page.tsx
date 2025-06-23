import ProductDetailPage from '@/features/seller/product/[id]/product-detail-page';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function Page({ params }: { params: { id: string } }) {
	const sessionToken = (await cookies()).get('sessionToken')?.value;

	if (!sessionToken) {
		redirect('/auth/login');
	}

	return (
		<div className="flex flex-col gap-4">
			<ProductDetailPage sessionToken={sessionToken} />
		</div>
	);
}

export default Page;
