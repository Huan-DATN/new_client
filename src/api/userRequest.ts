import http from '../lib/http';
import { UpdateBuyerMeBodyType } from '../schemaValidations/request/account';
import { AccountResType } from '../schemaValidations/response/account';

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
};

export default userRequest;
