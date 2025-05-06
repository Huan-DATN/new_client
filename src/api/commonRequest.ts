import http from '../lib/http';
import {
	CategoryListResType,
	CityListResType,
	GroupProductsListResType,
	StatusListResType,
} from '../schemaValidations/response/common';

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
};

export default commonRequest;
