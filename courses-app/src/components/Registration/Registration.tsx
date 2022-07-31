import { FormEvent, useState } from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Box } from '@mui/system';
import { NavLink, useNavigate } from 'react-router-dom';
import { CustomButton } from '../../common/Button/Button';
import { IUser } from '../interface';
import './Registration.css';
import { registerUser } from '../../store/services';

export const Registration = () => {
	const [user, setUser] = useState<IUser>({
		name: '',
		email: '',
		password: '',
	});
	const nav = useNavigate();

	const setUserDetails = (name: string, value: string) => {
		setUser({ ...user, [name]: value });
	};

	const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		if (user.email.length !== 0 && user.password.length !== 0) {
			let result = await (await registerUser(user)).json();
			if (result) {
				nav('/login', { replace: true });
			}
		} else {
			alert('Please fill required details!');
		}
	};

	return (
		<div className={'register box'}>
			<h2>Registration</h2>
			<Box
				id='register-form'
				component='form'
				onSubmit={(event: FormEvent<HTMLFormElement>) =>
					submitFormHandler(event)
				}
				sx={{
					'& .MuiTextField-root': { m: 1, width: '30ch' },
				}}
				autoComplete='off'
			>
				<FormControl fullWidth sx={{ m: 2 }}>
					<InputLabel htmlFor='outlined-name'>Name</InputLabel>
					<OutlinedInput
						required
						id='outlined-name'
						type='text'
						label='Name'
						placeholder='Enter name'
						name='name'
						onChange={(e) => setUserDetails(e.target.name, e.target.value)}
					/>
				</FormControl>
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
						label='Password'
						type='password'
						placeholder='Enter password'
						name='password'
						onChange={(e) => setUserDetails(e.target.name, e.target.value)}
					/>
				</FormControl>
				<CustomButton
					role='contained'
					type='submit'
					color='success'
					fullWidth={true}
				>
					Registration
				</CustomButton>
				<div>
					If you have an account you can <NavLink to='/login'>Login</NavLink>
				</div>
			</Box>
		</div>
	);
};
