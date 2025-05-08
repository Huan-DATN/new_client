'use client';

import ratingRequest from '@/api/ratingRequest';
import { RatingListResType } from '@/schemaValidations/response/rating';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

function CommentsList({ id }: { id: number }) {
	// This component is responsible for displaying the list of comments for a product.
	const [comments, setComments] = useState<RatingListResType['data']>([]);

	useEffect(() => {
		async function fetchComments() {
			const res = await ratingRequest.getRating(id);

			setComments(res.payload.data);
		}
		fetchComments();
	}, [id]);

	return (
		<div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm w-3/4">
			<div className="flex flex-col gap-4 w-full">
				<h3 className="text-lg font-semibold">Bình luận</h3>
				{comments.length > 0 ? (
					comments.map((comment) => (
						<div
							key={comment.id}
							className="border p-4 rounded-lg shadow-sm w-full"
						>
							<p className="font-semibold">{comment.user?.email}</p>
							<p className="text-gray-600">{comment.comment}</p>
							<p className="text-gray-500 text-sm">
								{new Date(comment.createdAt).toLocaleDateString('vi-VN', {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
								})}
							</p>
							<div className="flex space-x-1 mt-2">
								{[...Array(5)].map((_, index) => (
									<span key={index} className="text-yellow-500">
										{index < comment.rating ? (
											<Star color="#ff0" />
										) : (
											<Star color="#000000" strokeWidth={1} />
										)}
									</span>
								))}
							</div>
						</div>
					))
				) : (
					<p className="text-gray-500">Chưa có bình luận nào.</p>
				)}
			</div>
		</div>
	);
}

export default CommentsList;
