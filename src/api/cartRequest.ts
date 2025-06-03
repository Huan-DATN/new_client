import http from '@/lib/http';
import { AddItemToCartBodyType } from '@/schemaValidations/request/cart';
import { CartResType } from '../schemaValidations/response/cart';

const cartRequest = {
	addItemFromNextClientToNextServer: (id: number, body: { quantity: number }) =>
		http.post(`api/cart/add/${id}`, body, {
			baseUrl: '',
		}),
	addItemFromNextServerToServer: (
		sessionToken: string,
		body: AddItemToCartBodyType
	) =>
		http.post(`/cart/add/`, body, {
			headers: { Authorization: `Bearer ${sessionToken}` },
		}),
	getCartMe: (sessionToken: string) =>
		http.get<CartResType>(`/cart`, {
			headers: { Authorization: `Bearer ${sessionToken}` },
		}),
	removeItemFromNextClientToNextServer: (id: number) =>
		http.delete(`/api/cart/${id}`, {
			baseUrl: '',
		}),
	removeItemFromNextServerToServer: (sessionToken: string, id: number) =>
		http.delete(`/cart/${id}`, {
			headers: { Authorization: `Bearer ${sessionToken}` },
		}),
	removeShopFromNextClientToNextServer: (id: number) =>
		http.delete(`/api/cart/shop/${id}`, {
			baseUrl: '',
		}),
	removeShopFromNextServerToServer: (sessionToken: string, id: number) =>
		http.delete(`/cart/shop/${id}`, {
			headers: { Authorization: `Bearer ${sessionToken}` },
		}),
};

export default cartRequest;
