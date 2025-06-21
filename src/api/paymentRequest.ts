import http from '../lib/http';
import { MessageResType } from '../schemaValidations/common.schema';
import { PaymentResponseType } from '../schemaValidations/response/payment';

const paymentRequest = {
	createPayment: (
		sessionToken: string,
		data: {
			orderId: number;
			imageId: number;
			amount: number;
		}
	) => {
		return http.post<MessageResType>('payments', data, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},

	getPaymentByOrderId: (sessionToken: string, orderId: number) => {
		return http.get<{ data: PaymentResponseType; message: string }>(
			`payments/order/${orderId}`,
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
			}
		);
	},
};

export default paymentRequest;
