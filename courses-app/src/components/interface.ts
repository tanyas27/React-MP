export interface ICourseCardProps {
	data: {
		id: string;
		title: string;
		description: string;
		creationDate: string;
		duration: number;
		authors: string[];
	};
}

export interface ICourseInfo {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface IUser {
	name: string;
	password: string;
	email: string;
}

export interface IAuthor {
	id: string;
	name: string;
}

export type IAuthorList = IAuthor[];
