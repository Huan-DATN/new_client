'use client';

import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import {
	decrement,
	increment,
	setProductId,
} from '@/redux/currentProduct/currentProductReducer';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAppContext } from '../../../../context/app-provider';

function AddToCart({ id }: { id: number }) {
	const { isAuthenticated } = useAppContext();
	const dispatch = useAppDispatch();
	const quantity = useAppSelector((state) => state.currentProduct.quantity);

	useEffect(() => {
		dispatch(setProductId(id));
	}, [dispatch]);

	const handleIncrease = () => {
		dispatch(increment());
	};
	const handleDecrease = () => {
		dispatch(decrement());
	};

	return (
		<>
			{!isAuthenticated ? (
				<p className="text-red-500 text-sm mb-2">
					Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng
				</p>
			) : (
				<div>
					<div className="flex items-center gap-3 mb-4">
						<Button
							className="w-8 h-8 bg-green-600 hover:bg-green-700 flex items-center justify-center border border-gray-300 rounded text-lg"
							onClick={handleDecrease}
						>
							-
						</Button>
						<span className="text-base font-medium">{quantity}</span>
						<Button
							className="w-8 h-8 bg-green-600 hover:bg-green-700  flex items-center justify-center border border-gray-300 rounded text-lg"
							onClick={handleIncrease}
						>
							+
						</Button>
					</div>

					<Button
						className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md font-semibold transition duration-200"
						disabled={!isAuthenticated}
						asChild
					>
						<Link href={`/buyer/cart/add/${id}`}>Thêm vào giỏ</Link>
					</Button>
				</div>
			)}
		</>
	);
}

export default AddToCart;
