"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SearchFormValidate,
  SearchFormValidateType,
} from "@/schemaValidations/form/searchForm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
function FormSearch() {
  const form = useForm<SearchFormValidateType>({
    resolver: zodResolver(SearchFormValidate),
    defaultValues: {
      type: "PRODUCT",
      q: "",
    },
  });

  const onSubmit = (data: SearchFormValidateType) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-row justify-center items-center gap-1'
      >
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Product' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='PRODUCT'>Product</SelectItem>
                  <SelectItem value='SHOP'>Shop</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='q'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

export default FormSearch;
