import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	OutlinedInput,
} from '@mui/material';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { CustomButton } from '../../common/Button/Button';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { RootState } from '../../store';
import { saveNewAuthor } from '../../store/authors/authorSlice';
import { saveNewCourse } from '../../store/courses/coursesSlice';
import { IAuthor, IAuthorList } from '../interface';
import { AuthorItem } from './components/AuthorItem/AuthorItem';
import './CreateCourse.css';

export const CreateCourse: React.FC = () => {
	const authors = useSelector<RootState, IAuthorList>(
		(state) => state.authors.authorsList
	);
	const dispatch = useDispatch();

	const [duration, setDuration] = useState<number>(0);
	const [courseAuthors, setCourseAuthors] = useState<IAuthorList>([]);
	const authorNameInputRef = useRef<HTMLInputElement>(null);
	const courseTitleInputRef = useRef<HTMLInputElement>(null);
	const courseDescInputRef = useRef<HTMLTextAreaElement>(null);
	const navigate = useNavigate();

	const createAuthorHandler = () => {
		if (authorNameInputRef.current) {
			const name = authorNameInputRef.current.value;
			const author = {
				id: uuidv4(),
				name,
			};
			dispatch(saveNewAuthor(author));
			authorNameInputRef.current.value = '';
		}
	};

	const addCourseAuthorHandler = (author: IAuthor) => {
		const courseAuthorList = [...courseAuthors];
		courseAuthorList.push(author);
		setCourseAuthors(courseAuthorList);
	};

	const deleteCourseAuthorHandler = (author: IAuthor) => {
		let courseAuthorList = [...courseAuthors];
		courseAuthorList = courseAuthorList.filter(
			(courseAuthor) => courseAuthor.id !== author.id
		);
		setCourseAuthors(courseAuthorList);
	};

	const createCourseHandler = () => {
		const titleRef = courseTitleInputRef.current;
		const descriptionRef = courseDescInputRef.current;

		if (
			titleRef?.value === '' ||
			descriptionRef?.value === '' ||
			duration === 0 ||
			courseAuthors.length === 0
		) {
			alert('Please fill all fields.');
		} else if (titleRef && descriptionRef) {
			const course = {
				id: uuidv4(),
				title: titleRef.value,
				description: descriptionRef.value,
				creationDate: moment().format('DD/MM/YYYY'),
				duration,
				authors: [...courseAuthors.map((author) => author.id)],
			};
			dispatch(saveNewCourse(course));
			titleRef.value = '';
			descriptionRef.value = '';
			setCourseAuthors([]);
			setDuration(0);
			navigate(-1);
		}
	};

	return (
		<>
			<Box
				id='login-form'
				component='form'
				onSubmit={() => {}}
				sx={{
					'& .MuiTextField-root': { m: 2, width: '25ch' },
				}}
				autoComplete='off'
			>
				<div className='create-course-header'>
					<div className='create-course-title'>
						<FormControl fullWidth sx={{ m: 2 }} style={{ width: '40%' }}>
							<InputLabel htmlFor='outlined-title'>Title</InputLabel>
							<OutlinedInput
								required
								id='outlined-title'
								type='text'
								label='Title'
								placeholder='Enter title...'
								inputRef={courseTitleInputRef}
							/>
						</FormControl>
						<CustomButton
							click={createCourseHandler}
							role='contained'
							color='success'
						>
							Create course
						</CustomButton>
					</div>
					<FormControl fullWidth sx={{ m: 2 }}>
						<InputLabel htmlFor='outlined-description'>Description</InputLabel>
						<OutlinedInput
							required
							id='outlined-description'
							type='text'
							multiline
							maxRows={4}
							label='Description'
							inputRef={courseDescInputRef}
							placeholder='Enter description...'
							fullWidth
						/>
					</FormControl>{' '}
				</div>
				<Grid
					id='create-course-border'
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				>
					<Grid
						item
						xs={6}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
						}}
					>
						<strong>Add author</strong>
						<FormControl fullWidth sx={{ m: 2 }} style={{ width: '40%' }}>
							<InputLabel htmlFor='outlined-author-name'>
								Author name
							</InputLabel>
							<OutlinedInput
								required
								id='outlined-author-name'
								type='text'
								label='Author name'
								placeholder='Enter author name...'
								inputRef={authorNameInputRef}
							/>
						</FormControl>
						<CustomButton click={() => createAuthorHandler()} role='contained'>
							Create author
						</CustomButton>
					</Grid>
					<Grid item xs={6}>
						<strong>Authors</strong>
						<div className='authors-list'>
							{authors.length > 0 &&
								authors.map((author) => (
									<AuthorItem
										authorName={author.name}
										editAuthor={() => addCourseAuthorHandler(author)}
										edit='Add'
										key={author.id}
									/>
								))}
						</div>
					</Grid>
					<Grid
						item
						xs={6}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
						}}
					>
						<strong>Duration</strong>
						<FormControl fullWidth sx={{ m: 2 }} style={{ width: '40%' }}>
							<InputLabel htmlFor='outlined-duration'>Duration</InputLabel>
							<OutlinedInput
								required
								id='outlined-duration'
								type='number'
								label='Duration'
								placeholder='Enter duration in minutes...'
								onChange={(e) => setDuration(+e.target.value)}
								fullWidth
							/>
						</FormControl>
						<strong>Duration: {getCourseDuration(duration)}</strong>
					</Grid>
					<Grid item xs={6}>
						<strong className='author-heading'>Course authors</strong>
						<div className='authors-list'>
							{courseAuthors.length === 0
								? 'Author list is empty'
								: courseAuthors.map((author) => (
										<AuthorItem
											authorName={author.name}
											editAuthor={() => deleteCourseAuthorHandler(author)}
											edit='Delete'
											key={author.id}
										/>
								  ))}
						</div>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};
