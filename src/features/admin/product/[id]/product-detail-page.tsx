import productRequest from '@/api/productRequest';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Package } from 'lucide-react';
import Image from 'next/image';
import RatingsSection from './ratings-section';
// Define image type to avoid implicit any
interface ProductImage {
	id: number;
	publicUrl: string;
}

async function ProductDetailPage({
	sessionToken,
	id,
}: {
	sessionToken: string;
	id: number;
}) {
	const response = await productRequest.getDetail(id);
	const product = response.payload.data;
	// Format price with commas
	const formatPrice = (price: number) => {
		return price.toLocaleString('vi-VN', {
			style: 'currency',
			currency: 'VND',
		});
	};

	// Format date
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('vi-VN', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<div className="min-w-5xl mx-auto p-4 md:p-6">
			{/* Breadcrumb */}
			<div className="mb-6">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div className="flex items-center">
						<div className="p-2 rounded-full bg-primary/10 mr-3">
							<Package className="h-6 w-6 text-primary" />
						</div>
						<div>
							<h1 className="text-2xl font-bold line-clamp-1">
								{product.name}
							</h1>
							<p className="text-gray-500">ID: #{product.id}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					{/* Product Images */}
					<Card>
						<CardHeader className="pb-3">
							<h2 className="text-lg font-semibold">Hình ảnh sản phẩm</h2>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{product.images && product.images.length > 0 ? (
									product.images.map((image: ProductImage, index: number) => (
										<div
											key={image.id}
											className="relative rounded-lg overflow-hidden border aspect-square"
										>
											<Image
												src={image.publicUrl}
												alt={`${product.name} - ${index + 1}`}
												fill
												className="object-cover"
											/>
										</div>
									))
								) : (
									<div className="col-span-full flex items-center justify-center h-64 bg-gray-100 rounded-lg">
										<p className="text-gray-500">Không có hình ảnh</p>
									</div>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Product Details Tabs */}
					<Tabs defaultValue="details" className="w-full">
						<TabsList className="w-full grid grid-cols-3 mb-4">
							<TabsTrigger value="details">Chi tiết</TabsTrigger>
							<TabsTrigger value="inventory">Kho hàng</TabsTrigger>
							<TabsTrigger value="reviews">Đánh giá</TabsTrigger>
						</TabsList>

						<TabsContent value="details" className="space-y-4 w-full">
							<Card>
								<CardHeader className="pb-3">
									<h3 className="text-lg font-semibold">Thông tin cơ bản</h3>
								</CardHeader>
								<CardContent>
									<dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
										<div>
											<dt className="text-sm text-gray-500">Tên sản phẩm</dt>
											<dd className="font-medium">{product.name}</dd>
										</div>
										<div>
											<dt className="text-sm text-gray-500">Giá bán</dt>
											<dd className="font-bold text-primary">
												{formatPrice(product.price)}
											</dd>
										</div>
										<div>
											<dt className="text-sm text-gray-500">Danh mục</dt>
											<dd className="font-medium">
												{/* Display product category or default text */}
												{product.groupProduct
													? product.groupProduct.name
													: 'Chưa phân loại'}
											</dd>
										</div>
										<div>
											<dt className="text-sm text-gray-500">Nhóm sản phẩm</dt>
											<dd className="font-medium">
												{product.groupProduct
													? product.groupProduct.name
													: 'Chưa phân loại'}
											</dd>
										</div>
										<div className="md:col-span-2">
											<dt className="text-sm text-gray-500">Mô tả</dt>
											<dd className="font-medium whitespace-pre-line">
												{product.description || 'Không có mô tả'}
											</dd>
										</div>
									</dl>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="pb-3">
									<h3 className="text-lg font-semibold">Thông tin khác</h3>
								</CardHeader>
								<CardContent>
									<dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
										<div>
											<dt className="text-sm text-gray-500">Ngày tạo</dt>
											<dd className="font-medium flex items-center">
												<Calendar className="h-4 w-4 mr-1 text-gray-500" />
												{formatDate(product.createdAt.toString())}
											</dd>
										</div>
										<div>
											<dt className="text-sm text-gray-500">
												Cập nhật lần cuối
											</dt>
											<dd className="font-medium flex items-center">
												<Calendar className="h-4 w-4 mr-1 text-gray-500" />
												{formatDate(product.updatedAt.toString())}
											</dd>
										</div>
										<div>
											<dt className="text-sm text-gray-500">Mã sản phẩm</dt>
											<dd className="font-medium">{product.id}</dd>
										</div>
										<div>
											<dt className="text-sm text-gray-500">Trạng thái</dt>
											<dd>
												<Badge
													variant={product.isActive ? 'default' : 'secondary'}
													className={
														product.isActive ? 'bg-green-50 text-green-700' : ''
													}
												>
													{product.isActive ? 'Đang bán' : 'Đã ẩn'}
												</Badge>
											</dd>
										</div>
									</dl>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="inventory" className="space-y-4 w-full">
							<Card className="w-full">
								<CardHeader className="pb-3">
									<h3 className="text-lg font-semibold">Thông tin kho hàng</h3>
								</CardHeader>
								<CardContent className="w-full">
									<dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="bg-gray-50 p-4 rounded-lg">
											<dt className="text-sm text-gray-500 mb-1">
												Số lượng hiện tại
											</dt>
											<dd className="text-3xl font-bold text-primary">
												{product.quantity}
											</dd>
										</div>
										<div className="bg-gray-50 p-4 rounded-lg">
											<dt className="text-sm text-gray-500 mb-1">Đã bán</dt>
											<dd className="text-3xl font-bold text-blue-600">0</dd>
										</div>
									</dl>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="reviews" className="space-y-4 w-full">
							<Card>
								<CardContent className="p-6 flex items-center justify-center flex-col min-h-[200px]">
									<RatingsSection id={id} />
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<Card>
						<CardHeader className="pb-3">
							<h3 className="text-lg font-semibold">Thông tin bán hàng</h3>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-gray-500">Giá bán</span>
								<span className="font-bold text-lg text-primary">
									{formatPrice(product.price)}
								</span>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<span className="text-gray-500">Tồn kho</span>
								<span className="font-medium">{product.quantity} sản phẩm</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default ProductDetailPage;
