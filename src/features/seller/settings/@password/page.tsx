import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ChangePasswordForm from './change-password';

async function ChangePasswordPage() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	return <ChangePasswordForm />;
}

export default ChangePasswordPage;
