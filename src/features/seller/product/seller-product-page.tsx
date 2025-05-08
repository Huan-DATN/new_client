import { Package, PlusCircle } from 'lucide-react';
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
		<div className="max-w-7xl mx-auto p-4 md:p-6">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-900 flex items-center">
						<Package className="mr-2 h-6 w-6 text-green-600" />
						Quản lý sản phẩm
					</h1>
					<p className="text-gray-500 mt-1">
						Quản lý các sản phẩm của cửa hàng và theo dõi trạng thái kinh doanh
					</p>
				</div>

				<Link
					href={'/seller/product/add'}
					className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
				>
					<PlusCircle className="mr-2 h-4 w-4" />
					Thêm sản phẩm mới
				</Link>
			</div>

			<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
				<div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
					<h2 className="font-medium text-gray-700">Danh sách sản phẩm</h2>
				</div>
				<div className="p-4">
					<ProductsList sessionToken={sessionToken} />
				</div>
			</div>
		</div>
	);
}

export default SellerProductPage;
