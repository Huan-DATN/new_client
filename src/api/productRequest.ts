import { PaginationReqType } from '@/schemaValidations/common.schema';
import { SearchProductQueryType } from '@/schemaValidations/request/product';
import { ProductListResType } from '@/schemaValidations/response/product';
import http from '../lib/http';

const productRequest = {
	getList: (
		{ page }: PaginationReqType,
		{ name, cityId, groupProductId }: SearchProductQueryType
	) => {
		let url = `/products`;

		const params = new URLSearchParams();
		if (name) {
			params.append('name', name);
		}

		if (cityId) {
			params.append('cityId', cityId.toString());
		}

		if (groupProductId) {
			params.append('groupProductId', groupProductId.toString());
		}

		if (page) {
			params.append('page', page.toString());
		}
		if (params.toString()) {
			url += `?${params.toString()}`;
		}
		return http.get<ProductListResType>(url);
	},
};

export default productRequest;
