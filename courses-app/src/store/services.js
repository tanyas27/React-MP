const baseUrl = 'http://localhost:4000/';

export const getAllCourses = () => {
	return fetch(`${baseUrl}courses/all`);
};

export const getAllAuthors = () => {
	return fetch(`${baseUrl}authors/all`);
};

export const loginUser = (user) => {
	return fetch(`${baseUrl}login`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const registerUser = (user) => {
	return fetch(`${baseUrl}register`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
