'use client';
import authRequest from '@/api/authRequest';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app-provider';
import { handleErrorApi } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

function LogoutButton() {
	const { setUser } = useAppContext();
	const router = useRouter();
	const pathname = usePathname();

	const handleLogout = async () => {
		try {
			await authRequest.logoutFromNextClientToNextServer();
			router.push('/auth/login');
		} catch (error) {
			handleErrorApi({
				error,
			});
			authRequest.logoutFromNextClientToNextServer(true).then((res) => {
				router.push(`/auth/login?redirectFrom=${pathname}`);
			});
		} finally {
			setUser(null);
			router.refresh();
			localStorage.removeItem('sessionToken');
			localStorage.removeItem('sessionTokenExpiresAt');
		}
	};
	return (
		<Button size={'lg'} onClick={handleLogout}>
			Đăng xuất
		</Button>
	);
}

export default LogoutButton;
