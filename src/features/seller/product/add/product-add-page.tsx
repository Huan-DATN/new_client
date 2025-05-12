import commonRequest from '@/api/commonRequest';
import { ArrowLeft, Package } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ProductAddForm from './product-add-form';

async function ProductAddPage() {
	const categoriesRes = await commonRequest.getAllCategories();
	const groupProductRes = await commonRequest.getAllGroupProducts();
	const citiesRes = await commonRequest.getAllCities();
	const sessionToken = (await cookies()).get('sessionToken')?.value;

	if (!sessionToken) {
		redirect('/auth/login');
	}

	const { categories, groupProducts, cities } = {
		categories: categoriesRes.payload.data,
		groupProducts: groupProductRes.payload.data,
		cities: citiesRes.payload.data,
	};

	return (
		<div className="max-w-7xl mx-auto p-4 md:p-6">
			<div className="mb-6">
				<Link href="/seller/product" className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
					<ArrowLeft className="h-4 w-4 mr-1" />
					Quay lại danh sách sản phẩm
				</Link>

				<div className="flex items-center mb-2">
					<div className="p-2 rounded-full bg-primary/10 mr-3">
						<Package className="h-6 w-6 text-primary" />
					</div>
					<h1 className="text-2xl font-bold">Thêm sản phẩm mới</h1>
				</div>
				<p className="text-gray-500 ml-12">
					Nhập thông tin chi tiết về sản phẩm bạn muốn thêm vào cửa hàng
				</p>
			</div>

			<ProductAddForm
				categoriesData={categories}
				groupProductsData={groupProducts}
				citiesData={cities}
				sessionToken={sessionToken}
			/>
		</div>
	);
}

export default ProductAddPage;
