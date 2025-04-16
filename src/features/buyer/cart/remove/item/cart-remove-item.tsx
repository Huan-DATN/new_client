'use client';
import cartRequest from '@/api/cartRequest';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function CartRemoveItem({ id }: { id: number }) {
	const router = useRouter();
	useEffect(() => {
		async function removeItem() {
			await cartRequest.removeItemFromNextClientToNextServer(id);
			router.push('/buyer/cart/me');
			router.refresh();
		}

		removeItem();
	}, [id]);
	return <div></div>;

	return <div></div>;
}

export default CartRemoveItem;
