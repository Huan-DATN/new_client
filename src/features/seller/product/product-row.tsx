import { Button } from '@/components/ui/button';
import { ProductListResType } from '@/schemaValidations/response/product';
import Image from 'next/image';
import Link from 'next/link';
function ProductRow({ data }: { data: ProductListResType['data'][number] }) {
	return (
		<div className="w-full flex flex-row  border-b border-gray-300 py-4 gap-5">
			<div className="flex flex-col flex-shrink-0 items-center justify-center">
				<span className="font-semibold text-gray-400">Hình ảnh</span>
				<Image
					src={
						data.images.length > 0
							? data.images[0].publicUrl
							: 'https://placehold.co/600x400/png'
					}
					alt="product"
					width={50}
					height={50}
				/>
			</div>

			<div className="flex-1">
				<span className="font-semibold text-gray-400">Tên</span>
				<p className="font-bold">{data.name}</p>
			</div>

			<div className="flex-shrink-0 flex-1">
				<span className="font-semibold text-gray-400">Nhóm sản phẩm</span>
				<p className="font-bold">
					{data.groupProduct && data.groupProduct.name}
				</p>
			</div>

			<div className="flex-1">
				<span className="font-semibold text-gray-400">Giá bán</span>
				<p className="font-bold text-green-500">
					{data.price.toLocaleString('vi-VN', {
						style: 'currency',
						currency: 'VND',
					})}
				</p>
			</div>

			<div className="flex-1">
				<span className="font-semibold text-gray-400">Số lượng</span>
				<p className="font-bold text-red-500">{data.quantity}</p>
			</div>

			<div className="flex-1 flex">
				<div className="flex-1 justify-center items-center flex gap-2">
					<Button asChild>
						{data.isActive ? (
							<Link
								href={`/product/${data.id}/toggle-active`}
								className="text-red-500 bg-white hover:bg-red-500 hover:text-white border border-red-500 rounded-md px-4 py-2"
							>
								Khóa
							</Link>
						) : (
							<Link
								href={`/product/${data.id}/toggle-active`}
								className="text-green-500 bg-white hover:bg-green-500 hover:text-white border border-green-500 rounded-md px-4 py-2"
							>
								Mở khóa
							</Link>
						)}
					</Button>
					<Button className="bg-white	text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500 rounded-md px-4 py-2">
						<Link href={`/seller/product/${data.id}`}>Xem chi tiết</Link>
					</Button>
					<Button className="text-green-500 bg-white hover:bg-green-500 hover:text-white border border-green-500 rounded-md px-4 py-2">
						<Link href={`/seller/product/${data.id}/edit`}>Chỉnh sửa</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ProductRow;
