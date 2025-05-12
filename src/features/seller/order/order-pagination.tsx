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

function OrdersPagination({ totalPages }: { totalPages: number }) {
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get('page') || '1');

	// Create URL with updated page parameter
	const createPageURL = (pageNumber: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', pageNumber.toString());
		return `?${params.toString()}`;
	};

	// Generate page numbers to display with ellipsis for large ranges
	const getPageNumbers = () => {
		const pageNumbers: (number | 'ellipsis')[] = [];

		if (totalPages <= 7) {
			// Less than 7 pages, show all
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
		} else {
			// More than 7 pages, show with ellipsis
			pageNumbers.push(1);

			if (currentPage > 3) {
				pageNumbers.push('ellipsis');
			}

			// Show current page and those around it
			const start = Math.max(2, currentPage - 1);
			const end = Math.min(totalPages - 1, currentPage + 1);

			for (let i = start; i <= end; i++) {
				pageNumbers.push(i);
			}

			if (currentPage < totalPages - 2) {
				pageNumbers.push('ellipsis');
			}

			pageNumbers.push(totalPages);
		}

		return pageNumbers;
	};

	if (totalPages <= 1) {
		return null;
	}

	return (
		<Pagination>
			<PaginationContent>
				{/* Previous button */}
				<PaginationItem>
					<PaginationPrevious
						href={createPageURL(Math.max(1, currentPage - 1))}
						aria-disabled={currentPage === 1}
						className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
					/>
				</PaginationItem>

				{/* Page numbers */}
				{getPageNumbers().map((page, i) => (
					page === 'ellipsis' ? (
						<PaginationItem key={`ellipsis-${i}`}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={page}>
							<PaginationLink
								href={createPageURL(page)}
								isActive={page === currentPage}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					)
				))}

				{/* Next button */}
				<PaginationItem>
					<PaginationNext
						href={createPageURL(Math.min(totalPages, currentPage + 1))}
						aria-disabled={currentPage === totalPages}
						className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

export default OrdersPagination;
