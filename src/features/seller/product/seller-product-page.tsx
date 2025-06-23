import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Plus } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import InputSearch from './input-search';
import OrderBox from './order-box';
import ProductsList from './products-list';

async function SellerProductPage() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	return (
		<div className="min-w-full mx-auto p-4 md:p-6">
			{/* Header with stats cards */}
			<div className="mb-8">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 flex items-center">
							<Package className="mr-2 h-6 w-6 text-primary" />
							Quản lý sản phẩm
						</h1>
						<p className="text-gray-500 mt-1">
							Quản lý danh sách sản phẩm, kiểm soát kho hàng và theo dõi trạng
							thái bán hàng
						</p>
					</div>

					<div className="flex gap-2">
						<Link href="/seller/product/add">
							<Button variant="outline">
								<Plus className="ml-2 h-4 w-4" />
								Thêm sản phẩm
							</Button>
						</Link>
					</div>
				</div>
			</div>

			{/* Product Tabs */}
			<Tabs defaultValue="all" className="w-full">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
					<TabsList className="bg-muted h-10">
						<TabsTrigger value="all" className="rounded-md">
							Tất cả sản phẩm
						</TabsTrigger>
						<TabsTrigger value="active" className="rounded-md">
							Đang bán
						</TabsTrigger>
						<TabsTrigger value="inactive" className="rounded-md">
							Đã ẩn
						</TabsTrigger>
					</TabsList>

					<div className="relative w-full sm:w-auto">
						<InputSearch />
					</div>
				</div>

				<TabsContent value="all">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
						<div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
							<h2 className="font-medium text-gray-700">Tất cả sản phẩm</h2>
							<div className="flex items-center gap-2">
								<OrderBox />
							</div>
						</div>
						<div className="p-4">
							<ProductsList sessionToken={sessionToken} />
						</div>
					</div>
				</TabsContent>

				<TabsContent value="active">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
						<div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
							<h2 className="font-medium text-gray-700">Sản phẩm đang bán</h2>
							<div className="flex items-center gap-2">
								<OrderBox />
							</div>
						</div>
						<p className="text-gray-500 mt-2">
							<ProductsList sessionToken={sessionToken} isActive={true} />
						</p>
					</div>
				</TabsContent>

				<TabsContent value="inactive">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
						<div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
							<h2 className="font-medium text-gray-700">Sản phẩm đang ẩn</h2>
							<div className="flex items-center gap-2">
								<OrderBox />
							</div>
						</div>
						<p className="text-gray-500 mt-2">
							<ProductsList sessionToken={sessionToken} isActive={false} />
						</p>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default SellerProductPage;
