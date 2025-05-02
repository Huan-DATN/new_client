import http from '../lib/http';
import { MessageResType } from '../schemaValidations/common.schema';
import {
	CheckoutOrderResType,
	OrderDetailResType,
	OrderListResType,
} from '../schemaValidations/response/order';

const orderRequest = {
	checkout: (sessionToken: string, shopId: number) => {
		return http.get<CheckoutOrderResType>(`order/${shopId}/checkout`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	createOrder: (sessionToken: string, shopId: number) => {
		return http.post<MessageResType>(
			`order/${shopId}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
			}
		);
	},
	getAllOrders: (
		sessionToken: string,
		{ page, limit }: { page?: number; limit?: number }
	) => {
		let url = `/order`;
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

		return http.get<OrderListResType>(url, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	getOrderDetail: (orderId: number) => {
		return http.get<OrderDetailResType>(`order/${orderId}`, {});
	},
};

export default orderRequest;
