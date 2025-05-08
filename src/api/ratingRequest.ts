import http from '../lib/http';
import {
	RatingListResType,
	RatingSummaryResType,
} from '../schemaValidations/response/rating';

const ratingRequest = {
	createRating: async (
		sessionToken: string,
		orderId: number,
		productId: number,
		data: any
	) => {
		return await http.post(`/rating/product/${orderId}/${productId}`, data, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	getRating: async (productId: number) => {
		return await http.get<RatingListResType>(
			`/rating/product/${productId}`,
			{}
		);
	},
	getRatingSummary: async (productId: number) => {
		return await http.get<RatingSummaryResType>(
			`/rating/product/${productId}/summary`,
			{}
		);
	},
};

export default ratingRequest;
