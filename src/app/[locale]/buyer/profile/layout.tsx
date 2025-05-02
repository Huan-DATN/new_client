import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Layout({
	me,
	orders,
}: {
	me: React.ReactNode;
	orders: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<Tabs
			defaultValue="account"
			className="flex flex-col min-h-screen w-8/12 mx-auto mt-5 shadow-lg rounded-lg bg-white"
		>
			<TabsList className="w-full bg-gray-100 p-2 rounded-t-lg">
				<TabsTrigger
					value="account"
					className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow"
				>
					Account
				</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
			</TabsList>
			<TabsContent value="account">{me}</TabsContent>
			<TabsContent value="password">password</TabsContent>
		</Tabs>
	);
}

export default Layout;
