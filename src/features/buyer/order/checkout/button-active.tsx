'use client';
import orderRequest from '@/api/orderRequest';
import { Button } from '@/components/ui/button';
import { handleErrorApi } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

function ButtonActive({
	sessionToken,
	shopId,
}: {
	sessionToken: string;
	shopId: number;
}) {
	const [loading, setLoading] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const router = useRouter();

	const handleConfirmPayment = async () => {
		if (loading) return;

		if (!showConfirm) {
			setShowConfirm(true);
			return;
		}

		setLoading(true);
		try {
			await orderRequest.createOrder(sessionToken, shopId);
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
		} else {
			router.back();
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
					'Xác nhận đặt hàng'
				) : (
					'Tiến hành thanh toán'
				)}
			</Button>

			<Button
				onClick={handleCancel}
				className="w-full py-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
			>
				{showConfirm ? 'Quay lại' : 'Hủy đơn hàng'}
			</Button>

			{showConfirm && (
				<div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mt-3">
					<p className="text-sm text-yellow-800 flex items-start">
						<svg
							className="w-5 h-5 mr-2 flex-shrink-0 text-yellow-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							></path>
						</svg>
						Vui lòng kiểm tra thông tin đơn hàng trước khi xác nhận
					</p>
				</div>
			)}
		</div>
	);
}

export default ButtonActive;
