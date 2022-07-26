import React from 'react';
import { Navigate } from 'react-router-dom';

interface IPrivateRouteProps {
	component: React.ComponentType;
	props?: string;
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({
	component: RouteComponent,
	...props
}) => {
	const isAuthenticated = () => {
		return localStorage.getItem('AccessToken') ? true : false;
	};

	return (
		<>
			{isAuthenticated() ? (
				<RouteComponent />
			) : (
				<Navigate to='/login' replace />
			)}
		</>
	);
};
