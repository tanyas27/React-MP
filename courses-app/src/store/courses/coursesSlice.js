import { createSlice } from '@reduxjs/toolkit';

const coursesInitialState = []; // default value - empty array. After success getting courses from API - array of courses.

export const coursesSlice = createSlice({
	name: 'courses',
	initialState: coursesInitialState,
	reducers: {
		saveNewCourse: (state, action) => {
			const courses = [...state];
			courses.push(action.payload);
			return [...courses];
		},
		deleteCourse: (state, action) => {
			let courses = [...state];
			courses = courses.filter((course) => course.id !== action.payload);
			return [...courses];
		},
		updateCourse: () => {},
		getCourses: (state, action) => {
			return [...action.payload];
		},
	},
});

export const { saveNewCourse, deleteCourse, updateCourse, getCourses } =
	coursesSlice.actions;

export default coursesSlice.reducer;
