'use client';

import { useCallback, useState } from 'react';

interface ToastOptions {
	title: string;
	description: string;
	variant?: 'default' | 'destructive';
}

let toastFn: ((options: ToastOptions) => void) | null = null;

export function useToast() {
	const [toast, setToast] = useState<ToastOptions | null>(null);

	const showToast = useCallback((options: ToastOptions) => {
		setToast(options);
		// Auto hide after 3 seconds
		setTimeout(() => {
			setToast(null);
		}, 3000);
	}, []);

	// Store the toast function for global access
	if (!toastFn) {
		toastFn = showToast;
	}

	return {
		toast,
		showToast,
	};
}

// Export a global toast function
export const toast = (options: ToastOptions) => {
	if (toastFn) {
		toastFn(options);
	} else {
		console.warn('Toast function not initialized yet');
	}
};
