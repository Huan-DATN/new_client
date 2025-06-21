'use client';
import _ from 'lodash';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

function InputSearch() {
	const router = useRouter();

	const handleInputChange = (name: string) => {
		const newParams = new URLSearchParams(window.location.search);
		if (newParams.get('page')) {
			newParams.delete('page');
		}

		if (name) {
			newParams.set('name', name);
		} else {
			newParams.delete('name');
		}

		router.push(`/seller/product?${newParams.toString()}`);
	};

	const debouncedOnChange = _.debounce(handleInputChange, 1000);

	return (
		<>
			<Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
			<input
				type="text"
				placeholder="Tìm kiếm sản phẩm..."
				className="pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-[250px]"
				onChange={(e) => {
					debouncedOnChange(e.target.value);
				}}
			/>
		</>
	);
}

export default InputSearch;
