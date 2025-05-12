import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const recentOrders = [
  {
    id: 'ORD-5923',
    customer: 'Nguyễn Văn A',
    status: 'pending',
    date: '23 Thg 7, 2023',
    total: '1.250.000 ₫',
    products: 3,
  },
  {
    id: 'ORD-5922',
    customer: 'Trần Thị B',
    status: 'delivered',
    date: '22 Thg 7, 2023',
    total: '850.000 ₫',
    products: 2,
  },
  {
    id: 'ORD-5921',
    customer: 'Lê Minh C',
    status: 'processing',
    date: '22 Thg 7, 2023',
    total: '1.750.000 ₫',
    products: 4,
  },
  {
    id: 'ORD-5920',
    customer: 'Phạm Văn D',
    status: 'delivered',
    date: '21 Thg 7, 2023',
    total: '550.000 ₫',
    products: 1,
  },
  {
    id: 'ORD-5919',
    customer: 'Hoàng Thị E',
    status: 'canceled',
    date: '20 Thg 7, 2023',
    total: '2.150.000 ₫',
    products: 5,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'canceled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Chờ xác nhận';
    case 'processing':
      return 'Đang xử lý';
    case 'delivered':
      return 'Đã giao hàng';
    case 'canceled':
      return 'Đã hủy';
    default:
      return status;
  }
};

export default function RecentOrdersList() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-2 font-medium">Mã đơn</th>
            <th className="pb-2 font-medium">Khách hàng</th>
            <th className="pb-2 font-medium">Trạng thái</th>
            <th className="pb-2 font-medium">Ngày đặt</th>
            <th className="pb-2 font-medium">Sản phẩm</th>
            <th className="pb-2 font-medium">Tổng tiền</th>
            <th className="pb-2 font-medium text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="py-4">{order.id}</td>
              <td className="py-4">{order.customer}</td>
              <td className="py-4">
                <Badge className={getStatusColor(order.status)}>
                  {getStatusText(order.status)}
                </Badge>
              </td>
              <td className="py-4">{order.date}</td>
              <td className="py-4">{order.products}</td>
              <td className="py-4">{order.total}</td>
              <td className="py-4 text-right">
                <Button variant="outline" size="sm">
                  Chi tiết
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
