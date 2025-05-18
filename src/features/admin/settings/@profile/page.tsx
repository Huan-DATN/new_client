import LogoutButton from '@/features/components/logout-button';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import userRequest from '../../../../api/userRequest';
import ProfileForm from './profile-form';

async function ProfilePage() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	const {
		payload: { data },
	} = await userRequest.getMe(sessionToken);

	return (
		<>
			<ProfileForm data={data} />
			<LogoutButton />
		</>
	);
}

export default ProfilePage;
