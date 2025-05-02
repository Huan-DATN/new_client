import { AccountResType } from '@/schemaValidations/response/account';

function MeInfo({ data }: { data: AccountResType['data'] }) {
	return (
		<section
			className="container mx-auto px-6 py-4 bg-blue-100 border border-blue-300 rounded-lg shadow-lg"
			aria-labelledby="me-info-heading"
		>
			<h2
				id="me-info-heading"
				className="text-lg font-semibold text-blue-800 mb-4"
			>
				Thông tin của tôi
			</h2>
			<ul className="space-y-2">
				<li className="flex items-center">
					<strong className="w-36 text-blue-700">Tên:</strong>
					<span className="text-gray-800">
						{data.firstName} {data.lastName}
					</span>
				</li>
				<li className="flex items-center">
					<strong className="w-36 text-blue-700">Email:</strong>
					<span className="text-gray-800">{data.email}</span>
				</li>
				<li className="flex items-center">
					<strong className="w-36 text-blue-700">Số điện thoại:</strong>
					<span className="text-gray-800">{data.phone}</span>
				</li>
				<li className="flex items-center">
					<strong className="w-36 text-blue-700">Địa chỉ:</strong>
					<span className="text-gray-800">{data.address}</span>
				</li>
			</ul>
		</section>
	);
}

export default MeInfo;
