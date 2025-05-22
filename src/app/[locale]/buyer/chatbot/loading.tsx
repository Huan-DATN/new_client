import { Loader2 } from 'lucide-react';

export default function Loading() {
	return (
		<div className="flex items-center justify-center h-[calc(100vh-80px)] w-full">
			<div className="flex flex-col items-center gap-2">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
				<p className="text-muted-foreground text-sm">
					Đang tải giao diện trò chuyện...
				</p>
			</div>
		</div>
	);
}
