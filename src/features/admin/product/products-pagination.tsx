'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

type ProductsPaginationProps = {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
};

function ProductsPagination({
	totalPages,
	currentPage,
	onPageChange,
}: ProductsPaginationProps) {
	// Don't show pagination if there's only one page
	if (totalPages <= 1) {
		return null;
	}

	// Generate page numbers to display based on current page
	const getPageNumbers = () => {
		// For small number of pages, show all
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		// For larger sets, implement a sliding window
		const pages = [];

		// Always show first page
		pages.push(1);

		// Add ellipsis if needed
		if (currentPage > 3) {
			pages.push('ellipsis-start');
		}

		// Pages around current page
		const startPage = Math.max(2, currentPage - 1);
		const endPage = Math.min(totalPages - 1, currentPage + 1);

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		// Add ellipsis if needed
		if (currentPage < totalPages - 2) {
			pages.push('ellipsis-end');
		}

		// Always show last page
		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<nav className="flex justify-center items-center">
			<div className="flex items-center gap-1">
				{/* Previous button */}
				<Button
					variant="outline"
					size="icon"
					className="h-9 w-9 rounded-md"
					disabled={currentPage === 1}
					onClick={() => onPageChange(currentPage - 1)}
				>
					<ChevronLeft className="h-4 w-4" />
					<span className="sr-only">Trang trước</span>
				</Button>

				{/* Page numbers */}
				<div className="hidden sm:flex items-center gap-1">
					{pageNumbers.map((page, index) => {
						// Render ellipsis
						if (page === 'ellipsis-start' || page === 'ellipsis-end') {
							return (
								<div key={`${page}-${index}`} className="flex items-center justify-center w-9 h-9">
									<MoreHorizontal className="h-5 w-5 text-gray-400" />
								</div>
							);
						}

						// Render page number
						return (
							<Button
								key={page}
								variant={page === currentPage ? 'default' : 'outline'}
								className="h-9 w-9 rounded-md"
								onClick={() => onPageChange(page as number)}
							>
								{page}
							</Button>
						);
					})}
				</div>

				{/* Mobile simplified pagination */}
				<div className="sm:hidden flex items-center">
					<span className="text-sm text-gray-600 px-2">
						{currentPage} / {totalPages}
					</span>
				</div>

				{/* Next button */}
				<Button
					variant="outline"
					size="icon"
					className="h-9 w-9 rounded-md"
					disabled={currentPage === totalPages}
					onClick={() => onPageChange(currentPage + 1)}
				>
					<ChevronRight className="h-4 w-4" />
					<span className="sr-only">Trang tiếp</span>
				</Button>
			</div>
		</nav>
	);
}

export default ProductsPagination;
