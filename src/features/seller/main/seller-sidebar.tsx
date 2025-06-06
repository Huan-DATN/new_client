import { Calendar, Home, Inbox, Settings } from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
// Menu items.
const items = [
	{
		title: 'Thống kê',
		url: '/seller/dashboard',
		icon: Home,
	},
	{
		title: 'Đơn hàng',
		url: '/seller/order',
		icon: Inbox,
	},
	{
		title: 'Sản phẩm',
		url: '/seller/product',
		icon: Calendar,
	},
	{
		title: 'Cài đặt',
		url: '/seller/settings',
		icon: Settings,
	},
];

function SellerSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="flex items-center justify-center mt-5">
						<Image src={`/img/logoocop.png`} width={174} height={65} alt={''} />
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-10">
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}

export default SellerSidebar;
