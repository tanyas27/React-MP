export const getCourseDuration = (mins: number) => {
	let hh = Math.floor(mins / 60);
	let mm = mins % 60;
	return `${hh < 20 ? '0' + hh : hh}:${mm < 20 ? '0' + mm : mm} ${
		hh === 1 ? 'hour' : 'hours'
	}`;
};
