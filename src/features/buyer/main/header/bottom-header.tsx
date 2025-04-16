import Image from 'next/image';
import Link from 'next/link';
import FormSearch from './form-search';
function BottomHeader() {
	return (
		<div className="flex flex-row justify-between items-center w-full bg-white shadow-md p-3">
			<Link href="/buyer">
				<Image
					src={`https://dyh48pub5c8mm.cloudfront.net/home/common/s3_site_logo.png`}
					width={174}
					height={65}
					alt={''}
				></Image>
			</Link>

			<div>
				<FormSearch />
			</div>

			<div className="flex flex-row gap-3">
				<Link href={`/auth/login`}>Đăng nhập</Link>
				<Link href={`/buyer/cart/me`}>Giỏ hàng</Link>
			</div>
		</div>
	);
}

export default BottomHeader;
