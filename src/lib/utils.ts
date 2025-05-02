import { toast } from '@/hooks/use-toast';
import { EntityError } from '@/lib/http';
import { TokenPayload } from '@/types/jwt.types';
import { clsx, type ClassValue } from 'clsx';
import { jwtDecode } from 'jwt-decode';
import { UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
	error,
	setError,
	duration,
}: {
	error: any;
	setError?: UseFormSetError<any>;
	duration?: number;
}) => {
	if (error instanceof EntityError && setError) {
		error.payload.errors.forEach((item) => {
			setError(item.field, { message: item.message });
		});
	} else {
		toast({
			title: 'Lỗi',
			description: error?.payload?.message ?? 'Lỗi không xác định',
			variant: 'destructive',
			duration: duration ?? 5000,
		});
	}
};

export const decodeTokenJWT = (token: string): TokenPayload => {
	const decoded = jwtDecode<TokenPayload>(token);
	return decoded;
};

export const getRole = (token: string): string => {
	if (!token) {
		return '';
	}
	const decoded = decodeTokenJWT(token);
	return decoded.role;
};

export const getPriceFormat = (price: number) =>
	new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
		price
	);

export const getDateFormat = (date: Date) => {
	return new Intl.DateTimeFormat('vi-VN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(date);
};
