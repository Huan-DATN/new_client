'use client';

import productRequest from '@/api/productRequest';
import { Button } from '@/components/ui/button';
import { handleErrorApi } from '@/lib/utils';
import { Lock, LockOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function ButtonToggleActive({
	isActive,
	id,
}: {
	isActive: boolean;
	id: number;
}) {
	const router = useRouter();

	const handleClick = async () => {
		try {
			await productRequest.updateProductActive(id, {
				isActive: !isActive,
			});
			toast.success('Cập nhật trạng thái thành công');
			// Refresh the entire page to see the changes
			router.refresh();
		} catch (error) {
			handleErrorApi({
				error,
			});
		}
	};

	return (
		<Button onClick={handleClick} variant={'ghost'}>
			{isActive ? (
				<Lock className="text-red-400" />
			) : (
				<LockOpen className="text-green-400" />
			)}
		</Button>
	);
}

export default ButtonToggleActive;
