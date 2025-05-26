import {
	CreateCarouselItemRequest,
	UpdateCarouselItemRequest,
} from '@/schemaValidations/request/carousel';
import http from '../lib/http';
import { MessageResType } from '../schemaValidations/common.schema';
import { CarouselListResType } from '../schemaValidations/response/carousel';

export const carouselRequest = {
	getCarousel: async () => {
		return await http.get<CarouselListResType>('/carousels');
	},
	getCarouselAdmin: async (sessionToken: string) => {
		return await http.get<CarouselListResType>(`/carousels/admin`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	createCarousel: async (
		sessionToken: string,
		data: CreateCarouselItemRequest
	) => {
		return await http.post<MessageResType>('/carousels', data, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	updateCarousel: async (
		sessionToken: string,
		id: number,
		data: UpdateCarouselItemRequest
	) => {
		return await http.put<MessageResType>(`/carousels/${id}`, data, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	deleteCarousel: async (sessionToken: string, id: number) => {
		return await http.delete<MessageResType>(`/carousels/${id}`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	toggleCarousel: async (
		sessionToken: string,
		id: number,
		isActive: boolean
	) => {
		return await http.patch<MessageResType>(
			`/carousels/${id}/status`,
			{ isActive },
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
			}
		);
	},
};
