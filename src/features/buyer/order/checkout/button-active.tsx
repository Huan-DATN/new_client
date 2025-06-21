'use client';
import orderRequest from '@/api/orderRequest';
import { Button } from '@/components/ui/button';
import { handleErrorApi } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import BankTransfer from './bank-transfer';

function ButtonActive({
	sessionToken,
	shopId,
	amount,
	orderId,
}: {
	sessionToken: string;
	shopId: number;
	amount: number;
	orderId: number;
}) {
	const [loading, setLoading] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [showBankTransfer, setShowBankTransfer] = useState(false);
	const router = useRouter();

	const handleConfirmPayment = async () => {
		if (loading) return;

		if (!showConfirm) {
			setShowConfirm(true);
			return;
		}

		setLoading(true);
		try {
			await orderRequest.createOrder(sessionToken, shopId, {
				paymentMethod: 'CASH',
			});
			toast.success('Đặt hàng thành công');
			router.push('/buyer/order/me');
		} catch (error: any) {
			handleErrorApi({
				error,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		if (showConfirm) {
			setShowConfirm(false);
		}
	};

	return (
		<div className="space-y-3 w-full">
			<Button
				onClick={handleConfirmPayment}
				disabled={loading}
				className={`w-full py-3 ${
					showConfirm
						? 'bg-green-600 hover:bg-green-700'
						: 'bg-blue-600 hover:bg-blue-700'
				} text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center`}
			>
				{loading ? (
					<>
						<svg
							className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Đang xử lý...
					</>
				) : showConfirm ? (
					'Xác nhận thanh toán khi nhận hàng'
				) : (
					'Thanh toán khi nhận hàng (COD)'
				)}
			</Button>

			<Button
				onClick={() => setShowBankTransfer(true)}
				disabled={loading}
				className="w-full py-3 bg-white border border-green-500 text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
			>
				{loading ? (
					<>
						<svg
							className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-600"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Đang xử lý...
					</>
				) : (
					'Thanh toán chuyển khoản'
				)}
			</Button>

			<Button
				onClick={handleCancel}
				className="w-full py-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
			>
				Hủy
			</Button>

			{showBankTransfer && (
				<BankTransfer
					sessionToken={sessionToken}
					shopId={shopId}
					orderId={orderId}
					amount={amount}
					isOpen={showBankTransfer}
					onClose={() => setShowBankTransfer(false)}
				/>
			)}
		</div>
	);
}

export default ButtonActive;
