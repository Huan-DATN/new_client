'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import orderRequest from '../../../../api/orderRequest';
import { Button } from '../../../../components/ui/button';
import { handleErrorApi } from '../../../../lib/utils';

function ConfirmButton({ id }: { id: number }) {
	const router = useRouter();

	const handleClick = async () => {
		try {
			await orderRequest.completeOrder(id);

			toast.success('Xác nhận nhận được hàng thành công');

			router.push('/buyer/order/me');
			router.refresh();
		} catch (error) {
			handleErrorApi({
				error,
			});
		}
	};

	return <Button onClick={handleClick}>Xác nhận đơn hàng</Button>;
}

export default ConfirmButton;
