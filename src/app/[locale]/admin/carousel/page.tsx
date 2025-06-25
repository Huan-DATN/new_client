import { cookies } from 'next/headers';
import CarouselManagement from '../../../../features/admin/carousel/carousel-page';

async function Page() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		return <div>No session token</div>;
	}
	return <CarouselManagement sessionToken={sessionToken} />;
}

export default Page;
