'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function OrdersPagination({ totalPages }: { totalPages: number }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get('page') || '1');

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};

	// Generate page numbers to display
	const getPageNumbers = () => {
		const pages = [];
		const maxPagesToShow = 5;

		// Always show first page
		pages.push(1);

		// Calculate range around current page
		let startPage = Math.max(2, currentPage - 1);
		let endPage = Math.min(totalPages - 1, currentPage + 1);

		// Adjust to show up to maxPagesToShow pages
		if (startPage > 2) {
			pages.push('...');
		}

		// Add middle pages
		for (let i = startPage; i <= endPage; i++) {
			if (i !== 1 && i !== totalPages) {
				pages.push(i);
			}
		}

		// Add ellipsis if needed
		if (endPage < totalPages - 1) {
			pages.push('...');
		}

		// Always show last page if more than 1 page
		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<div className="flex justify-center items-center gap-1">
			<Button
				variant="outline"
				size="icon"
				onClick={() => router.push(createPageURL(Math.max(1, currentPage - 1)))}
				disabled={currentPage <= 1}
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>

			{pageNumbers.map((page, index) =>
				page === '...' ? (
					<span key={`ellipsis-${index}`} className="px-2">
						...
					</span>
				) : (
					<Button
						key={`page-${page}`}
						variant={currentPage === page ? 'default' : 'outline'}
						size="icon"
						onClick={() => router.push(createPageURL(page))}
						className="w-8 h-8"
					>
						{page}
					</Button>
				)
			)}

			<Button
				variant="outline"
				size="icon"
				onClick={() =>
					router.push(createPageURL(Math.min(totalPages, currentPage + 1)))
				}
				disabled={currentPage >= totalPages}
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);
}

export default OrdersPagination;
