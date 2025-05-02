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
	getAllOrders: (sessionToken: string) => {
		return http.get<OrderListResType>('order', {
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
