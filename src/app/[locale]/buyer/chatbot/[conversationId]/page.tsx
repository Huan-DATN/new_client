import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ConversationPage from './conversation-page';

async function Page() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}
	return <ConversationPage sessionToken={sessionToken} />;
}

export default Page;
