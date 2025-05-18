import { RoleEnum } from '../constants/roleEnum';
import http from '../lib/http';
import { UpdateBuyerMeBodyType } from '../schemaValidations/request/account';
import { AccountResType } from '../schemaValidations/response/account';
import {
	ShopResType,
	ShopsListResType,
	UserListResType,
} from '../schemaValidations/response/user';

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
	getShopById: (id: number) => {
		return http.get<ShopResType>(`/user/${id}`);
	},
	getAllUsers: (
		sessionToken: string,
		isActive: boolean | undefined = undefined,
		role: RoleEnum | undefined = undefined
	) => {
		let url = `/user`;
		const params = new URLSearchParams();

		if (isActive !== undefined) {
			params.append('isActive', isActive.toString());
		}

		if (role !== undefined) {
			params.append('role', role);
		}

		if (params.toString()) {
			url += `?${params.toString()}`;
		}
		return http.get<UserListResType>(url, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
};

export default userRequest;
