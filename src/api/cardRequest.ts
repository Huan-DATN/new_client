import http from '@/lib/http';
import {
	CreateCardType,
	UpdateCardType,
} from '@/schemaValidations/request/card';
import {
	CardDetailResponseType,
	CardListResponseType,
	CardResponseType,
} from '@/schemaValidations/response/card';
import { MessageResType } from '../schemaValidations/common.schema';

const cardRequest = {
	createCard: (sessionToken: string, body: CreateCardType) =>
		http.post<{ data: CardResponseType; message: string }>('/cards', body, {
			headers: { Authorization: `Bearer ${sessionToken}` },
		}),

	getUserCards: (sessionToken: string) =>
		http.get<CardListResponseType>('/cards/me', {
			headers: { Authorization: `Bearer ${sessionToken}` },
		}),

	getCardById: (sessionToken: string, id: number) =>
		http.get<CardDetailResponseType>(`/cards/${id}`, {
			headers: { Authorization: `Bearer ${sessionToken}` },
		}),

	updateCard: (sessionToken: string, id: number, body: UpdateCardType) =>
		http.put<{ data: CardResponseType; message: string }>(
			`/cards/${id}`,
			body,
			{
				headers: { Authorization: `Bearer ${sessionToken}` },
			}
		),

	deleteCard: (sessionToken: string, id: number) =>
		http.delete<MessageResType>(`/cards/${id}`, {
			headers: { Authorization: `Bearer ${sessionToken}` },
		}),
};

export default cardRequest;
