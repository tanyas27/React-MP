import React from 'react';
import { Button } from 'react-bootstrap';

interface iButtonProps {
	buttonText: string;
	click?: () => void;
	role: string;
	type?: 'button' | 'submit' | 'reset';
}

export const CustomButton: React.FC<iButtonProps> = ({
	buttonText,
	click,
	role,
	type = 'button',
}) => {
	return (
		<Button variant={role} onClick={click} type={type}>
			{buttonText}
		</Button>
	);
};
