'use client';
import cartRequest from '@/api/cartRequest';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function CartRemoveShop({ id }: { id: number }) {
	const router = useRouter();
	useEffect(() => {
		async function removeItem() {
			await cartRequest.removeShopFromNextClientToNextServer(id);
			router.push('/buyer/cart/me');
			router.refresh();
		}

		removeItem();
	}, [id]);
	return <div></div>;
}

export default CartRemoveShop;
