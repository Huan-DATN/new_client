import { PaginationReqType } from '@/schemaValidations/common.schema';
import {
	SearchProductQueryType,
	SortProductQueryType,
} from '@/schemaValidations/request/product';
import {
	ProductListResType,
	ProductResType,
} from '@/schemaValidations/response/product';
import http from '../lib/http';

const productRequest = {
	getList: (
		{ page, limit }: PaginationReqType,
		{ name, cityId, groupProductId }: SearchProductQueryType,
		{ minPrice, maxPrice }: SearchProductQueryType
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

		if (limit) {
			params.append('limit', limit.toString());
		}

		if (minPrice) {
			params.append('minPrice', minPrice.toString());
		}

		if (maxPrice) {
			params.append('maxPrice', maxPrice.toString());
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
	getListByMe: (
		sessionToken: string,
		pagination?: PaginationReqType,
		sort?: SortProductQueryType,
		search?: SearchProductQueryType
	) => {
		let url = `/products/me`;
		const params = new URLSearchParams();

		if (pagination) {
			if (pagination.page) {
				params.append('page', pagination.page.toString());
			}

			if (pagination.limit) {
				params.append('limit', pagination.limit.toString());
			}
		}

		if (sort) {
			if (sort.sortBy) {
				params.append('sortBy', sort.sortBy);
			}

			if (sort.sortOrder) {
				params.append('sortOrder', sort.sortOrder);
			}
		}

		if (search) {
			if (search.name) {
				params.append('name', search.name);
			}

			if (search.isActive !== undefined) {
				console.log(search.isActive);
				params.append('isActive', search.isActive.toString());
			}
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
	updateProductActive: (id: number, body: { isActive: boolean }) => {
		return http.patch<ProductResType>(`/products/${id}`, body, {});
	},
	update: (id: number, body: any) => {
		return http.put<ProductResType>(`/products/${id}`, body, {});
	},
	getListByAdmin: (
		sessionToken: string,
		pagination?: PaginationReqType,
		sort?: SortProductQueryType,
		search?: SearchProductQueryType
	) => {
		let url = `/products/admin`;
		const params = new URLSearchParams();

		if (pagination) {
			if (pagination.page) {
				params.append('page', pagination.page.toString());
			}

			if (pagination.limit) {
				params.append('limit', pagination.limit.toString());
			}
		}

		if (sort) {
			if (sort.sortBy) {
				params.append('sortBy', sort.sortBy);
			}

			if (sort.sortOrder) {
				params.append('sortOrder', sort.sortOrder);
			}
		}

		if (search) {
			if (search.name) {
				params.append('name', search.name);
			}

			if (search.isActive !== undefined) {
				params.append('isActive', search.isActive.toString());
			}
		}

		if (params.toString()) {
			url += `?${params.toString()}`;
		}

		console.log(url);
		return http.get<ProductListResType>(url, {
			headers: { Authorization: `Bearer ${sessionToken}` },
		});
	},
	getProductRecommend: (id: number, { limit }: PaginationReqType) => {
		return http.get<ProductListResType>(
			`/products/recommend/${id}?limit=${limit}`
		);
	},
};

export default productRequest;
