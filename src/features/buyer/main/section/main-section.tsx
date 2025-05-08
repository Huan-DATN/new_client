import commonRequest from '@/api/commonRequest';
import { Button } from '@/components/ui/button';
import ProductSpotlight from '@/features/buyer/main/section/product-spotlight';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import GroupProductCarousel from './group-product-carousel';
import HighlightCarousel from './highlight-carousel';

async function MainSection() {
	const t = await getTranslations('seller.HomePage');
	const res = await commonRequest.getAllGroupProducts();
	const data = res.payload.data;
	return (
		<div className="flex flex-col w-full bg-gray-50">
			{/* Hero Carousel Section */}
			<div className="w-full bg-gradient-to-r from-green-50 to-blue-50 py-6">
				<div className="flex flex-row gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="w-2/3 rounded-xl overflow-hidden shadow-md">
						<HighlightCarousel data={undefined} />
					</div>
					<div className="w-1/3 rounded-xl overflow-hidden shadow-md">
						<HighlightCarousel data={undefined} />
					</div>
				</div>
			</div>

			{/* Categories Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-green-800">Các danh mục</h2>
					<Link href="/buyer/categories">
						<Button variant="ghost" className="text-green-700 font-medium">
							Xem tất cả
						</Button>
					</Link>
				</div>
				<div className="bg-white rounded-xl p-6 shadow-sm">
					<GroupProductCarousel data={data} />
				</div>
			</div>

			{/* Featured Products Section */}
			<div className="bg-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold text-green-800">
							{t('productSpotlight')}
						</h2>
						<Link href="/buyer/products">
							<Button variant="ghost" className="text-green-700 font-medium">
								{t('showMore')}
							</Button>
						</Link>
					</div>
					<ProductSpotlight />
				</div>
			</div>

			{/* Benefits Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h2 className="text-2xl font-bold text-center text-green-800 mb-8">Tại sao chọn chúng tôi?</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<h3 className="text-lg font-medium mb-2">Chất lượng đảm bảo</h3>
						<p className="text-gray-600">Tất cả sản phẩm đều được kiểm duyệt chất lượng trước khi đến tay khách hàng</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h3 className="text-lg font-medium mb-2">Giao hàng nhanh chóng</h3>
						<p className="text-gray-600">Hệ thống giao hàng hiện đại giúp sản phẩm đến tay bạn trong thời gian ngắn nhất</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
							</svg>
						</div>
						<h3 className="text-lg font-medium mb-2">Thanh toán an toàn</h3>
						<p className="text-gray-600">Nhiều phương thức thanh toán đa dạng và bảo mật tuyệt đối</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainSection;
