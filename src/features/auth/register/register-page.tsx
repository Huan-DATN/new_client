import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BuyerRegisterForm from './buyer-register-form';
import SellerRegisterForm from './seller-register-form';

function RegisterPage() {
	return (
		<Tabs
			defaultValue="buyer"
			className="space-y-2 max-w-[400px] flex-shrink-0 w-full"
		>
			<TabsList className="w-full justify-center">
				<TabsTrigger value="buyer">Người mua</TabsTrigger>
				<TabsTrigger value="seller">Người bán</TabsTrigger>
			</TabsList>
			<TabsContent value="buyer" asChild>
				<BuyerRegisterForm />
			</TabsContent>
			<TabsContent value="seller" asChild>
				<SellerRegisterForm />
			</TabsContent>
		</Tabs>
	);
}

export default RegisterPage;
