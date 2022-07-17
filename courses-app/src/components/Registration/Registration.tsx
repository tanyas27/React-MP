import { FormEvent, useRef, RefObject } from 'react';
import { Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { CustomButton } from '../../common/Button/Button';
import { IUser } from '../interface';
import './Registration.css';

export const Registration = () => {
	const formRef = useRef() as RefObject<HTMLFormElement>;

	const createNewUser = async (newUser: IUser) => {
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();
		return result;
	};

	const submitFormHandler = (event: FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		if (formRef.current) {
			const newUser = {
				name: formRef.current['user-name'].value,
				email: formRef.current['user-email'].value,
				password: formRef.current['password'].value,
			};

			console.log(createNewUser(newUser));
		}
	};

	return (
		<div className='register'>
			<h2>Registration</h2>
			<Form onSubmit={(e) => submitFormHandler(e)} ref={formRef}>
				<Form.Group className='mb-3'>
					<Form.Label>Name</Form.Label>
					<Form.Control type='text' placeholder='Enter name' name='user-name' />
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						name='user-email'
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						name='password'
					/>
				</Form.Group>
				<CustomButton
					buttonText='Registration'
					role='outline-success'
					type='submit'
				/>
				<div>
					If you have an account you can <NavLink to='/login'>Login</NavLink>
				</div>
			</Form>
		</div>
	);
};
