import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import commonRequest from '../../../../../api/commonRequest';
import productRequest from '../../../../../api/productRequest';
import ProductUpdateForm from './product-update-form';

async function EditProductPage({
  id
}: {
  id: number
}) {
  const sessionToken = (await cookies()).get('sessionToken')?.value;

  if (!sessionToken) {
      redirect('/auth/login');
  }

  const response = await productRequest.getDetail(id);
  const categoriesResponse = await commonRequest.getAllCategories();
  const groupProductsResponse = await commonRequest.getAllGroupProducts();
  const citiesResponse = await commonRequest.getAllCities();

  return <ProductUpdateForm product={response.payload.data} categoriesData={categoriesResponse.payload.data} groupProductsData={groupProductsResponse.payload.data} citiesData={citiesResponse.payload.data} />;

}

export default EditProductPage
