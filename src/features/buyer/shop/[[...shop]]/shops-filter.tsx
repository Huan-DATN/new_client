'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

function ShopsFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchTerm, setSearchTerm] = useState('');
	const [minRating, setMinRating] = useState([3]);

	// Get existing params to preserve them when changing filters
	const handleFilter = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(key, value);
		// Reset to page 1 when filter changes
		params.set('page', '1');
		router.push(`?${params.toString()}`);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		handleFilter('search', searchTerm);
	};

	const handleRatingChange = (values: number[]) => {
		setMinRating(values);
		handleFilter('rating', values[0].toString());
	};

	// Example categories - replace with actual data from API
	const categories = [
		{ id: 1, name: 'Thời trang' },
		{ id: 2, name: 'Điện tử' },
		{ id: 3, name: 'Gia dụng' },
		{ id: 4, name: 'Thực phẩm' },
		{ id: 5, name: 'Mỹ phẩm' },
	];

	return (
		<div className="space-y-6">
			{/* Search */}
			<form onSubmit={handleSearch} className="space-y-2">
				<Label htmlFor="search" className="text-sm font-medium">
					Tìm kiếm cửa hàng
				</Label>
				<div className="flex gap-2">
					<Input
						id="search"
						placeholder="Tên cửa hàng..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Button type="submit" size="icon" variant="outline">
						<Search className="h-4 w-4" />
					</Button>
				</div>
			</form>

			<Button
				variant="outline"
				className="w-full"
				onClick={() => router.push('/buyer/shop')}
			>
				Xóa bộ lọc
			</Button>
		</div>
	);
}

export default ShopsFilter;
