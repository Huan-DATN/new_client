import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ChatPage from './chat-page';

async function Page() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}
	return <ChatPage sessionToken={sessionToken} />;
}

export default Page;
