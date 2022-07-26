import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
	isAuth: false, // default value - false. After success login - true
	name: '', // default value - empty string. After success login - name of user
	email: '', // default value - empty string. After success login - email of user
	token: '', // default value - empty string or token value from localStorage.
	// After success login - value from API /login response. See Swagger.
};

export const userSlice = createSlice({
	name: 'user',
	initialState: userInitialState,
	reducers: {
		saveToken: (state, action) => {
			localStorage.setItem('AccessToken', action.payload);
			localStorage.setItem('Name', state.name);
		},
		deleteToken: (state) => {
			localStorage.removeItem('AccessToken');
		},
		saveUser: (state, action) => {
			const val = action.payload;
			const user = {
				...state,
				isAuth: true,
				name: val.user.name,
				email: val.user.email,
				token: val.result,
			};
			return user;
		},
		removeUser: (state) => {
			return userInitialState;
		},
	},
});

// this is for dispatch
export const { saveToken, deleteToken, saveUser, removeUser } =
	userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
