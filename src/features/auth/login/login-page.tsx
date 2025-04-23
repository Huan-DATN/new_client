import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './login-form';

export default function LoginPage() {
	return (
		<>
			<div className="flex flex-col justify-center items-center h-screen">
				<Link href={'/'}>
					<Image
						src={'/img/logoocop.png'}
						width={200}
						height={100}
						alt="logo_ocop"
					/>
				</Link>
				<LoginForm />
			</div>
		</>
	);
}
