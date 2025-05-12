import BackButton from '@/components/back-button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/features/admin/main/admin-sidebar';

function layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AdminSidebar />
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
