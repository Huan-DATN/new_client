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

		if (data.type === 'PRODUCT') {
			console.log(params.toString());
			router.replace(`/buyer/products?${params.toString()}`);
		} else {
			router.replace(`/buyer/shop?${params.toString()}`);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="relative flex w-full max-w-[580px] rounded-lg overflow-hidden shadow-sm"
			>
				<div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-gray-400">
					<Search className="h-5 w-5" />
				</div>

				<FormField
					control={form.control}
					name="q"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<Input
									className="pl-10 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 h-11"
									placeholder="Tìm kiếm sản phẩm, danh mục, shop..."
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-[130px] border-0 rounded-none border-l border-l-gray-200 focus:ring-0">
										<SelectValue placeholder="Loại" />
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

				<Button
					type="submit"
					className="px-5 rounded-none bg-green-700 hover:bg-green-800"
				>
					Tìm
				</Button>
			</form>
		</Form>
	);
}

export default FormSearch;
