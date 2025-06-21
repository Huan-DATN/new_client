import cardRequest from '@/api/cardRequest';
import userRequest from '@/api/userRequest';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CardList } from './card-list';

async function CardPage() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	const [userResponse, cardsResponse] = await Promise.all([
		userRequest.getMe(sessionToken),
		cardRequest.getUserCards(sessionToken),
	]);

	const user = userResponse.payload.data;
	const cards = cardsResponse.payload.data;

	return (
		<>
			<CardList cards={cards} sessionToken={sessionToken} />
		</>
	);
}

export default CardPage;
