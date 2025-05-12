'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			// Clear the session token
			document.cookie =
				'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			// Redirect to login page
			router.push('/auth/login');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	return (
		<div className="mt-8">
			<Button variant="destructive" onClick={handleLogout}>
				Đăng xuất
			</Button>
		</div>
	);
}
