import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AccountManagement from './account-management';

export default async function AdminAccountPage() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	return <AccountManagement sessionToken={sessionToken} />;
}
