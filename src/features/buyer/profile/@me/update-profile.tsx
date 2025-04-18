import userRequest from '@/api/userRequest';
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
			<h1 className="text-2xl font-bold text-center mt-5">
				Cập nhật thông tin cá nhân
			</h1>

			<div>
				<FormProfile profile={res.payload.data} />
			</div>
		</div>
	);
}

export default UpdateProfile;
