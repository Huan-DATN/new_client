function ShopInfo({ data, className }: { data: any; className?: string }) {
	if (!data) {
		return (
			<div
				className={`container flex flex-col mx-auto px-5 py-4 bg-yellow-300 border-2 border-yellow-300 rounded-lg shadow-md ${className}`}
			>
				<p className="text-center text-gray-700">
					Thông tin cửa hàng không khả dụng.
				</p>
			</div>
		);
	}

	return (
		<section
			className="container mx-auto px-6 py-4 bg-yellow-100 border border-yellow-300 rounded-lg shadow-lg"
			aria-labelledby="me-info-heading"
		>
			<h2
				id="me-info-heading"
				className="text-lg font-semibold text-blue-800 mb-4"
			>
				Thông tin của shop
			</h2>
			<ul className="space-y-2">
				<li className="flex items-center">
					<strong className="w-36 text-blue-700">Tên shop:</strong>
					<span className="text-gray-800">{data.shopName}</span>
				</li>
				<li className="flex items-center">
					<strong className="w-36 text-blue-700">Địa chỉ:</strong>
					<span className="text-gray-800">{data.address}</span>
				</li>
				<li className="flex items-center">
					<strong className="w-36 text-blue-700">Số điện thoại:</strong>
					<span className="text-gray-800">{data.phone}</span>
				</li>
			</ul>
		</section>
	);
}

export default ShopInfo;
