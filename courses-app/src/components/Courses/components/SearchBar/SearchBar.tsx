import React, { useState } from 'react';
import { CustomButton } from '../../../../common/Button/Button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './SearchBar.css';
import { TextField } from '@mui/material';

interface ISearchBarProps {
	searchFn: (key: string) => void;
}

export const SearchBar: React.FC<ISearchBarProps> = ({ searchFn }) => {
	const [searchKey, setSearchKey] = useState<string>('');

	return (
		<div className='search-bar'>
			<TextField
				id='outlined-basic'
				onChange={(e) => setSearchKey(e.target.value)}
				placeholder='Enter course name...'
				focused
				size='small'
				fullWidth
			/>
			<CustomButton
				role='contained'
				click={() => searchFn(searchKey)}
				startIcon={<SearchOutlinedIcon />}
			>
				Search
			</CustomButton>
		</div>
	);
};
