import { z } from 'zod';
import http from '../lib/http';
import { PaginationReqType } from '../schemaValidations/common.schema';
import {
	CreateCategoryRequest,
	UpdateCategoryRequest,
} from '../schemaValidations/request/category';
import {
	CategoriesResponse,
	CategoryResponse,
} from '../schemaValidations/response/category';

export const getCategoriesSchema = z.object({
	page: z.string().regex(/^\d+$/).optional().default('1').transform(Number),
	limit: z.string().regex(/^\d+$/).optional().default('10').transform(Number),
	search: z.string().optional().default(''),
	isActive: z
		.string()
		.transform((val) => val === 'true')
		.optional()
		.default('true'),
	sortBy: z.enum(['name', 'createdAt', 'updatedAt']).optional().default('name'),
	sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

const categoryRequest = {
	getAllCategories: (
		search?: { name: string; isActive: boolean },
		pagination?: PaginationReqType,
		sort?: {
			sortBy: string;
			sortOrder: string;
		}
	) => {
		let url = `/category`;
		const params = new URLSearchParams();

		if (pagination) {
			if (pagination.page) {
				params.append('page', pagination.page.toString());
			}

			if (pagination.limit) {
				params.append('limit', pagination.limit.toString());
			}
		}

		if (search) {
			if (search.name) {
				params.append('name', search.name);
			}
			if (search.isActive) {
				params.append('isActive', search.isActive.toString());
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

		if (params.toString()) {
			url += `?${params.toString()}`;
		}

		return http.get<CategoriesResponse>(url);
	},
	getCategory: (id: number) => {
		return http.get<CategoryResponse>(`/category/${id}`);
	},
	createCategory: (sessionToken: string, data: CreateCategoryRequest) => {
		return http.post<CategoryResponse>('/category', data, {
			headers: {
				sessionToken,
			},
		});
	},
	updateCategory: (
		sessionToken: string,
		id: number,
		data: UpdateCategoryRequest
	) => {
		return http.put<CategoryResponse>(`/category/${id}`, data, {
			headers: {
				sessionToken,
			},
		});
	},
	deleteCategory: (sessionToken: string, id: number) => {
		return http.delete<CategoryResponse>(`/category/${id}`, {
			headers: {
				sessionToken,
			},
		});
	},
};

export default categoryRequest;
