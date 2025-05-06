import { createSlice } from '@reduxjs/toolkit';

type CurrentProductState = [{ statusId: number; date: string }?];

// Define the initial state using that type
const initialState: CurrentProductState = [];

export const currentProductSlice = createSlice({
	name: 'currentProduct',
	initialState,
	reducers: {
		setStatusId: (state, action) => {
			const { statusId, date } = action.payload;
			const existingStatus = state.find(
				(status) => status?.statusId === statusId
			);
			if (existingStatus) {
				existingStatus.date = date;
			} else {
				state.push({ statusId, date });
			}
		},
		setDate: (state, action) => {
			const { statusId, date } = action.payload;
			const existingStatus = state.find(
				(status) => status?.statusId === statusId
			);
			if (existingStatus) {
				existingStatus.date = date;
			} else {
				state.push({ statusId, date });
			}
		},
	},
});

// Action creators are generated for each case reducer function
export default currentProductSlice.reducer;
export const { setStatusId, setDate } = currentProductSlice.actions;

// Selector function to get the date for a specific statusId
export const getDate = (
	state: CurrentProductState,
	statusId: number
): string | undefined => {
	const existingStatus = state.find((status) => status?.statusId === statusId);
	return existingStatus ? existingStatus.date : undefined;
};
