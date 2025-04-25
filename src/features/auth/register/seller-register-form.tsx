'use client';
import authRequest from '@/api/authRequest';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/context/app-provider';
import { handleErrorApi } from '@/lib/utils';
import {
	SellerRegisterBody,
	SellerRegisterBodyType,
} from '@/schemaValidations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function SellerRegisterForm() {
	const [loading, setLoading] = useState(false);
	const { setUser } = useAppContext();
	const router = useRouter();
	const form = useForm<SellerRegisterBodyType>({
		resolver: zodResolver(SellerRegisterBody),
		defaultValues: {
			role: 'SELLER',
			shopName: '',
			phone: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	async function onSubmit(values: SellerRegisterBodyType) {
		if (loading) return;
		setLoading(true);
		try {
			const result = await authRequest.register(values);
			await authRequest.auth({
				sessionToken: result.payload.data.token,
				expiresAt: result.payload.data.expiresAt,
			});

			setUser(result.payload.data.user);
			toast.success(result.payload.message);
			setUser(result.payload.data.user);
			router.push('/');
			router.refresh();
		} catch (error: any) {
			handleErrorApi({
				error,
				setError: form.setError,
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-2 max-w-[400px] flex-shrink-0 w-full"
				noValidate
			>
				<FormField
					control={form.control}
					name="shopName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên shop</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Điện thoại</FormLabel>
							<FormControl>
								<Input type="tel" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mật khẩu</FormLabel>
							<FormControl>
								<Input {...field} type="password" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nhập lại mật khẩu</FormLabel>
							<FormControl>
								<Input {...field} type="password" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="!mt-8 w-full">
					Đăng kí
				</Button>
			</form>
			<div className="text-center mt-8">
				Bạn đã có tài khoản?
				<Link href={'/auth/login'} className="font-bold">
					{' '}
					Hãy đăng nhập
				</Link>
			</div>
		</Form>
	);
}

export default SellerRegisterForm;
