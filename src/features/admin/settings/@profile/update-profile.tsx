import userRequest from '@/api/userRequest';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileForm from './profile-form';

async function UpdateProfile() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	try {
		const res = await userRequest.getMe(sessionToken);

		return (
			<div>
				<div className="mb-6">
					<h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
					<p className="text-sm text-gray-500 mt-1">
						Quản lý thông tin cá nhân để bảo mật tài khoản
					</p>
				</div>

				<ProfileForm data={res.payload.data} />
			</div>
		);
	} catch (error) {
		console.error('Error fetching user data:', error);
		redirect('/auth/login');
	}
}

export default UpdateProfile;
