import { Separator } from '@/components/ui/separator';
import { Store } from 'lucide-react';
import ShopsFilter from './shops-filter';
import ShopsGridSection from './shops-grid-section';

function ShopsList() {
	return (
		<div className="container mx-auto py-8 px-4 max-w-7xl">
			<div className="flex items-center gap-3 mb-6">
				<Store className="text-primary" size={28} />
				<h1 className="text-2xl font-bold">Khám phá cửa hàng</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				{/* Filter Sidebar */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-lg border p-4 sticky top-6">
						<h2 className="text-lg font-semibold mb-4">Bộ lọc</h2>
						<Separator className="mb-4" />
						<ShopsFilter />
					</div>
				</div>

				{/* Main Content */}
				<div className="lg:col-span-3">
					<ShopsGridSection />
				</div>
			</div>
		</div>
	);
}

export default ShopsList;
