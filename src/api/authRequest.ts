import http from '@/lib/http';
import {
	LoginBodyType,
	LoginResType,
	RegisterResType,
	SlideSessionResType,
	UserRegisterBodyType,
} from '@/schemaValidations/auth.schema';
import { MessageResType } from '@/schemaValidations/common.schema';
import { SellerRegisterBodyType } from '@/schemaValidations/request/register';
const authRequest = {
	login: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
	sellerRegister: (body: SellerRegisterBodyType) =>
		http.post<RegisterResType>('/auth/register', body),
	userRegister: (body: UserRegisterBodyType) =>
		http.post<RegisterResType>('/auth/register', body),
	auth: (body: { sessionToken: string; expiresAt: string }) =>
		http.post('/api/auth', body, { baseUrl: '' }),
	logoutFromNextServerToServer: (sessionToken: string) =>
		http.post<MessageResType>(
			'/auth/logout',
			{},
			{
				headers: { Authorization: `Bearer ${sessionToken}` },
			}
		),
	logoutFromNextClientToNextServer: (
		force?: boolean | undefined,
		signal?: AbortSignal
	) =>
		http.post(
			'api/auth/logout',
			{
				force,
			},
			{
				baseUrl: '',
			}
		),
	slideSessionFromNextServerToServer: (sessionToken: string) =>
		http.post<SlideSessionResType>(
			'/auth/slide-session',
			{},
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
			}
		),
	slideSessionFromNextClientToNextServer: () =>
		http.post<SlideSessionResType>(
			'/api/auth/slide-session',
			{},
			{ baseUrl: '' }
		),
	register: (body: UserRegisterBodyType | SellerRegisterBodyType) =>
		http.post<RegisterResType>('/auth/register', body),
};

export default authRequest;
