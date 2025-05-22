'use client';

import { ReactNode } from 'react';

export default function ChatLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col w-full h-full bg-background min-h-screen">
			<div className="flex flex-col w-full h-full">
				<div className="w-full h-full">{children}</div>
			</div>
		</div>
	);
}
