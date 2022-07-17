import { useRef, RefObject, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { CustomButton } from '../../common/Button/Button';
import { IUser } from '../interface';
import './Login.css';

export const Login = () => {
	const formRef = useRef() as RefObject<HTMLFormElement>;
	const navigate = useNavigate();

	const loginUser = async (newUser: IUser) => {
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		let res = await response.json();
		localStorage.setItem('AccessToken', res.result);
		localStorage.setItem('Name', res.user.name);
		return res;
	};

	const submitFormHandler = () => {
		if (formRef.current) {
			const newUser = {
				name: '',
				email: formRef.current['user-email'].value,
				password: formRef.current['password'].value,
			};
			loginUser(newUser);
			navigate('/courses');
		}
	};

	return (
		<div className='login'>
			<h2>Login</h2>
			<Form onSubmit={submitFormHandler} ref={formRef}>
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
					buttonText='Login'
					type='submit'
					role='outline-success'
					click={submitFormHandler}
				/>
				<div>
					If you not have an account you can{' '}
					<NavLink to='/registration'>Registration</NavLink>
				</div>
			</Form>
		</div>
	);
};
