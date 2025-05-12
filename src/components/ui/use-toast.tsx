'use client';

import { useCallback, useState } from 'react';

interface ToastOptions {
	title: string;
	description: string;
	variant?: 'default' | 'destructive';
}

export function useToast() {
	const [toast, setToast] = useState<ToastOptions | null>(null);

	const showToast = useCallback((options: ToastOptions) => {
		setToast(options);
		// Auto hide after 3 seconds
		setTimeout(() => {
			setToast(null);
		}, 3000);
	}, []);

	return {
		toast,
		showToast,
	};
}
