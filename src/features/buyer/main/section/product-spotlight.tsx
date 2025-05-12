import commonRequest from '@/api/commonRequest';
import ProductsGrid from '../../../../components/products-grid';

async function ProductSpotlight() {
	// Fetch featured products
	try {
		const response = await commonRequest.getProductsNewest();
		const { payload } = response;
		return (
			<div className="w-full">
				<div className="bg-white rounded-xl p-6 shadow-sm">
					{payload.data.length > 0 ? (
						<ProductsGrid data={payload.data} col={2} />
					) : (
						<div className="flex flex-col items-center justify-center py-12">
							<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-8 w-8 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-medium text-gray-700 mb-2">
								Chưa có sản phẩm nổi bật
							</h3>
							<p className="text-gray-500 text-center max-w-md">
								Các sản phẩm nổi bật sẽ xuất hiện tại đây. Vui lòng quay lại
								sau.
							</p>
						</div>
					)}
				</div>
			</div>
		);
	} catch (error) {
		console.error('Error fetching products:', error);
		return (
			<div className="w-full">
				<div className="bg-white rounded-xl p-6 shadow-sm">
					<div className="flex flex-col items-center justify-center py-12">
						<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 w-8 text-red-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-medium text-gray-700 mb-2">
							Không thể tải sản phẩm
						</h3>
						<p className="text-gray-500 text-center max-w-md">
							Đã xảy ra lỗi khi tải sản phẩm. Vui lòng làm mới trang hoặc thử
							lại sau.
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductSpotlight;
