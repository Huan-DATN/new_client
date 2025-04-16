import cartRequest from '@/api/cartRequest';
import { HttpError } from '@/lib/http';
import { cookies } from 'next/headers';

export async function DELETE(
	request: Request,
	{ params }: { params: { slug: string[] } }
) {
	try {
		const slug = params.slug;
		const id = params.slug[0];
		const sessionToken = (await cookies()).get('sessionToken')?.value;

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

		await cartRequest.removeItemFromNextServerToServer(
			sessionToken,
			Number(id)
		);

		return new Response(
			JSON.stringify({
				message: 'Item removed from cart',
				id,
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
