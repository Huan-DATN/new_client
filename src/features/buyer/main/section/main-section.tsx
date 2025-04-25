import commonRequest from '@/api/commonRequest';
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
		<div className="flex flex-col justify-center items-center w-10/12 mx-auto mt-5">
			<div className="flex flex-row gap-3 mt-5">
				<HighlightCarousel data={undefined} />
				<HighlightCarousel data={undefined} />
			</div>

			<div className="flex flex-col justify-center items-center w-full mt-5">
				<h4 className="text-center text-green-700 font-bold">Các danh mục</h4>
				<GroupProductCarousel data={data} />
			</div>

			<div className="flex flex-col justify-center items-center w-full mt-5">
				<h4 className="text-center text-green-700 font-bold">
					{t('productSpotlight')}
				</h4>
				<ProductSpotlight />
				<Link href="/buyer/products" className="mt-5">
					{t('showMore')}
				</Link>
			</div>
		</div>
	);
}

export default MainSection;
