import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../common/Button/Button';
import { RootState } from '../../store';
import { getAuthors } from '../../store/authors/authorSlice';
import { getCourses } from '../../store/courses/coursesSlice';
import { getAllCourses } from '../../store/services';
import { ICourseInfo } from '../interface';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import './Courses.css';

export const Courses: React.FC = () => {
	const [courses, setCourses] = useState<ICourseInfo[]>([]);
	const allCourses = useSelector<RootState, ICourseInfo[]>(
		(state) => state.courses
	);
	const nav = useNavigate();
	const dispatch = useDispatch();

	const fetchCourses = async () => {
		const response = await getAllCourses().then((res) => res.json());
		dispatch(getCourses(response.result));
		setCourses(response.result);
	};

	const fetchAuthors = async () => {
		const res = await (await fetch('http://localhost:4000/authors/all')).json();
		dispatch(getAuthors(res.result));
	};

	const searchHandler = (searchKey: string) => {
		if (searchKey.length) {
			searchKey = searchKey.toLowerCase();
			const data = allCourses.filter(
				(course) =>
					course.title.toLowerCase().includes(searchKey) ||
					course.id.toLowerCase() === searchKey
			);
			setCourses(data);
		} else {
			setCourses(allCourses);
		}
	};

	useEffect(() => {
		if (!allCourses.length) {
			fetchCourses();
			fetchAuthors();
		}
	}, []);

	useEffect(() => {
		setCourses(allCourses);
	}, [allCourses]);

	return (
		<>
			<div className='toolbar'>
				<SearchBar searchFn={searchHandler} />
				<CustomButton role='contained' click={() => nav('/courses/add')}>
					Add new course
				</CustomButton>
			</div>
			{courses.length > 0 &&
				courses.map((course) => <CourseCard data={course} key={course.id} />)}
		</>
	);
};
