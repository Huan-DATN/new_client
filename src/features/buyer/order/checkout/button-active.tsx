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
	const router = useRouter();
	const handleConfirmPayment = async () => {
		setLoading(true);
		if (loading) return;
		try {
			await orderRequest.createOrder(sessionToken, shopId);

			toast.success('Đặt hàng thành công');
			router.push('/buyer/profile');
		} catch (error: any) {
			handleErrorApi({
				error,
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<div>
			<Button
				onClick={handleConfirmPayment}
				className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
			>
				Xác nhận thanh toán
			</Button>
			<Button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
				Hủy đơn hàng
			</Button>
		</div>
	);
}

export default ButtonActive;
