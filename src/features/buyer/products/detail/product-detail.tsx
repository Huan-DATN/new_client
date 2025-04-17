import productRequest from '@/api/productRequest';
import Image from 'next/image';
import Link from 'next/link';
import AddToCart from './add-to-cart';
import ProductSimilar from './product-similar';

async function ProductDetail({ id }: { id: string }) {
	const res = await productRequest.getDetail(Number(id));
	const data = res.payload.data;

	return (
		<div className="flex flex-col justify-center items-center w-1/2 mx-auto mt-5 border-2 border-gray-200 rounded-lg p-4">
			<div className="flex flex-col md:flex-row rounded-lg w-full gap-10 p-4">
				<Image
					src={data.image ?? ''}
					alt={data.name}
					width={300}
					height={450}
					className="object-cover rounded-lg shadow-md"
				/>
				<div className="flex-1">
					<h1 className="text-2xl font-semibold text-gray-800 mb-3">
						{data.name}
					</h1>
					<div className="flex space-x-1 mb-4">
						{[...Array(5)].map((_, index) => (
							<span key={index} className="text-green-400">
								{index < data.star ? (
									<i className="ic-star text-yellow-500" />
								) : (
									<i className="ic-star-normal text-gray-400" />
								)}
							</span>
						))}
					</div>

					<div className="text-gray-700 space-y-2 mb-6">
						<div className="flex gap-4">
							<p className="font-semibold">Xuất xứ:</p>
							<p>{data.city!.name}</p>
						</div>
						<div>
							<Link
								href={`/buyer/shop/${data.user!.id}`}
								className="flex gap-4"
							>
								<p className="font-semibold">Chủ shop:</p>
								{data.user!.shopName || 'Người bán'}
							</Link>
						</div>
						<div className="flex gap-4">
							<p className="font-semibold">Danh mục:</p>
							{data.categories?.map((category) => category.name).join(', ')}
						</div>
					</div>

					<p className="text-gray-800 italic mb-6">{data.description}</p>

					<p className="text-green-600 text-lg font-bold mb-2">
						Giá bán: {data.price} ₫
					</p>

					<AddToCart id={data.id} />
				</div>
			</div>
			<div className="w-full mt-5">
				<h2 className="text-green-700 font-bold">Sản phẩm tương tự</h2>
				<ProductSimilar data={data} />
			</div>
		</div>
	);
}

export default ProductDetail;
