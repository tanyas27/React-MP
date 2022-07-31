import { createSlice } from '@reduxjs/toolkit';

const authorsInitialState = {
	authorsList: [],
	status: 'idle', // 'idle' | 'loading' | 'sucess' | 'failed'
	error: null,
};

export const authorSlice = createSlice({
	name: 'authors',
	initialState: authorsInitialState,
	reducers: {
		saveNewAuthor: (state, action) => {
			const authors = [...state.authorsList];
			authors.push(action.payload);
			return { ...state, authorsList: authors };
		},
		getAuthors: (state, action) => {
			return { ...state, authorsList: action.payload };
		},
	},
});

export const { saveNewAuthor, getAuthors } = authorSlice.actions;

export default authorSlice.reducer;
