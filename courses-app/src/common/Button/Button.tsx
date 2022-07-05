import React from 'react';
import { Button } from 'react-bootstrap';

interface iButtonProps {
	buttonText: string;
	click: () => void;
	role: string;
}

export const CustomButton: React.FC<iButtonProps> = ({
	buttonText,
	click,
	role,
}) => {
	return (
		<Button variant={role} onClick={click}>
			{buttonText}
		</Button>
	);
};
