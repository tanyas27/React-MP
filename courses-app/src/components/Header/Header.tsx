import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import './Header.css';

export const Header: React.FC = () => {
	const user = localStorage.getItem('Name');
	const nav = useNavigate();
	const logoutHandler = async () => {
		localStorage.clear();
		nav('./login');
	};

	return (
		<header>
			<Logo />
			{user && (
				<div className='user'>
					<strong className='user-name'>{user}</strong>
					<CustomButton role='dark' buttonText='Logout' click={logoutHandler} />
				</div>
			)}
		</header>
	);
};
