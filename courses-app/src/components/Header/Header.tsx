import React from 'react';
import { CustomButton } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import './Header.css';

export const Header: React.FC = () => {
	return (
		<header>
			<Logo />
			<div className='user'>
				<strong className='user-name'>Tanya Singh</strong>
				<CustomButton role='dark' buttonText='Logout' click={() => {}} />
			</div>
		</header>
	);
};
