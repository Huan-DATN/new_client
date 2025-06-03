'use client';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '../../../components/ui/input';

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

		router.push(`/admin/category?${newParams.toString()}`);
	};

	return (
		<div className="relative flex-1 w-full">
			<Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
			<Input
				type="text"
				placeholder="Tìm kiếm danh mục..."
				className="pl-9"
				onChange={(e) => {
					handleInputChange(e.target.value);
				}}
			/>
		</div>
	);
}

export default InputSearch;
