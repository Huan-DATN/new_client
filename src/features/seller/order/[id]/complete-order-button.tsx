'use client';
import orderRequest from '@/api/orderRequest';
import { Button } from '@/components/ui/button';
import { handleErrorApi } from '@/lib/utils';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface CompleteOrderButtonProps {
  id: number;
}

function CompleteOrderButton({ id }: CompleteOrderButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    try {
      setLoading(true);
      await orderRequest.completeOrder(id);
      toast.success('Đơn hàng đã hoàn thành thành công');
      router.refresh();
    } catch (error) {
      handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleComplete}
      className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
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
          Đánh dấu đã giao hàng thành công
        </>
      )}
    </Button>
  );
}

export default CompleteOrderButton;
