'use client';

import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import {
	decrement,
	increment,
	setNumberStock,
	setProductId,
} from '@/redux/currentProduct/currentProductReducer';
import { LogIn, Minus, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAppContext } from '../../../../context/app-provider';

function AddToCart({ id, numberStock }: { id: number; numberStock: number }) {
	const { isAuthenticated } = useAppContext();
	const dispatch = useAppDispatch();
	const quantity = useAppSelector((state) => state.currentProduct.quantity);

	useEffect(() => {
		dispatch(setProductId(id));
		dispatch(setNumberStock(numberStock));
	}, [dispatch, id]);

	const handleIncrease = () => {
		dispatch(increment());
	};

	const handleDecrease = () => {
		dispatch(decrement());
	};

	return (
		<div className="space-y-4">
			{!isAuthenticated ? (
				<div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
					<p className="text-amber-700 flex items-center mb-2">
						<LogIn className="h-4 w-4 mr-2" />
						Vui lòng đăng nhập để mua sản phẩm
					</p>
					<Button
						asChild
						className="text-white bg-green-600 hover:bg-green-700"
					>
						<Link href="/auth/login">Đăng nhập ngay</Link>
					</Button>
				</div>
			) : (
				<>
					<div className="flex items-center">
						<span className="text-gray-700 mr-4">Số lượng:</span>
						<div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="h-10 w-10 rounded-none border-r border-gray-300 hover:bg-gray-100"
								onClick={handleDecrease}
								disabled={quantity <= 1}
							>
								<Minus className="h-4 w-4" />
							</Button>

							<div className="h-10 w-12 flex items-center justify-center text-sm font-medium">
								{quantity}
							</div>

							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="h-10 w-10 rounded-none border-l border-gray-300 hover:bg-gray-100"
								onClick={handleIncrease}
							>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
					</div>

					<div className="flex gap-3 mt-5">
						<Button
							className="flex-1 h-12 bg-white text-green-600 hover:bg-green-50 border-2 border-green-600"
							disabled={!isAuthenticated}
							asChild
						>
							<Link
								href={`/buyer/cart/add/${id}`}
								className={`flex items-center justify-center ${
									quantity >= numberStock
										? 'bg-gray-300 cursor-not-allowed'
										: ''
								}`}
								aria-disabled={quantity >= numberStock}
							>
								<ShoppingCart className="w-5 h-5 mr-2" />
								Thêm vào giỏ
							</Link>
						</Button>
					</div>
				</>
			)}
		</div>
	);
}

export default AddToCart;
