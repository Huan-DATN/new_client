'use client';
import { ArrowLeftFromLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

function BackButton() {
	const router = useRouter();

	const handleClick = (e: any) => {
		e.preventDefault();
		router.back();
	};

	return (
		<Button onClick={handleClick} variant="ghost" size="icon">
			<ArrowLeftFromLine />
		</Button>
	);
}

export default BackButton;
