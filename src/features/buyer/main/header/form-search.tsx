'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	SearchFormValidate,
	SearchFormValidateType,
} from '@/schemaValidations/form/searchForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
function FormSearch() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const form = useForm<SearchFormValidateType>({
		resolver: zodResolver(SearchFormValidate),
		defaultValues: {
			type: 'PRODUCT',
			q: '',
		},
	});

	const onSubmit = (data: SearchFormValidateType) => {
		const params = new URLSearchParams(searchParams.toString());
		if (data.q) {
			params.set('name', data.q);
		} else {
			params.delete('name');
		}

		router.push(`/buyer/products?${params.toString()}`);
		router.refresh();
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-row justify-center items-center gap-1"
			>
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl className="w-32">
									<SelectTrigger>
										<SelectValue placeholder="Product" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="PRODUCT">Sản phẩm</SelectItem>
									<SelectItem value="SHOP">Shop</SelectItem>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="q"
					render={({ field }) => (
						<FormItem>
							<FormControl className="w-96">
								<Input placeholder="Nhập thông tin cần tìm" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit" variant="ghost" size="icon">
					<Search className="font-white bg-green-600" />
				</Button>
			</form>
		</Form>
	);
}

export default FormSearch;
