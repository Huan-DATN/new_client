import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import statisticRequest from '../../../api/statisticRequest';
import AdminDashboard from './admin-dashboard';

async function AdminDashboardPage() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	const {
		payload: { data },
	} = await statisticRequest.getStatisticAdminDashboard(sessionToken);

	return <AdminDashboard sessionToken={sessionToken} data={data} />;
}

export default AdminDashboardPage;
