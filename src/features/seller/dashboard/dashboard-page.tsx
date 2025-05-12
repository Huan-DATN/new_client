import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SellerDashboard from './seller-dashboard';

async function DashboardPage() {
  const sessionToken = (await cookies()).get('sessionToken')?.value;
  if (!sessionToken) {
    redirect('/auth/login');
  }

  return (
    <SellerDashboard sessionToken={sessionToken} />
  )
}

export default DashboardPage
