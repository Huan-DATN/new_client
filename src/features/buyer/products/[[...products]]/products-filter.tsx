import commonRequest from '@/api/commonRequest';
import CityFilter from './city-filter';

async function ProductsFilter() {
	const res = await commonRequest.getAllCities();
	const cities = res.payload.data;

	return (
		<div>
			<h3 className="text-center text-green-700 font-bold mt-5">
				Bộ lọc sản phẩm
			</h3>

			<div className="flex flex-col gap-2 mt-5">
				<h4 className="text-green-700 font-bold">Thành phố</h4>
				<CityFilter data={cities} />
			</div>

			<div className="flex flex-col gap-2 mt-5">
				<h4 className="text-green-700 font-bold">Giá tiền</h4>
			</div>
		</div>
	);
}

export default ProductsFilter;
