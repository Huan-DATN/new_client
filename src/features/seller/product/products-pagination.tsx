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

interface ProductsPaginationProps {
	totalPages: number;
	currentPage?: number;
	onPageChange?: (page: number) => void;
}

function ProductsPagination({
	totalPages,
	currentPage = 1,
	onPageChange
}: ProductsPaginationProps) {
	// No pagination needed if there's only one page or no pages
	if (totalPages <= 1) return null;

	const handlePageChange = (page: number) => {
		if (onPageChange) {
			onPageChange(page);
		}
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
		<Pagination className="justify-center">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
						onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
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
								className="cursor-pointer"
								onClick={() => handlePageChange(page)}
								isActive={page === currentPage}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					)
				))}

				<PaginationItem>
					<PaginationNext
						className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
						onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

export default ProductsPagination;
