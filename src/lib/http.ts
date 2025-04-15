import envConfig from '@/config';
import { LoginResType } from '@/schemaValidations/auth.schema';
import { redirect } from 'next/navigation';

type CustomRequest = Omit<RequestInit, 'method'> & {
	baseUrl?: string;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
	message: string;
	errors: {
		field: string;
		message: string;
	}[];
};

export class HttpError extends Error {
	status: number;
	payload: {
		message: string;
		[key: string]: any;
	};

	constructor({ status, payload }: { status: number; payload: any }) {
		super(`HTTP Error: ${status}`);
		this.status = status;
		this.payload = payload;
	}
}

export class EntityError extends HttpError {
	status: 422;
	payload: EntityErrorPayload;

	constructor({ status, payload }: { status: 422; payload: any }) {
		super({ status, payload });
		if (status !== ENTITY_ERROR_STATUS) {
			throw new Error('EntityError must have status 422');
		}
		this.status = status;
		this.payload = payload;
	}
}

class SessionToken {
	private token = '';
	private _expiresAt = new Date().toISOString();
	get value() {
		return this.token;
	}
	set value(token: string) {
		// Nếu gọi method này ở Server Comp thì sẽ bị lỗi
		if (typeof window === 'undefined') {
			throw new Error('Cannot set token on server side');
		}
		this.token = token;
	}

	get expiresAt() {
		return this._expiresAt;
	}

	set expiresAt(expiresAt: string) {
		// Nếu gọi method này ở Server Comp thì sẽ bị lỗi
		if (typeof window === 'undefined') {
			throw new Error('Cannot set token on server side');
		}
		this._expiresAt = expiresAt;
	}
}

export const clientSessionToken = new SessionToken();
let clientLogoutRequest: null | Promise<any> = null;

const request = async <Response>(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	url: string,
	options?: CustomRequest | undefined
) => {
	const body = options?.body
		? options.body instanceof FormData
			? options.body
			: JSON.stringify(options.body)
		: undefined;

	const baseHeaders: {
		[key: string]: string;
	} =
		body instanceof FormData
			? {}
			: {
					'Content-Type': 'application/json',
			  };

	if (isClient()) {
		const sessionToken = localStorage.getItem('sessionToken');
		if (sessionToken) {
			baseHeaders.Authorization = `Bearer ${sessionToken}`;
		}
	}

	const baseUrl =
		options?.baseUrl === undefined
			? envConfig.NEXT_PUBLIC_API_ENDPOINT
			: options.baseUrl;

	const fullUrl = url.startsWith('/')
		? `${baseUrl}${url}`
		: `${baseUrl}/${url}`;

	const res = await fetch(fullUrl, {
		...options,
		method,
		headers: {
			...baseHeaders,
			...options?.headers,
		} as any,
		body,
	});

	const payload: Response = await res.json();
	const data = {
		status: res.status,
		payload,
	};

	// Interceptors là nơi chúng ta xử lí lỗi trước khi trả về cho component
	if (!res.ok) {
		if (res.status === ENTITY_ERROR_STATUS) {
			throw new EntityError(
				data as {
					status: 422;
					payload: EntityErrorPayload;
				}
			);
		} else if (res.status === AUTHENTICATION_ERROR_STATUS) {
			if (typeof window !== 'undefined') {
				// LOGOUT FROM CLIENT NEXT JS
				if (!clientLogoutRequest) {
					console.log('client');
					clientLogoutRequest = fetch('/api/auth/logout', {
						method: 'POST',
						body: JSON.stringify({ force: true }),
						headers: {
							...baseHeaders,
						} as any,
					});

					await clientLogoutRequest;
					clientSessionToken.value = '';
					clientSessionToken.expiresAt = new Date().toISOString();
					clientLogoutRequest = null;
					location.href = '/login';
				}
			} else {
				const sessionToken = (options?.headers as any)?.Authorization.split(
					'Bearer '
				)[1];

				redirect(`/logout?sessionToken=${sessionToken}`);
			}
		} else {
			throw new HttpError(data);
		}
	}

	// Interceptors here for set cookies
	if (isClient()) {
		if (
			['auth/login', 'auth/register'].some(
				(item) => item === normalizePath(url)
			)
		) {
			const { token, expiresAt } = (payload as LoginResType).data;
			localStorage.setItem('sessionToken', token);
			localStorage.setItem('sessionTokenExpiresAt', expiresAt);
		} else if ('auth/logout' === normalizePath(url)) {
			localStorage.removeItem('sessionToken');
			localStorage.removeItem('sessionTokenExpiresAt');
		}
	}
	return data;
};

const http = {
	get<Response>(
		url: string,
		options?: Omit<CustomRequest, 'body'> | undefined
	) {
		return request<Response>('GET', url, options);
	},
	post<Response>(
		url: string,
		body: any,
		options?: Omit<CustomRequest, 'body'> | undefined
	) {
		return request<Response>('POST', url, { ...options, body });
	},
	put<Response>(
		url: string,
		body: any,
		options?: Omit<CustomRequest, 'body'> | undefined
	) {
		return request<Response>('PUT', url, { ...options, body });
	},
	delete<Response>(
		url: string,
		body: any,
		options?: Omit<CustomRequest, 'body'> | undefined
	) {
		return request<Response>('DELETE', url, { ...options, body });
	},
};

export default http;

export const isClient = () => typeof window !== 'undefined';
export const normalizePath = (path: string) => {
	return path.startsWith('/') ? path.slice(1) : path;
};
