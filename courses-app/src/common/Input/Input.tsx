import React from 'react';

interface IInputProps {
	clickFn: (key: string) => void;
	placeholderText: string;
}

export const CustomInput: React.FC<IInputProps> = ({
	clickFn,
	placeholderText,
}) => {
	return (
		<input
			placeholder={placeholderText}
			onChange={(e) => clickFn(e.target.value)}
		/>
	);
};
