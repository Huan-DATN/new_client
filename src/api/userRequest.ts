import http from '../lib/http';
import { UpdateBuyerMeBodyType } from '../schemaValidations/request/account';
import { AccountResType } from '../schemaValidations/response/account';
import { ShopsListResType } from '../schemaValidations/response/user';

const userRequest = {
	getMe: (sessionToken: string) => {
		return http.get<AccountResType>(`/user/me`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	updateMe: (id: number, data: UpdateBuyerMeBodyType) => {
		return http.put<AccountResType>(`/user/${id}`, data);
	},
	getActiveShops: (
		{ page, limit = 10 }: { page: number; limit?: number },
		isActive: boolean = true
	) => {
		let url = `/user/shops`;
		const params = new URLSearchParams();

		if (page) {
			params.append('page', page.toString());
		}

		if (limit) {
			params.append('limit', limit.toString());
		}

		if (isActive) {
			params.append('isActive', isActive.toString());
		}

		if (params.toString()) {
			url += `?${params.toString()}`;
		}
		console.log('url', url);
		return http.get<ShopsListResType>(url);
	},
};

export default userRequest;
