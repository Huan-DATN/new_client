'use client';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';

function ProductsPagination({ totalPages }: { totalPages: number }) {
	// No pagination needed if there's only one page
	if (totalPages <= 1) return null;

	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get('page') || 1);

	const getURLForPage = (page: number) => {
		const params = new URLSearchParams();
		searchParams.forEach((value, key) => {
			params.append(key, value);
		});
		params.set('page', page.toString());
		return `?${params.toString()}`;
	};

	// Create array of page numbers to display
	const getPageNumbers = () => {
		const pages: (number | 'ellipsis')[] = [];

		// Always show first page
		pages.push(1);

		// Calculate range of pages to show around current page
		const rangeStart = Math.max(2, currentPage - 1);
		const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

		// Add ellipsis if there's a gap between 1 and rangeStart
		if (rangeStart > 2) {
			pages.push('ellipsis');
		}

		// Add pages in the range
		for (let i = rangeStart; i <= rangeEnd; i++) {
			pages.push(i);
		}

		// Add ellipsis if there's a gap between rangeEnd and totalPages
		if (rangeEnd < totalPages - 1) {
			pages.push('ellipsis');
		}

		// Always show last page if more than one page
		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<Pagination className="justify-center my-8">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={currentPage > 1 ? getURLForPage(currentPage - 1) : '#'}
						className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
					/>
				</PaginationItem>

				{pageNumbers.map((page, index) => (
					page === 'ellipsis' ? (
						<PaginationItem key={`ellipsis-${index}`}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={page}>
							<PaginationLink
								href={getURLForPage(page)}
								isActive={page === currentPage}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					)
				))}

				<PaginationItem>
					<PaginationNext
						href={currentPage < totalPages ? getURLForPage(currentPage + 1) : '#'}
						className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

export default ProductsPagination;
