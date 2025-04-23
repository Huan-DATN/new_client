import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, ShoppingCart, Sprout } from 'lucide-react';

function ShopInfo({ data }: { data: any }) {
	return (
		<div className="flex flex-col max-h-fit w-1/6 border border-gray-300 rounded-lg shadow-lg p-4 mb-4">
			<div className="flex flex-row gap-3 mt-5 items-center justify-center">
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div>
					<h2 className="text-lg font-semibold">Tên shop</h2>
					<p className="text-sm text-gray-500">Đánh giá: 4,5 (100)</p>
				</div>
			</div>
			<div className="flex flex-col mt-4">
				<div className="flex items-center gap-2">
					<Sprout />
					<p className="text-sm text-gray-500">{20} sản phẩm</p>
				</div>
				<div className="flex items-center gap-2">
					<ShoppingCart />
					<p className="text-sm text-gray-500">{300} lượt bán</p>
				</div>
				<div className="flex gap-2">
					<MapPin className="min-w-[24px]" />
					<p className="text-sm text-gray-500">
						54 Nguyễn Thái Học, Phường 7, Quận 10, TP.HCM
					</p>
				</div>
			</div>
		</div>
	);
}

export default ShopInfo;
