import Image from 'next/image';
import Link from 'next/link';
function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<Link href={'/'}>
				<Image
					src={'/img/logoocop.png'}
					width={200}
					height={100}
					alt="logo_ocop"
				/>
			</Link>
			{children}
		</div>
	);
}

export default layout;
