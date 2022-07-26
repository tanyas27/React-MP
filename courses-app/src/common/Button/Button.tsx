import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';

interface iButtonProps {
	children: ReactNode;
	click?: () => void;
	role: 'text' | 'contained' | 'outlined';
	type?: 'button' | 'submit' | 'reset';
	color?: 'success' | 'error' | 'secondary' | 'warning' | 'info';
	startIcon?: ReactNode;
	fullWidth?: boolean;
}

export const CustomButton: React.FC<iButtonProps> = ({
	children,
	click,
	role,
	color,
	type = 'button',
	startIcon,
	fullWidth = false,
}) => {
	return (
		<Button
			variant={role}
			onClick={click}
			type={type}
			color={color}
			startIcon={startIcon}
			style={{ margin: '5px' }}
			fullWidth={fullWidth}
		>
			{children}
		</Button>
	);
};
