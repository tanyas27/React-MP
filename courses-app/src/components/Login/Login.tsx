import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { CustomButton } from '../../common/Button/Button';
import { saveToken, saveUser } from '../../store/user/userSlice';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Box } from '@mui/system';
import { IUser } from '../interface';
import './Login.css';

export const Login = () => {
	const [user, setUser] = useState<IUser>({
		name: '',
		email: '',
		password: '',
	});
	const nav = useNavigate();
	const dispatch = useDispatch();

	const setUserDetails = (name: string, value: string) => {
		setUser({ ...user, [name]: value });
	};

	const loginUser = async () => {
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		let res = await response.json();
		dispatch(saveToken(res.result));
		dispatch(saveUser(res));
		return res;
	};

	const submitFormHandler = async (event: FormEvent) => {
		event?.preventDefault();
		if (user.email.length !== 0 && user.password.length !== 0) {
			let result = await loginUser();
			if (result) {
				nav('/courses', { replace: true });
			}
		} else {
			alert('Please fill required details!');
		}
	};

	return (
		<div className={'login box'}>
			<h2>Login</h2>
			<Box
				id='login-form'
				component='form'
				onSubmit={(event: FormEvent) => submitFormHandler(event)}
				sx={{
					'& .MuiTextField-root': { m: 2, width: '25ch' },
				}}
				autoComplete='off'
			>
				<FormControl fullWidth sx={{ m: 2 }}>
					<InputLabel htmlFor='outlined-email'>Email Address</InputLabel>
					<OutlinedInput
						required
						id='outlined-email'
						type='email'
						label='Email address'
						placeholder='Enter email'
						name='email'
						onChange={(e) => setUserDetails(e.target.name, e.target.value)}
					/>
				</FormControl>
				<FormControl fullWidth sx={{ m: 2 }}>
					<InputLabel htmlFor='outlined-password'>Password</InputLabel>
					<OutlinedInput
						required
						id='outlined-password'
						type='password'
						label='Password'
						placeholder='Enter password'
						name='password'
						onChange={(e) => setUserDetails(e.target.name, e.target.value)}
					/>
				</FormControl>

				<CustomButton
					type='submit'
					role='contained'
					color='success'
					fullWidth={true}
				>
					Login
				</CustomButton>
				<div>
					If you not have an account you can{' '}
					<NavLink to='/registration'>Registration</NavLink>
				</div>
			</Box>
		</div>
	);
};
