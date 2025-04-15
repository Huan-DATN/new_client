import { createSlice } from '@reduxjs/toolkit';

type CurrentProductState = {
	productId: number;
	quantity: number;
};

// Define the initial state using that type
const initialState: CurrentProductState = {
	productId: 0,
	quantity: 1,
};

export const currentProductSlice = createSlice({
	name: 'currentProduct',
	initialState,
	reducers: {
		increment: (state) => {
			state.quantity += 1;
		},
		decrement: (state) => {
			if (state.quantity > 1) {
				state.quantity -= 1;
			}
		},
		setProductId: (state, action) => {
			state.productId = action.payload;
			state.quantity = 1;
		},
	},
});

// Action creators are generated for each case reducer function
export const { increment, decrement, setProductId } =
	currentProductSlice.actions;

export default currentProductSlice.reducer;
