import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShopsListResType } from '@/schemaValidations/response/user';
import { MapPin, Package, Star, Store } from 'lucide-react';
import Link from 'next/link';

function ShopCard({
	data,
	viewMode = 'grid',
}: {
	data: ShopsListResType['data'][number];
	viewMode?: 'grid' | 'compact';
}) {
	// Placeholder for rating until API provides it
	const rating = 4.5;

	if (viewMode === 'compact') {
		return (
			<Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
				<CardContent className="p-0">
					<Link
						href={`/buyer/shop/${data.id}`}
						className="flex items-center gap-4 p-4"
					>
						<Avatar className="h-12 w-12 border">
							{data.image ? (
								<AvatarImage src={data.image.publicUrl} alt={data.shopName} />
							) : (
								<AvatarFallback>
									<Store className="h-6 w-6" />
								</AvatarFallback>
							)}
						</Avatar>

						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2">
								<h3 className="font-medium truncate">{data.shopName}</h3>
								<Badge
									variant="outline"
									className="hidden sm:inline-flex text-xs"
								>
									<Package className="mr-1 h-3 w-3" /> {data.productsTotal} sản
									phẩm
								</Badge>
							</div>

							<div className="flex items-center text-sm text-gray-500">
								<MapPin className="mr-1 h-3 w-3 shrink-0" />
								<span className="truncate">
									{data.address || 'Chưa cập nhật địa chỉ'}
								</span>
							</div>
						</div>

						<div className="flex items-center text-yellow-500">
							<Star className="h-4 w-4 fill-current" />
							<span className="ml-1 mr-1 text-sm font-medium">{rating}</span>
							<span className="text-gray-400 text-xs">(120)</span>
						</div>
					</Link>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
			<div className="relative h-32 bg-gradient-to-r from-primary/5 to-primary/10">
				<div className="absolute -bottom-5 left-4">
					<Avatar className="h-20 w-20 border-4 border-white shadow-md">
						{data.image ? (
							<AvatarImage src={data.image.publicUrl} alt={data.shopName} />
						) : (
							<AvatarFallback className="bg-primary/10 text-primary">
								<Store className="h-8 w-8" />
							</AvatarFallback>
						)}
					</Avatar>
				</div>
			</div>

			<CardContent className="pt-12 p-4">
				<div className="flex justify-between items-start mb-4">
					<div>
						<h3 className="font-semibold text-lg truncate">{data.shopName}</h3>
						<div className="flex items-center text-yellow-500 gap-1">
							<Star className="h-4 w-4 fill-current" />
							<span className="text-sm font-medium">{rating}</span>
							<span className="text-gray-400 text-xs">(120 đánh giá)</span>
						</div>
					</div>

					<Badge variant="outline" className="flex items-center">
						<Package className="mr-1 h-3 w-3" /> {data.productsTotal}
					</Badge>
				</div>

				<div className="flex gap-2 text-sm text-gray-500 mb-4">
					<MapPin className="h-4 w-4 shrink-0 mt-0.5" />
					<p className="line-clamp-2">
						{data.address || 'Chưa cập nhật địa chỉ'}
					</p>
				</div>

				<Button asChild className="w-full" variant="outline">
					<Link href={`/buyer/shop/${data.id}`}>Xem cửa hàng</Link>
				</Button>
			</CardContent>
		</Card>
	);
}

export default ShopCard;
