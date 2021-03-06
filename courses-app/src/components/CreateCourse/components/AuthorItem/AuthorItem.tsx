import React from 'react';
import { CustomButton } from '../../../../common/Button/Button';

type editOperation = 'Add' | 'Delete';

interface IAuthorItemProps {
	authorName: string;
	edit: editOperation;
	editAuthor: () => void;
}

export const AuthorItem: React.FC<IAuthorItemProps> = ({
	authorName,
	edit,
	editAuthor,
}) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				margin: '5px',
			}}
		>
			<span>{authorName}</span>
			<CustomButton
				role='outlined'
				color={edit === 'Add' ? 'success' : 'error'}
				click={editAuthor}
			>
				{`${edit} author`}
			</CustomButton>
		</div>
	);
};
