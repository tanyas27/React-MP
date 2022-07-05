import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomButton } from '../../common/Button/Button';
import { mockedCoursesList } from '../../constants';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import './Courses.css';

export const Courses: React.FC = () => {
	const [courses, setCourses] = useState(mockedCoursesList);

	const searchHandler = (searchKey: string) => {
		if (searchKey.length) {
			searchKey = searchKey.toLowerCase();
			const data = mockedCoursesList.filter(
				(course) =>
					course.title.toLowerCase().includes(searchKey) ||
					course.id.toLowerCase() === searchKey
			);
			setCourses(data);
		} else {
			setCourses(mockedCoursesList);
		}
	};

	return (
		<>
			<div className='toolbar'>
				<SearchBar searchFn={searchHandler} />
				<Link to='/add-course'>
					<CustomButton
						role='danger'
						click={() => {}}
						buttonText='Add new course'
					/>
				</Link>
			</div>
			{courses.map((course) => (
				<CourseCard data={course} key={course.id} />
			))}
		</>
	);
};
