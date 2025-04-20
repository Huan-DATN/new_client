import BackButton from '@/components/back-button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import SellerSidebar from '@/features/seller/main/seller-sidebar';

function layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<SellerSidebar />
			<main className="flex flex-col flex-1">
				<div>
					<SidebarTrigger />
					<BackButton />
				</div>
				{children}
			</main>
		</SidebarProvider>
	);
}

export default layout;
