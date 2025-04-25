export async function POST(request: Request) {
	const body = await request.json();
	const sessionToken = body.sessionToken as string;
	const expiresAt = body.expiresAt as string;

	if (!sessionToken) {
		return Response.json(
			{ message: 'Không nhận được sessionToken' },
			{ status: 400 }
		);
	}

	const expiresDate = new Date(expiresAt).toUTCString();

	return Response.json(sessionToken, {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Set-Cookie': `sessionToken=${sessionToken}; path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
		},
	});
}
