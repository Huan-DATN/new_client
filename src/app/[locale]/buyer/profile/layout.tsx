import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardList, KeyRound, User } from 'lucide-react';

function Layout({
	me,
	password,
	children,
}: {
	me: React.ReactNode;
	password?: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto py-8 px-4 max-w-6xl">
			<div className="flex items-center gap-3 mb-6">
				<User className="text-primary" size={28} />
				<h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>
			</div>

			<Card className="overflow-hidden">
				<Tabs defaultValue="account" className="w-full">
					<div className="sm:flex">
						<TabsList className="flex flex-col sm:h-auto p-0 bg-gray-50 border-r w-full sm:w-64 rounded-none">
							<TabsTrigger
								value="account"
								className="justify-start px-4 py-3 h-auto data-[state=active]:bg-gray-100 data-[state=active]:border-r-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none"
							>
								<div className="flex items-center gap-3">
									<User size={18} />
									<span>Thông tin cá nhân</span>
								</div>
							</TabsTrigger>
							<TabsTrigger
								value="password"
								className="justify-start px-4 py-3 h-auto data-[state=active]:bg-gray-100 data-[state=active]:border-r-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none"
							>
								<div className="flex items-center gap-3">
									<KeyRound size={18} />
									<span>Bảo mật</span>
								</div>
							</TabsTrigger>
							<TabsTrigger
								value="orders"
								className="justify-start px-4 py-3 h-auto data-[state=active]:bg-gray-100 data-[state=active]:border-r-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none"
							>
								<div className="flex items-center gap-3">
									<ClipboardList size={18} />
									<span>Lịch sử đơn hàng</span>
								</div>
							</TabsTrigger>
						</TabsList>

						<div className="flex-1 p-6">
							<TabsContent value="account" className="mt-0">
								{me}
							</TabsContent>
							<TabsContent value="password" className="mt-0">
								{password || (
									<div>Chức năng đổi mật khẩu sẽ được cập nhật sau.</div>
								)}
							</TabsContent>
							<TabsContent value="orders" className="mt-0">
								<div className="text-center py-8">
									<ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
									<h3 className="mt-2 text-sm font-semibold text-gray-900">
										Chức năng xem lịch sử đơn hàng
									</h3>
									<p className="mt-1 text-sm text-gray-500">
										Tính năng này sẽ sớm được cập nhật.
									</p>
									<div className="mt-6">
										<a
											href="/buyer/order/me"
											className="text-sm font-medium text-primary hover:text-primary/80"
										>
											Đi đến trang đơn hàng
											<span aria-hidden="true"> &rarr;</span>
										</a>
									</div>
								</div>
							</TabsContent>
						</div>
					</div>
				</Tabs>
			</Card>
		</div>
	);
}

export default Layout;
