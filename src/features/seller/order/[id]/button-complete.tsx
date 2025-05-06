'use client';
import orderRequest from '@/api/orderRequest';
import { Button } from '@/components/ui/button';
import { handleErrorApi } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function ButtonComplete({ id }: { id: number }) {
	const router = useRouter();
	const handleClick = async () => {
		try {
			await orderRequest.completeOrder(id);

			toast.success('Đơn hàng đã hoàn thành');
			router.refresh();
		} catch (error) {
			handleErrorApi({
				error,
			});
		}
	};

	return (
		<Button
			className="bg-green-300 text-sm mt-2 hover:bg-green-400 max-w-1/2!"
			onClick={handleClick}
		>
			Hoàn thành
		</Button>
	);
}

export default ButtonComplete;
