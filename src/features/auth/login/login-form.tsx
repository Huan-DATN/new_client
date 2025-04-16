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
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	const { setUser } = useAppContext();
	const form = useForm<LoginBodyType>({
		resolver: zodResolver(LoginBody),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const router = useRouter();

	async function onSubmit(values: LoginBodyType) {
		if (loading) return;
		setLoading(true);
		try {
			const result = await authRequest.login(values);
			await authRequest.auth({
				sessionToken: result.payload.data.token,
				expiresAt: result.payload.data.expiresAt,
			});

			setUser(result.payload.data.user);

			toast('Đăng nhập thành công', {
				description: result.payload.message,
			});

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
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên đăng nhập</FormLabel>
							<FormControl>
								<Input {...field} />
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
				<Button type="submit" className="!mt-8 w-full">
					Đăng nhập
				</Button>
			</form>
			<div className="text-center mt-8">
				Bạn chưa có tài khoản?
				<Link href={'/register'} className="font-bold">
					{' '}
					Đăng ký ngay
				</Link>
			</div>
		</Form>
	);
};

export default LoginForm;
