import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomButton } from '../../common/Button/Button';
import { mockedCoursesList } from '../../constants';
import { ICourseInfo } from '../interface';
import './CourseInfo.css';

export const CourseInfo = () => {
	const { courseId } = useParams();
	const nav = useNavigate();
	const [courseData, setCourseData] = useState<ICourseInfo>();
	const searchCourseHandler = () => {
		if (courseId?.length) {
			const id = courseId.toLowerCase();
			const data = mockedCoursesList.filter(
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
	}, []);

	return (
		<>
			<CustomButton
				buttonText='< Back to courses'
				role='light'
				click={backButtonHandler}
			/>
			<h2>{courseData?.title}</h2>
			<div className='course-info'>
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
						{courseData?.authors}
					</p>{' '}
				</div>
			</div>
		</>
	);
};
