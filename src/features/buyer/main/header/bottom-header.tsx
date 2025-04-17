import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import FormSearch from './form-search';

async function BottomHeader() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
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
				{sessionToken ? (
					<>
						<Link href={`/buyer/profile/me`}>Tài khoản</Link>
						<Link href={`/buyer/cart/me`}>Giỏ hàng</Link>
					</>
				) : (
					<Link href={`/auth/login`}>Đăng nhập</Link>
				)}
			</div>
		</div>
	);
}

export default BottomHeader;
