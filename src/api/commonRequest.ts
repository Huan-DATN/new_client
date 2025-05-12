import http from '../lib/http';
import {
	CategoryListResType,
	CityListResType,
	GroupProductsListResType,
	StatusListResType,
} from '../schemaValidations/response/common';
import { ProductListResType } from '../schemaValidations/response/product';

const commonRequest = {
	getAllCities: () => {
		return http.get<CityListResType>('/common/cities');
	},
	getAllGroupProducts: () => {
		return http.get<GroupProductsListResType>('/common/group-products');
	},
	getAllCategories: () => {
		return http.get<CategoryListResType>('/common/categories');
	},
	getAllStatus: () => {
		return http.get<StatusListResType>('/common/status');
	},
	getProductsNewest: (take: number = 10) => {
		return http.get<ProductListResType>(`/common/products/newest?take=${take}`);
	},
};

export default commonRequest;
