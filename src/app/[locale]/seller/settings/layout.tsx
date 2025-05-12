import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, User } from 'lucide-react';

export default function SettingsLayout({
	profile,
	password,
	children,
}: {
	profile: React.ReactNode;
	password: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Cài đặt cửa hàng</h1>
			</div>

			<Tabs defaultValue="profile" className="space-y-6">
				<TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
					<TabsTrigger value="profile" className="flex items-center gap-2">
						<User className="h-4 w-4" />
						<span className="hidden md:inline">Hồ sơ</span>
					</TabsTrigger>
					<TabsTrigger value="security" className="flex items-center gap-2">
						<Lock className="h-4 w-4" />
						<span className="hidden md:inline">Bảo mật</span>
					</TabsTrigger>
				</TabsList>

				<TabsContent value="profile">
					<Card>
						<CardHeader>
							<CardTitle>Thông tin cá nhân</CardTitle>
							<CardDescription>
								Cập nhật thông tin cá nhân của bạn
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">{profile}</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="security">
					<Card>
						<CardHeader>
							<CardTitle>Bảo mật tài khoản</CardTitle>
							<CardDescription>
								Quản lý bảo mật và quyền truy cập tài khoản
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">{password}</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
