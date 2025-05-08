'use client';
import { RefreshCw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../../../../components/ui/button';

// Client component for filter reset button
function ClientFilterReset() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	// Check if there are any filter params
	const hasFilters = ['cityId', 'groupProductId', 'minPrice', 'maxPrice', 'rating'].some(
		param => searchParams.has(param)
	);

	const handleReset = () => {
		// Get only the name and page params if they exist
		const params = new URLSearchParams();
		const name = searchParams.get('name');
		const page = searchParams.get('page');

		if (name) params.set('name', name);
		if (page) params.set('page', page);

		// Use replace with scroll: false to prevent the page from scrolling/reloading
		router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
	};

	if (!hasFilters) return null;

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={handleReset}
			className="text-xs h-8 flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100"
		>
			<RefreshCw className="w-3 h-3 mr-1" />
			Đặt lại
		</Button>
	);
}

export default ClientFilterReset;
