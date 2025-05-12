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
	const mockData = {
		users: [],
		pagination: {
			total: 0,
			page: 1,
			limit: 10,
			totalPages: 1,
		},
	};

	return <AdminAccount sessionToken={sessionToken} data={mockData} />;
}

export default AdminAccountPage;
