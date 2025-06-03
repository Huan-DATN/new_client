import { Filter } from 'lucide-react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../components/ui/select';

function FilterComboBox({
	isActiveFilter,
	handleFilterChange,
}: {
	isActiveFilter: string;
	handleFilterChange: (value: string) => void;
}) {
	return (
		<Select value={isActiveFilter} onValueChange={handleFilterChange}>
			<SelectTrigger className="w-[180px]">
				<Filter className="w-4 h-4 mr-2" />
				<SelectValue placeholder="Trạng thái" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">Tất cả</SelectItem>
				<SelectItem value="true">Hoạt động</SelectItem>
				<SelectItem value="false">Không hoạt động</SelectItem>
			</SelectContent>
		</Select>
	);
}

export default FilterComboBox;
