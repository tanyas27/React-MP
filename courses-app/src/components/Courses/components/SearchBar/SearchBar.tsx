import React, { useState } from 'react';
import { CustomButton } from '../../../../common/Button/Button';
import { CustomInput } from '../../../../common/Input/Input';
import './SearchBar.css';

interface ISearchBarProps {
	searchFn: (key: string) => void;
}

export const SearchBar: React.FC<ISearchBarProps> = ({ searchFn }) => {
	const [searchKey, setSearchKey] = useState<string>('');

	return (
		<div className='search-bar'>
			<CustomInput
				clickFn={setSearchKey}
				placeholderText='Enter course name...'
			/>
			<CustomButton
				buttonText='Search'
				role='warning'
				click={() => searchFn(searchKey)}
			/>
		</div>
	);
};
