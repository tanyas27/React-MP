import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomButton } from '../../common/Button/Button';
import { backIcon } from '../../img/Icons';
import { RootState } from '../../store';
import { IAuthorList, ICourseInfo } from '../interface';
import './CourseInfo.css';

export const CourseInfo = () => {
	const { courseId } = useParams();
	const nav = useNavigate();
	const [courseData, setCourseData] = useState<ICourseInfo>();
	const allCourses = useSelector<RootState, ICourseInfo[]>(
		(state) => state.courses
	);
	const allAuthors = useSelector<RootState, IAuthorList>(
		(state) => state.authors
	);

	const courseAuthors = allAuthors
		.filter((author) => courseData?.authors.includes(author.id))
		.map((item) => <div key={item.id}>{item.name}</div>);

	console.log(courseAuthors);

	const searchCourseHandler = () => {
		if (courseId?.length) {
			const id = courseId.toLowerCase();
			const data = allCourses.filter(
				(course) => course.id.toLowerCase() === id
			);
			return data[0];
		}
	};

	const backButtonHandler = () => {
		nav(-1);
	};

	useEffect(() => {
		setCourseData(searchCourseHandler());
	}, [allCourses]);

	return (
		<div className='course-info'>
			<CustomButton role='text' click={backButtonHandler}>
				{backIcon} Back to courses
			</CustomButton>
			<h2 style={{ textAlign: 'center' }}>{courseData?.title}</h2>
			<div className='course-info-desc'>
				<p>{courseData?.description}</p>
				<div className='course-info-details'>
					<p>
						<strong>ID: </strong>
						{courseData?.id}
					</p>
					<p>
						<strong>Duration: </strong>
						{courseData?.duration}
					</p>
					<p>
						<strong>Created: </strong>
						{courseData?.creationDate}
					</p>
					<p>
						<strong>Authors: </strong>
						<>{courseAuthors}</>
					</p>
				</div>
			</div>
		</div>
	);
};
