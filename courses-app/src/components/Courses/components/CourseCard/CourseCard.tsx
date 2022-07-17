import React from 'react';
import moment from 'moment';
import { CustomButton } from '../../../../common/Button/Button';
import { mockedAuthorsList } from '../../../../constants';
import './CourseCard.css';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICourseCardProps } from '../../../interface';

export const CourseCard: React.FC<ICourseCardProps> = ({ data }) => {
	const loc = useLocation();
	const nav = useNavigate();

	const authorsList = mockedAuthorsList
		.filter((authorObject) => data.authors.includes(authorObject.id))
		.map((author) => author.name)
		.join(', ');

	const showCourseHandler = (id: string) => {
		const path = loc.pathname + '/' + id;
		nav(path);
	};

	return (
		<section className='course-card'>
			<div className='course-left-data'>
				<h2 className='course-title'>{data.title}</h2>
				<div className='course-desc'>{data.description}</div>
			</div>
			<div className='course-right-data'>
				<div>
					<strong>Authors</strong>: {authorsList}
				</div>
				<div>
					<strong>Duration</strong>: {getCourseDuration(data.duration)}
				</div>
				<div>
					<strong>Created Date</strong>:{' '}
					{moment(data.creationDate).format('DD.MM.YYYY')}
				</div>
				<CustomButton
					buttonText='Show Course'
					role='info'
					click={() => showCourseHandler(data.id)}
				/>
			</div>
		</section>
	);
};
