'use client';
import { Badge } from '@/components/ui/badge';
import { OrderStatusEnum } from '@/constants/orderStatusEnum';
import { ArrowLeft, Check, CheckCircle, Clock, Package, Truck, X } from 'lucide-react';

interface OrderStatusBadgeProps {
  status: {
    id: number;
    type: string;
    name: string;
  };
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

function OrderStatusBadge({ status, size = 'md', showIcon = true }: OrderStatusBadgeProps) {
  // Helper to get badge variant and styles
  const getBadgeStyles = () => {
    switch (status.type) {
      case OrderStatusEnum.PENDING:
        return {
          variant: 'outline' as const,
          className: 'border-yellow-500 text-yellow-700 bg-yellow-50',
          icon: <Clock className="h-3 w-3" />
        };
      case OrderStatusEnum.CONFIRMED:
        return {
          variant: 'outline' as const,
          className: 'border-blue-500 text-blue-700 bg-blue-50',
          icon: <Check className="h-3 w-3" />
        };
      case OrderStatusEnum.PROCESSING:
        return {
          variant: 'outline' as const,
          className: 'border-indigo-500 text-indigo-700 bg-indigo-50',
          icon: <Package className="h-3 w-3" />
        };
      case OrderStatusEnum.SHIPPED:
        return {
          variant: 'outline' as const,
          className: 'border-purple-500 text-purple-700 bg-purple-50',
          icon: <Truck className="h-3 w-3" />
        };
      case OrderStatusEnum.DELIVERED:
        return {
          variant: 'outline' as const,
          className: 'border-green-500 text-green-700 bg-green-50',
          icon: <CheckCircle className="h-3 w-3" />
        };
      case OrderStatusEnum.CANCELLED:
        return {
          variant: 'destructive' as const,
          className: '',
          icon: <X className="h-3 w-3" />
        };
      case OrderStatusEnum.RETURNED:
        return {
          variant: 'outline' as const,
          className: 'border-pink-500 text-pink-700 bg-pink-50',
          icon: <ArrowLeft className="h-3 w-3" />
        };
      default:
        return {
          variant: 'secondary' as const,
          className: '',
          icon: <Clock className="h-3 w-3" />
        };
    }
  };

  const sizeClasses = {
    sm: 'text-xs py-0 px-1',
    md: 'text-sm py-0.5 px-2',
    lg: 'text-base py-1 px-3'
  };

  const badgeStyles = getBadgeStyles();

  return (
    <Badge
      variant={badgeStyles.variant}
      className={`${badgeStyles.className} ${sizeClasses[size]} ${showIcon ? 'flex items-center gap-1' : ''}`}
    >
      {showIcon && badgeStyles.icon}
      {status.name}
    </Badge>
  );
}

export default OrderStatusBadge;
