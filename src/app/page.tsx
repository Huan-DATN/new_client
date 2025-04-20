import { decodeTokenJWT } from '@/lib/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
	const cookiesStore = await cookies();
	const sessionToken = cookiesStore.get('sessionToken');

	if (sessionToken) {
		const role = decodeTokenJWT(sessionToken.value)?.role;

		console.log(role);

		if (role === 'BUYER') {
			redirect('/buyer/');
		} else if (role === 'SELLER') {
			redirect('/seller/');
		}
	} else {
		redirect('/buyer/main');
	}
}
