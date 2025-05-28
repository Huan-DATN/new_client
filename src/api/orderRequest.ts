import http from '../lib/http';
import { MessageResType } from '../schemaValidations/common.schema';
import {
	CheckoutOrderResType,
	OrderDetailResType,
	OrderListResType,
} from '../schemaValidations/response/order';
import { PlanOrderBodyType } from '../schemaValidations/response/plan-order';

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
		options: {
			page?: number;
			limit?: number;
			search?: string;
			status?: string;
			shopId?: string;
		} = {}
	) => {
		const { page, limit, search, status, shopId } = options;
		let url = `/order`;
		const params = new URLSearchParams();

		if (page) {
			params.append('page', page.toString());
		}

		if (limit) {
			params.append('limit', limit.toString());
		}

		if (search) {
			params.append('search', search);
		}

		if (status) {
			params.append('status', status);
		}

		if (shopId) {
			params.append('shopId', shopId);
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
	createPlan: (
		sessionToken: string,
		shopId: number,
		body: PlanOrderBodyType
	) => {
		return http.post<MessageResType>(`order/${shopId}/plan`, body, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	updateOrderStatus: (orderId: number, body: { statusId: number }) => {
		return http.put<MessageResType>(`order/${orderId}/status`, body, {});
	},
	completeOrder: (orderId: number) => {
		return http.put<MessageResType>(`order/${orderId}/complete`, {}, {});
	},
};

export default orderRequest;
