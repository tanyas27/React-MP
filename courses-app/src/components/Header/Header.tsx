import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../common/Button/Button';
import { RootState } from '../../store';
import { deleteToken, removeUser } from '../../store/user/userSlice';
import { IStoredUser } from '../interface';
import { Logo } from './components/Logo/Logo';
import './Header.css';

export const Header: React.FC = () => {
	const user = useSelector<RootState, IStoredUser['name']>(
		(state) => state.user.name
	);
	const dispatch = useDispatch();
	const nav = useNavigate();
	const isAuth = localStorage.getItem('AccessToken');
	const logoutHandler = async () => {
		dispatch(deleteToken());
		dispatch(removeUser());
		nav('./login');
	};

	return (
		<header>
			<Logo />
			{isAuth && (
				<div className='user'>
					<strong className='user-name'>{user}</strong>
					<CustomButton role='contained' click={logoutHandler}>
						Logout
					</CustomButton>
				</div>
			)}
		</header>
	);
};
