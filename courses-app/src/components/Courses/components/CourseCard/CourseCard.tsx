import React from 'react';
import moment from 'moment';
import { CustomButton } from '../../../../common/Button/Button';
import { mockedAuthorsList } from '../../../../constants';
import './CourseCard.css';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICourseCardProps } from '../../../interface';
import { useDispatch } from 'react-redux';
import { deleteCourse } from '../../../../store/courses/coursesSlice';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const CourseCard: React.FC<ICourseCardProps> = ({ data }) => {
	const dispatch = useDispatch();
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

	const deleteCourseHandler = (id: string) => {
		dispatch(deleteCourse(id));
	};

	return (
		<section className={'course-card box'}>
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
					{moment(data.creationDate, 'DD/MM/YYYY').format('DD.MM.YYYY')}
				</div>
				<CustomButton role='outlined' click={() => showCourseHandler(data.id)}>
					Show Course
				</CustomButton>
				<IconButton
					aria-label='delete'
					onClick={() => deleteCourseHandler(data.id)}
				>
					<DeleteIcon />
				</IconButton>
				<IconButton
					aria-label='edit'
					onClick={() => deleteCourseHandler(data.id)}
				>
					<EditIcon />
				</IconButton>
			</div>
		</section>
	);
};
