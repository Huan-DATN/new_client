import userRequest from '@/api/userRequest';
import LogoutButton from '@/features/components/logout-button';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import FormProfile from './form-profile';

async function UpdateProfile() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	const res = await userRequest.getMe(sessionToken);

	return (
		<div>
			<div className="mb-6">
				<h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
				<p className="text-sm text-gray-500 mt-1">
					Quản lý thông tin cá nhân để bảo mật tài khoản
				</p>
			</div>

			<FormProfile profile={res.payload.data} />

			<LogoutButton />
		</div>
	);
}

export default UpdateProfile;
