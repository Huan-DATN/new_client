import { Badge } from '../../../components/ui/badge';
import { PaymentType } from '../../../constants/paymentEnum';

function PaymentTypeBadge({ paymentType }: { paymentType: PaymentType }) {
	switch (paymentType) {
		case PaymentType.CASH:
			return <Badge variant="outline">COD</Badge>;
		case PaymentType.BANK_TRANSFER:
			return <Badge variant="outline">Chuyển khoản</Badge>;
		default:
			return null;
	}
}

export default PaymentTypeBadge;
