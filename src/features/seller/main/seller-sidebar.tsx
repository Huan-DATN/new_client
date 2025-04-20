import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

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
		url: 'dashboard',
		icon: Home,
	},
	{
		title: 'Đơn hàng',
		url: '#',
		icon: Inbox,
	},
	{
		title: 'Sản phẩm',
		url: '/seller/product',
		icon: Calendar,
	},
	{
		title: 'Search',
		url: '#',
		icon: Search,
	},
	{
		title: 'Settings',
		url: '#',
		icon: Settings,
	},
];

function SellerSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="flex items-center justify-center mt-5">
						<Image
							src={`https://dyh48pub5c8mm.cloudfront.net/home/common/s3_site_logo.png`}
							width={174}
							height={65}
							alt={''}
						/>
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
