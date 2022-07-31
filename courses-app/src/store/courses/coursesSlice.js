import { createSlice } from '@reduxjs/toolkit';

const coursesInitialState = {
	coursesList: [],
	status: 'idle', // 'idle' | 'loading' | 'sucess' | 'failed'
	error: null,
};

export const coursesSlice = createSlice({
	name: 'courses',
	initialState: coursesInitialState,
	reducers: {
		saveNewCourse: (state, action) => {
			const coursesList = [...state.coursesList];
			coursesList.push(action.payload);
			return { ...state, coursesList };
		},
		deleteCourse: (state, action) => {
			let coursesList = [...state.coursesList];
			coursesList = coursesList.filter(
				(course) => course.id !== action.payload
			);
			return { ...state, coursesList };
		},
		updateCourse: () => {},
		getCourses: (state, action) => {
			//api fetch
			return { ...state, coursesList: action.payload };
		},
	},
});

export const { saveNewCourse, deleteCourse, updateCourse, getCourses } =
	coursesSlice.actions;

export default coursesSlice.reducer;
