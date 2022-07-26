import { createSlice } from '@reduxjs/toolkit';

const authorsInitialState = []; // default value - empty array. After success getting authors from API - array of authors.

export const authorSlice = createSlice({
	name: 'authors',
	initialState: authorsInitialState,
	reducers: {
		saveNewAuthor: (state, action) => {
			const authors = [...state];
			authors.push(action.payload);
			return [...authors];
		},
		getAuthors: (state, action) => {
			return [...action.payload];
		},
	},
});

export const { saveNewAuthor, getAuthors } = authorSlice.actions;

export default authorSlice.reducer;
