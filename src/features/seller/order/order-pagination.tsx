'use client';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';

function OrdersPagination({ totalPages }: { totalPages: number }) {
	const searchParams = useSearchParams();
	const selectedPage = searchParams.get('page') || 1;

	const getURLSelectPage = (page: number) => {
		const params = new URLSearchParams();
		searchParams.forEach((value, key) => {
			params.append(key, value);
		});
		params.set('page', page.toString());
		return `?${params.toString()}`;
	};

	const getURLSelectNextPage = () => {
		const params = new URLSearchParams();
		searchParams.forEach((value, key) => {
			params.append(key, value);
		});
		params.set('page', (parseInt(selectedPage as any) + 1).toString());
		return `?${params.toString()}`;
	};

	const getURLSelectPreviousPage = () => {
		const params = new URLSearchParams();
		searchParams.forEach((value, key) => {
			params.append(key, value);
		});
		params.set('page', (parseInt(selectedPage as any) - 1).toString());
		return `?${params.toString()}`;
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href={getURLSelectPreviousPage()} />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href={getURLSelectNextPage()} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

export default OrdersPagination;
