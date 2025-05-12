'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

function InputSearch() {
	const [search, setSearch] = useState('');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		// In a real implementation, this would trigger a search after debounce
	};

	return (
		<div className="relative w-full">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
			<Input
				placeholder="Tìm kiếm tài khoản theo tên, email..."
				value={search}
				onChange={handleSearch}
				className="pl-10 pr-4 h-10 w-full"
			/>
		</div>
	);
}

export default InputSearch;
