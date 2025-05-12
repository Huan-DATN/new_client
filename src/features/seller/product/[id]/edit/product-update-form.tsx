'use client'
import productRequest from '@/api/productRequest';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { handleErrorApi } from '@/lib/utils';
import { CreateProductForm, CreateProductFormType } from '@/schemaValidations/form/createProduct';
import { CreateProductBodyType } from '@/schemaValidations/request/product';
import { ProductSchema } from '@/schemaValidations/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, FileImage, Info, Loader2, Package, PackageCheck, Tag, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import mediaRequest from '../../../../../api/mediaRequest';
type Product = z.infer<typeof ProductSchema>

function ProductUpdateForm({
  product,
  categoriesData,
  groupProductsData,
  citiesData,
}: {
  product: Product;
  categoriesData: any[];
  groupProductsData: any[];
  citiesData: any[];
}) {
  const [files, setFiles] = useState<File[] | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<CreateProductFormType>({
    resolver: zodResolver(CreateProductForm),
    defaultValues: {
      name: product.name,
      description: product.description || '',
      price: product.price,
      quantity: product.quantity,
      groupProductId: product.groupProductId,
      categories: product.categories ? product.categories.map(category => category.id) : [],
      cityId: product.city?.id || 0,
      imageUrls: product.images.map(image => image.publicUrl),
      isActive: product.isActive,
    }
  });

  useEffect(() => {
    console.log(form.getValues('categories'));
  }, [form.getValues('categories')]);

  // Handle file drop for image uploads
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles(prevFiles => {
        const newFiles = prevFiles ? [...prevFiles, ...acceptedFiles] : acceptedFiles;
        form.setValue(
          'imageUrls',
          newFiles.map(file => URL.createObjectURL(file))
        );
        return newFiles;
      });
    }
  }, [form]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  // Remove an image
  const removeImage = (index: number) => {
    if (files) {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      form.setValue(
        'imageUrls',
        updatedFiles.map(file => URL.createObjectURL(file))
      );
    }
  };

  async function onSubmit(values: CreateProductFormType) {
    if (loading) return;
		setLoading(true);

		try {
			let images: number[] = [];

			// Upload all images
      if (files && files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const formData = new FormData();
          formData.append('image', file as Blob);
          const uploadImageResult = await mediaRequest.uploadImage(formData);
          return uploadImageResult.payload.data.id;
        });
        images = await Promise.all(uploadPromises);
      } else {
        images = product.images.map(image => image.id);
      }

			const { imageUrls, ...body } = values;
			const bodyCreateProduct: CreateProductBodyType = {
				...body,
				images: images as any,
			};

			const response = await productRequest.update(product.id, bodyCreateProduct);

			toast.success(response.payload.message || "Thêm sản phẩm thành công");
			router.push('/seller/product');
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Product Information */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-5 w-5 text-primary" />
                  <h2 className="font-medium text-lg">Basic Information</h2>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Product Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product name"
                          type="text"
                          {...field}
                          className="disabled:bg-gray-500"
                        />
                      </FormControl>
                      <FormDescription>
                        The product name will be displayed to customers
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Detailed description of the product, features and highlights
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Images section */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileImage className="h-5 w-5 text-primary" />
                  <h2 className="font-medium text-lg">Product Images</h2>
                </div>

                {/* Existing Images */}
                {product.images && product.images.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Current Images</h3>
                      <p className="text-xs text-gray-500">Click on X to remove images</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {product.images.map((image, index) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-square relative border rounded-lg overflow-hidden">
                            <Image
                              src={image.publicUrl}
                              alt={`product-${index}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const currentImages = form.getValues('imageUrls');
                              form.setValue(
                                'imageUrls',
                                currentImages.filter((url) => url !== image.publicUrl)
                              );
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-80 hover:opacity-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="imageUrls"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add New Images <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div
                          {...getRootProps()}
                          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                            ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:bg-gray-50'}
                          `}
                        >
                          <input {...getInputProps()} ref={inputRef} />
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 rounded-full bg-primary/10">
                              <Upload className="h-6 w-6 text-primary" />
                            </div>
                            {isDragActive ? (
                              <p className="text-sm text-gray-700">Drop images here...</p>
                            ) : (
                              <>
                                <p className="text-sm text-gray-700">Drag and drop images here or click to select</p>
                                <p className="text-xs text-gray-500">JPG, PNG or WEBP (max 5MB)</p>
                              </>
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {files && files.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {files.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square relative border rounded-lg overflow-hidden">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`product-${index}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-80 hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pricing and inventory section */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-primary" />
                  <h2 className="font-medium text-lg">Price & Inventory</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field: { onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Price <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              min={0}
                              onChange={e => onChange(Number(e.target.value))}
                              placeholder="0"
                              {...field}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                              VND
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Product price after tax
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field: { onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Quantity <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder="0"
                            onChange={e => onChange(Number(e.target.value))}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Available stock quantity
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar column */}
          <div className="space-y-6">
            {/* Action card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-primary" />
                  <h2 className="font-medium text-lg">Actions</h2>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    <>
                      Update Product
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/seller/product')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>

            {/* Classification card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <PackageCheck className="h-5 w-5 text-primary" />
                  <h2 className="font-medium text-lg">Classification</h2>
                </div>

                <FormField
                  control={form.control}
                  name="groupProductId"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Product Group <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Select
                          value={String(value)}
                          onValueChange={(value) => onChange(Number(value))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select product group" />
                          </SelectTrigger>
                          <SelectContent>
                            {groupProductsData.map((group) => (
                              <SelectItem key={group.id} value={String(group.id)}>
                                {group.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cityId"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>City <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Select
                          value={String(value)}
                          onValueChange={(value) => onChange(Number(value))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {citiesData.map((city) => (
                              <SelectItem key={city.id} value={String(city.id)}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Show Product
                        </FormLabel>
                        <FormDescription>
                          Product will be visible to customers after update
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Categories card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-primary" />
                  <h2 className="font-medium text-lg">Categories</h2>
                </div>

                <ScrollArea className="h-[200px] pr-4">
                  {categoriesData.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="categories"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 py-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ProductUpdateForm
