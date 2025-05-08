'use client';
import { Check } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

import { useRouter } from 'next/navigation';

// Client component for category filter
function ClientGroupProductFilter({ categories }: { categories: any[] }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const selectedGroupId = searchParams.get('groupProductId');
	const pathname = usePathname();

	const handleCategoryChange = (id: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (id === selectedGroupId) {
			params.delete('groupProductId');
		} else {
			params.set('groupProductId', id);
		}

		// Use replace with scroll: false to prevent the page from scrolling/reloading
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="space-y-1">
			{categories.map((category) => (
				<div
					key={category.id}
					onClick={() => handleCategoryChange(category.id.toString())}
					className={`p-2 rounded-md cursor-pointer flex items-center ${
						selectedGroupId === category.id.toString() ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'
					}`}
				>
					<div className={`w-4 h-4 mr-2 rounded-sm flex items-center justify-center ${
						selectedGroupId === category.id.toString() ? 'bg-green-600 text-white' : 'border border-gray-300'
					}`}>
						{selectedGroupId === category.id.toString() && <Check className="w-3 h-3" />}
					</div>
					<span className="text-sm">{category.name}</span>
				</div>
			))}
		</div>
	);
}

export default ClientGroupProductFilter;
