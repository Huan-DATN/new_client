import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

type CurrentProductState = {
	productId: number;
	quantity: number;
	numberStock: number;
};

// Define the initial state using that type
const initialState: CurrentProductState = {
	productId: 0,
	quantity: 1,
	numberStock: 0,
};

export const currentProductSlice = createSlice({
	name: 'currentProduct',
	initialState,
	reducers: {
		increment: (state) => {
			if (state.quantity >= state.numberStock) {
				toast.error('Số lượng sản phẩm đã đạt mức tối đa');
				return;
			}
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
		setNumberStock: (state, action) => {
			state.numberStock = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { increment, decrement, setProductId, setNumberStock } =
	currentProductSlice.actions;

export default currentProductSlice.reducer;
