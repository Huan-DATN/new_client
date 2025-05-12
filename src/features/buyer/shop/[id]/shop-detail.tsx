import userRequest from '@/api/userRequest';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store } from 'lucide-react';
import { cookies } from 'next/headers';
import ShopAbout from './shop-about';
import ShopInfo from './shop-info';
import ShopProductsSection from './shop-products-section';

async function ShopDetail({ id }: { id: number }) {
	const sessionToken = (await cookies()).get('sessionToken')?.value;

	// In a real implementation, we'd want to fetch shop data here
	// and pass it to child components
	try {
		// Using a mock approach since the actual API method may not exist
		// Replace with the correct API method when available
		const response = await userRequest.getShopById(id);
		const { data, message } = response.payload;
		const shopData = data;

		return (
			<div className="container mx-auto py-8 px-4 max-w-7xl">
				<div className="flex items-center gap-3 mb-6">
					<Store className="text-primary" size={28} />
					<h1 className="text-2xl font-bold">
						{shopData?.shopName || 'Chi tiết cửa hàng'}
					</h1>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* Sidebar */}
					<div className="lg:col-span-1 bg-white rounded-lg p-6">
						<ShopInfo data={shopData} />
					</div>

					{/* Main Content */}
					<div className="lg:col-span-3">
						<Tabs defaultValue="products" className="w-full">
							<TabsList className="w-full grid grid-cols-3 mb-6">
								<TabsTrigger value="products" className="rounded-md">
									Sản phẩm
								</TabsTrigger>
								<TabsTrigger value="reviews" className="rounded-md">
									Đánh giá
								</TabsTrigger>
								<TabsTrigger value="about" className="rounded-md">
									Giới thiệu
								</TabsTrigger>
							</TabsList>

							<TabsContent value="products" className="space-y-6">
								<ShopProductsSection id={id} />
							</TabsContent>

							<TabsContent
								value="reviews"
								className="bg-white rounded-lg border p-6 text-center text-gray-500"
							>
								Chức năng đánh giá cửa hàng sẽ sớm được cập nhật.
							</TabsContent>

							<TabsContent
								value="about"
								className="bg-white rounded-lg border p-6 text-center text-gray-500"
							>
								<ShopAbout data={shopData} />
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		);
	} catch (error) {
		console.error('Error fetching shop details:', error);
		return <div>Error fetching shop details</div>;
	}
}

export default ShopDetail;
