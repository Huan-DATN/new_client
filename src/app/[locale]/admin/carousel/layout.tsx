'use client';

import { ReactNode } from 'react';

export default function CarouselLayout({ children }: { children: ReactNode }) {
	return <div className="w-full">{children}</div>;
}
