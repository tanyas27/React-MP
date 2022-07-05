import moment from 'moment';
import React, { useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { CustomButton } from '../../common/Button/Button';
import { mockedAuthorsList, mockedCoursesList } from '../../constants';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { AuthorItem } from './components/AuthorItem/AuthorItem';
import './CreateCourse.css';

interface IAuthor {
	id: string;
	name: string;
}
type IAuthorList = IAuthor[];

export const CreateCourse: React.FC = () => {
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [duration, setDuration] = useState<number>(0);
	const [courseAuthors, setCourseAuthors] = useState<IAuthorList>([]);
	const authorNameInputRef = useRef<HTMLInputElement>(null);
	const courseTitleInputRef = useRef<HTMLInputElement>(null);
	const courseDescInputRef = useRef<HTMLTextAreaElement>(null);

	const createAuthorHandler = () => {
		if (authorNameInputRef.current) {
			const name = authorNameInputRef.current.value;
			const author = {
				name,
				id: uuidv4(),
			};
			const authorList = [...authors];
			authorList.push(author);
			setAuthors(authorList);
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

		if (titleRef?.value === '' || descriptionRef?.value === '') {
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
			mockedCoursesList.push(course);
			titleRef.value = '';
			descriptionRef.value = '';
		}
	};

	return (
		<Form>
			<div className='create-course-header'>
				<Form.Group className='mb-3'>
					<Form.Label>Title</Form.Label>
					<span style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Form.Control
							type='text'
							placeholder='Enter title...'
							style={{ width: '30%' }}
							ref={courseTitleInputRef}
						/>
						<CustomButton
							buttonText='Create course'
							click={createCourseHandler}
							role='primary'
						/>
					</span>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Description</Form.Label>
					<Form.Control
						as='textarea'
						rows={3}
						ref={courseDescInputRef}
						placeholder='Enter description...'
					/>
				</Form.Group>
			</div>

			<Container className='authors-details'>
				<Row>
					<Col>
						<strong>Add author</strong>
						<Form.Group className='mb-3'>
							<Form.Label>Author name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter author name...'
								ref={authorNameInputRef}
							/>
							<CustomButton
								buttonText='Create author'
								click={() => createAuthorHandler()}
								role='outline-primary'
							/>
						</Form.Group>
					</Col>
					<Col>
						<strong>Authors</strong>
						<div className='authors-list'>
							{authors.map((author) => (
								<AuthorItem
									authorName={author.name}
									editAuthor={() => addCourseAuthorHandler(author)}
									edit='Add'
									key={author.id}
								/>
							))}
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<strong>Duration</strong>
						<Form.Group className='mb-3'>
							<Form.Label>Duration</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter duration in minutes...'
								onChange={(e) => setDuration(+e.target.value)}
							/>
							<div>Duration: {getCourseDuration(duration)}</div>
						</Form.Group>
					</Col>
					<Col>
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
					</Col>
				</Row>
			</Container>
		</Form>
	);
};
