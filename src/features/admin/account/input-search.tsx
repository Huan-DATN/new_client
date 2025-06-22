'use client';

import { Input } from '@/components/ui/input';
import _ from 'lodash';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

function InputSearch() {
	const router = useRouter();

	const handleInputChange = (search: string) => {
		const newParams = new URLSearchParams(window.location.search);
		if (newParams.get('page')) {
			newParams.delete('page');
		}

		if (search) {
			newParams.set('search', search);
		} else {
			newParams.delete('search');
		}

		router.push(`/admin/account?${newParams.toString()}`);
	};

	const debouncedOnChange = _.debounce(handleInputChange, 1000);

	return (
		<div className="relative w-full">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
			<Input
				placeholder="Tìm kiếm tài khoản theo tên, email..."
				onChange={(e) => debouncedOnChange(e.target.value)}
				className="pl-10 pr-4 h-10 w-full"
			/>
		</div>
	);
}

export default InputSearch;
