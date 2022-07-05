import React from 'react';
import moment from 'moment';
import { CustomButton } from '../../../../common/Button/Button';
import { mockedAuthorsList } from '../../../../constants';
import './CourseCard.css';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';

interface ICourseCardProps {
	data: {
		id: string;
		title: string;
		description: string;
		creationDate: string;
		duration: number;
		authors: string[];
	};
}

export const CourseCard: React.FC<ICourseCardProps> = ({ data }) => {
	const authorsList = mockedAuthorsList
		.filter((authorObject) => data.authors.includes(authorObject.id))
		.map((author) => author.name)
		.join(', ');

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
				<CustomButton buttonText='Show Course' role='info' click={() => {}} />
			</div>
		</section>
	);
};
