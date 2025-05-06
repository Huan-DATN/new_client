import currentProductReducer from '@/redux/currentProduct/currentProductReducer';
import { configureStore } from '@reduxjs/toolkit';
import planOrderReducer from './planOrder/planOrderReducer';

export const store = configureStore({
	reducer: {
		currentProduct: currentProductReducer,
		planOrder: planOrderReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
