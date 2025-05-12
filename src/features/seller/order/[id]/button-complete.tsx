'use client';
import orderRequest from '@/api/orderRequest';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { handleErrorApi } from '@/lib/utils';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

function ButtonComplete({ id }: { id: number }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		try {
			setLoading(true);
			await orderRequest.completeOrder(id);
			toast.success('Đơn hàng đã hoàn thành thành công');
			router.refresh();
		} catch (error) {
			handleErrorApi({
				error,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="default"
						className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
						size="sm"
						onClick={handleClick}
						disabled={loading}
					>
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Đang xử lý...
							</>
						) : (
							<>
								<CheckCircle className="mr-2 h-4 w-4" />
								Hoàn thành đơn hàng
							</>
						)}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Đánh dấu đơn hàng đã hoàn thành</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

export default ButtonComplete;
