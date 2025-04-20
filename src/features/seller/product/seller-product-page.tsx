import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ProductsList from './products-list';

async function SellerProductPage() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	return (
		<div className="flex flex-col m-5">
			<div className="flex flex-row justify-between items-center">
				<h1>Table </h1>
				<Link
					href={'/seller/product/add'}
					className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
				>
					Thêm
				</Link>
			</div>

			<ProductsList sessionToken={sessionToken} />
		</div>
	);
}

export default SellerProductPage;
