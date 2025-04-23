import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShopsListResType } from '@/schemaValidations/response/user';
import { MapPin, Sprout } from 'lucide-react';
import Link from 'next/link';

function ShopCard({ data }: { data: ShopsListResType['data'][number] }) {
	return (
		<Link
			href={`/buyer/shop/${data.id}`}
			className="flex flex-row gap-2 border border-gray-300 rounded-lg shadow-lg p-4 mb-4"
		>
			<Avatar className="flex-shrink-0 my-auto">
				{data.image ? (
					<AvatarImage src={data.image.publicUrl} />
				) : (
					<AvatarImage src="https://github.com/shadcn.png" />
				)}
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>

			<div className="flex flex-col">
				<h2 className="text-lg font-semibold">{data.shopName}</h2>
				<div className="flex items-center gap-2">
					<Sprout />
					<p className="text-sm text-gray-500">{data.productsTotal} sản phẩm</p>
				</div>
				<div className="flex gap-2">
					<MapPin className="min-w-[24px]" />
					<p className="text-sm text-gray-500">
						{data.address || 'Chưa cập nhật địa chỉ'}
					</p>
				</div>
			</div>
		</Link>
	);
}

export default ShopCard;
