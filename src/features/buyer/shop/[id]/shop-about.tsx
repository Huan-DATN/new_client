import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { ShopResType } from '../../../../schemaValidations/response/user';

function ShopAbout({ data }: { data: ShopResType['data'] }) {
	return (
		<div className="bg-white rounded-lg shadow-md p-6 space-y-6">
			<div className="flex items-center gap-4">
				<Image
					src={data.image?.publicUrl ?? 'https://placehold.co/100x100/png'}
					alt={data.shopName}
					width={100}
					height={100}
					className="rounded-full object-cover border-2 border-gray-200"
				/>
				<div>
					<h1 className="text-2xl font-bold text-gray-800">{data.shopName}</h1>
				</div>
			</div>

			<div className="grid gap-4">
				<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
					<Phone className="w-5 h-5 text-blue-600" />
					<p className="text-gray-700">{data.phone}</p>
				</div>

				<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
					<Mail className="w-5 h-5 text-blue-600" />
					<p className="text-gray-700">{data.email}</p>
				</div>

				<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
					<MapPin className="w-5 h-5 text-blue-600" />
					<p className="text-gray-700">{data.address}</p>
				</div>
			</div>
		</div>
	);
}

export default ShopAbout;
