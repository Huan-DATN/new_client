import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminAccount from './admin-account';

async function AdminAccountPage() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	// Placeholder for API call to fetch accounts data
	// In a real implementation, this would call an API like:
	// const { payload: { data } } = await userRequest.getAdminUsersList(sessionToken);

	// For now, we'll use mock data until the API is implemented
	

	return <AdminAccount sessionToken={sessionToken} />;
}

export default AdminAccountPage;
