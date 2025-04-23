import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BuyerRegisterForm from './buyer-register-form';
import SellerRegisterForm from './seller-register-form';

function RegisterPage() {
	return (
		<Tabs
			defaultValue="buyer"
			className="flex flex-col items-center justify-center w-full h-screen"
		>
			<TabsList>
				<TabsTrigger value="buyer">Người mua</TabsTrigger>
				<TabsTrigger value="seller">Người bán</TabsTrigger>
			</TabsList>
			<TabsContent value="buyer" className="flex flex-col items-center" asChild>
				<BuyerRegisterForm />
			</TabsContent>
			<TabsContent value="seller" asChild>
				<SellerRegisterForm />
			</TabsContent>
		</Tabs>
	);
}

export default RegisterPage;
