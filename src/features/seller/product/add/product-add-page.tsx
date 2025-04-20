import commonRequest from '@/api/commonRequest';
import { cookies } from 'next/headers';
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
		<ProductAddForm
			categoriesData={categories}
			groupProductsData={groupProducts}
			citiesData={cities}
			sessionToken={sessionToken}
		/>
	);
}

export default ProductAddPage;
