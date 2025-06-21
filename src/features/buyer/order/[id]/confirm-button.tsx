'use client';

import orderRequest from '../../../../api/orderRequest';
import { Button } from '../../../../components/ui/button';
import { handleErrorApi } from '../../../../lib/utils';

function ConfirmButton({ id }: { id: number }) {
	const handleClick = async () => {
		try {
			await orderRequest.completeOrder(id);
		} catch (error) {
			handleErrorApi({
				error,
			});
		}
	};

	return <Button onClick={handleClick}>Xác nhận được hàng</Button>;
}

export default ConfirmButton;
