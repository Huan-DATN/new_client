'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import cartRequest from '../../../../api/cartRequest';
import { useAppSelector } from '../../../../hooks/use-app-selector';
function AddItem() {
	const router = useRouter();
	const { productId, quantity } = useAppSelector(
		(state) => state.currentProduct
	);

	useEffect(() => {
		async function addItemToCart() {
			await cartRequest.addItemFromNextClientToNextServer(productId, {
				quantity,
			});

			toast.success('Thêm vào giỏ hàng thành công');

			router.push('/buyer/cart/me');
			router.refresh();
		}

		addItemToCart();
	}, [productId, quantity]);
	return <div>AddItem</div>;
}

export default AddItem;
