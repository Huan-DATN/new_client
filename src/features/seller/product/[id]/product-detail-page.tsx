'use client';

import productRequest from '@/api/productRequest';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductResType } from '@/schemaValidations/response/product';
import { Calendar, Clipboard, Edit, Eye, FileText, HelpCircle, MessageCircle, Package, Pencil, Tag, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Define image type to avoid implicit any
interface ProductImage {
    id: number;
    publicUrl: string;
}

function ProductDetailPage({ sessionToken }: { sessionToken: string }) {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);

    const [product, setProduct] = useState<ProductResType['data'] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true);
            try {
                // Using getDetail method from the API
                const response = await productRequest.getDetail(id);
                setProduct(response.payload.data);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Không thể tải thông tin sản phẩm');
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id, sessionToken]);

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
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-2/3 space-y-6">
                        <div className="bg-white rounded-lg border h-[400px] animate-pulse" />
                        <div className="bg-white rounded-lg border p-6 space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 space-y-6">
                        <div className="bg-white rounded-lg border h-[200px] animate-pulse" />
                        <div className="bg-white rounded-lg border h-[200px] animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="max-w-7xl mx-auto p-4 md:p-6">
                <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
                    <h1 className="text-lg font-semibold mb-2">Đã xảy ra lỗi</h1>
                    <p>{error || 'Không thể tải thông tin sản phẩm'}</p>
                    <Button
                        onClick={() => router.push('/seller/product')}
                        variant="outline"
                        className="mt-4"
                    >
                        Quay lại danh sách sản phẩm
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6">
            {/* Breadcrumb */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center">
                        <div className="p-2 rounded-full bg-primary/10 mr-3">
                            <Package className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold line-clamp-1">{product.name}</h1>
                            <p className="text-gray-500">ID: #{product.id}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4 sm:mt-0">
                        <Button variant="outline" className="text-blue-600" asChild>
                            <Link href={`/seller/product/${product.id}/edit`}>
                                <Edit className="mr-1 h-4 w-4" />
                                Chỉnh sửa
                            </Link>
                        </Button>
                        <Button variant="outline" className="text-green-600">
                            <Eye className="mr-1 h-4 w-4" />
                            Xem trên cửa hàng
                        </Button>
                        <Button variant="outline" className="text-red-600">
                            <Trash className="mr-1 h-4 w-4" />
                            Xóa
                        </Button>
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
                                        <div key={image.id} className="relative rounded-lg overflow-hidden border aspect-square">
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

                        <TabsContent value="details" className="space-y-4">
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
                                            <dd className="font-bold text-primary">{formatPrice(product.price)}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm text-gray-500">Danh mục</dt>
                                            <dd className="font-medium">
                                                {/* Display product category or default text */}
                                                {product.groupProduct ? product.groupProduct.name : 'Chưa phân loại'}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm text-gray-500">Nhóm sản phẩm</dt>
                                            <dd className="font-medium">
                                                {product.groupProduct ? product.groupProduct.name : 'Chưa phân loại'}
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
                                            <dt className="text-sm text-gray-500">Cập nhật lần cuối</dt>
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
                                                <Badge variant={product.isActive ? "default" : "secondary"} className={product.isActive ? 'bg-green-50 text-green-700' : ''}>
                                                    {product.isActive ? 'Đang bán' : 'Đã ẩn'}
                                                </Badge>
                                            </dd>
                                        </div>
                                    </dl>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="inventory" className="space-y-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <h3 className="text-lg font-semibold">Thông tin kho hàng</h3>
                                </CardHeader>
                                <CardContent>
                                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <dt className="text-sm text-gray-500 mb-1">Số lượng hiện tại</dt>
                                            <dd className="text-3xl font-bold text-primary">{product.quantity}</dd>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <dt className="text-sm text-gray-500 mb-1">Đã bán</dt>
                                            <dd className="text-3xl font-bold text-blue-600">0</dd>
                                        </div>
                                    </dl>

                                    <div className="mt-6 flex flex-col gap-4">
                                        <Button variant="outline" className="gap-2">
                                            <Pencil className="h-4 w-4" />
                                            Cập nhật số lượng
                                        </Button>
                                        <Button variant="outline" className="gap-2">
                                            <FileText className="h-4 w-4" />
                                            Xem lịch sử nhập kho
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="reviews" className="space-y-4">
                            <Card>
                                <CardContent className="p-6 flex items-center justify-center flex-col min-h-[200px]">
                                    <HelpCircle className="h-12 w-12 text-gray-300 mb-3" />
                                    <h3 className="text-lg font-medium">Chưa có đánh giá</h3>
                                    <p className="text-gray-500 mt-1">
                                        Sản phẩm này chưa nhận được đánh giá nào từ khách hàng
                                    </p>
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
                                <span className="font-bold text-lg text-primary">{formatPrice(product.price)}</span>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Tồn kho</span>
                                <span className="font-medium">{product.quantity} sản phẩm</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Lượt mua</span>
                                <span className="font-medium">0 lượt</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Đánh giá</span>
                                <span className="font-medium flex items-center">
                                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    0 (0 đánh giá)
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <h3 className="text-lg font-semibold">Thao tác nhanh</h3>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            <Button variant="outline" className="justify-start">
                                <Edit className="mr-2 h-4 w-4" />
                                Chỉnh sửa sản phẩm
                            </Button>
                            <Button variant="outline" className="justify-start">
                                <Tag className="mr-2 h-4 w-4" />
                                Thêm biến thể
                            </Button>
                            <Button variant="outline" className="justify-start">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Xem hỏi đáp
                            </Button>
                            <Button variant="outline" className="justify-start">
                                <Clipboard className="mr-2 h-4 w-4" />
                                Sao chép sản phẩm
                            </Button>
                            <Button variant="outline" className="justify-start text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                Xóa sản phẩm
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
