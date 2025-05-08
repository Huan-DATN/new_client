import { createSlice } from '@reduxjs/toolkit';

type RatingProductState = [
	{ productId: number; body: { ratings: number; comment: string } }?
];

// Define the initial state using that type
const initialState: RatingProductState = [];

export const ratingProductSlice = createSlice({
	name: 'ratingProduct',
	initialState,
	reducers: {
		setComment: (state, action) => {
			const { productId, body } = action.payload;
			const existingRating = state.find(
				(rating) => rating?.productId === productId
			);
			if (existingRating) {
				existingRating.body = {
					...existingRating.body,
					comment: body.comment,
				};
			} else {
				state.push({ productId, body });
			}
		},

		setRatings: (state, action) => {
			const { productId, body } = action.payload;
			const existingRating = state.find(
				(rating) => rating?.productId === productId
			);
			if (existingRating) {
				existingRating.body = {
					...existingRating.body,
					ratings: body.ratings,
				};
			} else {
				state.push({ productId, body });
			}
		},
	},
});

export default ratingProductSlice.reducer;
export const { setComment, setRatings } = ratingProductSlice.actions;

// Selector function to get the date for a specific statusId

export const getRating = (
	state: RatingProductState,
	productId: number
): number => {
	const existingRating = state.find(
		(rating) => rating?.productId === productId
	);
	// If the rating is not found, return 0

	return existingRating ? existingRating.body.ratings : 1;
};

export const getComment = (
	state: RatingProductState,
	productId: number
): string => {
	const existingRating = state.find(
		(rating) => rating?.productId === productId
	);
	return existingRating ? existingRating.body.comment : '';
};
