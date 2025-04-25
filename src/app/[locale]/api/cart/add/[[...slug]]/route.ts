import cartRequest from '@/api/cartRequest';
import { HttpError } from '@/lib/http';
import { cookies } from 'next/headers';

type AddToCartParams = {
	productId: number;
	quantity: number;
};

export async function POST(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		const slug = params.slug;
		const sessionToken = (await cookies()).get('sessionToken')?.value;
		const res = (await request.json()) as AddToCartParams;

		if (!sessionToken) {
			return new Response(
				JSON.stringify({
					message: 'No session token found',
				}),
				{
					status: 401,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const body = {
			productId: Number(slug[0]),
			quantity: res.quantity,
		};

		await cartRequest.addItemFromNextServerToServer(sessionToken, body);

		return new Response(
			JSON.stringify({
				message: 'Item added to cart',
				slug,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		if (error instanceof HttpError) {
			return Response.json(error.payload, { status: error.status });
		} else {
			return Response.json(
				{
					message: 'Lỗi không xác định',
				},
				{
					status: 500,
				}
			);
		}
	}
}
