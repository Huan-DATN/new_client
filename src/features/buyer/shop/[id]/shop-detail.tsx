import ShopInfo from './shop-info';
import ShopProductsSection from './shop-products-section';

function ShopDetail({ id }: { id: number }) {
	return (
		<div className="flex flex-row mx-auto w-10/12 mt-5">
			<ShopInfo data={undefined} />
			<div className="flex flex-col w-3/4 border-2 ml-5">
				<h1>Các sản phẩm của cửa hàng</h1>
				<ShopProductsSection id={id} />
			</div>
		</div>
	);
}

export default ShopDetail;
