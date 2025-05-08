function ShopInfo({ data, className }: { data: any; className?: string }) {
	if (!data) {
		return (
			<div className={`p-6 bg-red-50 rounded-lg border border-red-200 ${className}`}>
				<div className="flex items-center">
					<div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
						<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
					</div>
					<div className="ml-3">
						<h3 className="text-lg font-medium text-red-800">Thông tin cửa hàng không khả dụng</h3>
						<div className="mt-2 text-red-700 text-sm">
							<p>Vui lòng kiểm tra lại thông tin hoặc liên hệ với cửa hàng.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
				<div className="flex items-center mb-3">
					<div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
							<polyline points="9 22 9 12 15 12 15 22"></polyline>
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-800">{data.shopName}</h3>
				</div>

				<div className="ml-13 space-y-3">
					<div className="flex items-start mt-3">
						<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 flex-shrink-0">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
								<circle cx="12" cy="10" r="3"></circle>
							</svg>
						</div>
						<div>
							<p className="text-sm text-gray-600 mb-1">Địa chỉ cửa hàng:</p>
							<p className="font-medium text-gray-900">{data.address}</p>
						</div>
					</div>

					<div className="flex items-center">
						<div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
							</svg>
						</div>
						<div>
							<p className="text-sm text-gray-600 mb-1">Số điện thoại:</p>
							<p className="font-medium text-gray-900">{data.phone}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShopInfo;
