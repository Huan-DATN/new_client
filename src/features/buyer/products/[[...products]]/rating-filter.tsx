'use client';
import { Check, Star } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Client component for rating filter
function ClientRatingFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const ratingFilter = searchParams.get('rating') || '';
	const pathname = usePathname();

	const handleRatingChange = (rating: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (rating) {
			params.set('rating', rating);
		} else {
			params.delete('rating');
		}

		// Use replace with scroll: false to prevent the page from scrolling/reloading
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const ratings = [
		{ value: '4', label: '4 sao trở lên' },
		{ value: '3', label: '3 sao trở lên' },
		{ value: '2', label: '2 sao trở lên' },
		{ value: '1', label: '1 sao trở lên' },
	];

	return (
		<div className="space-y-2">
			{ratings.map((item) => (
				<div
					key={item.value}
					className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-50 ${ratingFilter === item.value ? 'bg-green-50' : ''}`}
					onClick={() => handleRatingChange(ratingFilter === item.value ? '' : item.value)}
				>
					<div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${ratingFilter === item.value ? 'bg-green-600 text-white' : 'border border-gray-300'}`}>
						{ratingFilter === item.value && <Check className="w-3 h-3" />}
					</div>
					<div className="flex items-center">
						{Array.from({ length: parseInt(item.value) }).map((_, index) => (
							<Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
						))}
						{Array.from({ length: 5 - parseInt(item.value) }).map((_, index) => (
							<Star key={index + parseInt(item.value)} className="w-4 h-4 text-gray-300" />
						))}
						<span className="ml-2 text-sm">{item.label}</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default ClientRatingFilter;
