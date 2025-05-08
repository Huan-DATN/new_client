import { AccountResType } from '@/schemaValidations/response/account';

function MeInfo({ data }: { data: AccountResType['data'] }) {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
					<div className="flex items-center mb-2">
						<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
								<circle cx="12" cy="7" r="4"></circle>
							</svg>
						</div>
						<h3 className="font-medium text-gray-800">Thông tin cá nhân</h3>
					</div>
					<div className="pl-11">
						<p className="text-sm text-gray-600 mb-1">Họ tên:</p>
						<p className="font-medium text-gray-900">
							{data.firstName} {data.lastName}
						</p>
					</div>
				</div>

				<div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
					<div className="flex items-center mb-2">
						<div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
								<polyline points="22,6 12,13 2,6"></polyline>
							</svg>
						</div>
						<h3 className="font-medium text-gray-800">Liên hệ</h3>
					</div>
					<div className="pl-11">
						<p className="text-sm text-gray-600 mb-1">Email:</p>
						<p className="font-medium text-gray-900">{data.email}</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
					<div className="flex items-center mb-2">
						<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
							</svg>
						</div>
						<h3 className="font-medium text-gray-800">Số điện thoại</h3>
					</div>
					<div className="pl-11">
						<p className="font-medium text-gray-900">{data.phone}</p>
					</div>
				</div>

				<div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
					<div className="flex items-center mb-2">
						<div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
								<circle cx="12" cy="10" r="3"></circle>
							</svg>
						</div>
						<h3 className="font-medium text-gray-800">Địa chỉ giao hàng</h3>
					</div>
					<div className="pl-11">
						<p className="font-medium text-gray-900 break-words">{data.address}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MeInfo;
