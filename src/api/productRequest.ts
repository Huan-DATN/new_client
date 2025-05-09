import { PaginationReqType } from '@/schemaValidations/common.schema';
import { SearchProductQueryType } from '@/schemaValidations/request/product';
import {
	ProductListResType,
	ProductResType,
} from '@/schemaValidations/response/product';
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
	getDetail: (id: number) => {
		return http.get<ProductResType>(`/products/${id}`);
	},
	getListByShopId: (id: number, { page, limit }: PaginationReqType) => {
		let url = `/products/shop/${id}`;
		const params = new URLSearchParams();

		if (page) {
			params.append('page', page.toString());
		}

		if (limit) {
			params.append('limit', limit.toString());
		}

		if (params.toString()) {
			url += `?${params.toString()}`;
		}
		return http.get<ProductListResType>(url);
	},
	getListByMe: (sessionToken: string, { page, limit }: PaginationReqType) => {
		let url = `/products/me`;
		const params = new URLSearchParams();

		if (page) {
			params.append('page', page.toString());
		}

		if (limit) {
			params.append('limit', limit.toString());
		}

		if (params.toString()) {
			url += `?${params.toString()}`;
		}
		return http.get<ProductListResType>(url, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	create: (sessionToken: string, body: any) => {
		return http.post<ProductResType>(`/products`, body, {
			headers: {
				sessionToken,
			},
		});
	},
};

export default productRequest;
