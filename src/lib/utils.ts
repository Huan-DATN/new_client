import { toast } from '@/hooks/use-toast';
import { EntityError } from '@/lib/http';
import { TokenPayload } from '@/types/jwt.types';
import { clsx, type ClassValue } from 'clsx';
import { jwtDecode } from 'jwt-decode';
import { UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { OrderStatusEnum } from '../constants/orderStatusEnum';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Tremor focusInput [v0.0.2]

export const focusInput = [
	// base
	'focus:ring-2',
	// ring color
	'focus:ring-blue-200 dark:focus:ring-blue-700/30',
	// border color
	'focus:border-blue-500 dark:focus:border-blue-700',
];

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
	// base
	'outline outline-offset-2 outline-0 focus-visible:outline-2',
	// outline color
	'outline-blue-500 dark:outline-blue-500',
];

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
	// base
	'ring-2',
	// border color
	'border-red-500 dark:border-red-700',
	// ring color
	'ring-red-200 dark:ring-red-700/30',
];

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

export const getDateFormat = (date: Date | string) => {
	const dateObj = new Date(date);
	return new Intl.DateTimeFormat('vi-VN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(dateObj);
};

export const checkCompletedOrder = (orderStatus: any[]) => {
	const completedStatus = orderStatus.find(
		(item: any) => item.status.type === OrderStatusEnum.DELIVERED
	);
	return completedStatus ? true : false;
};

export const getLastestActiveStatus = (orderStatus: any[]) => {
	const activeStatus = orderStatus.filter((item: any) => item.isActive);

	if (activeStatus.length === 0) {
		return {
			type: OrderStatusEnum.PENDING,
			name: 'PENDING',
		};
	}

	const latestActiveStatus = activeStatus[activeStatus.length - 1].status;
	return latestActiveStatus;
};
