import React from 'react';
import { Navigate } from 'react-router-dom';

export function withAuth(Component: React.FC) {
	return class AuthenticatedComponent extends React.Component {
		isAuthenticated() {
			return localStorage.getItem('AccessToken') ? true : false;
		}

		render() {
			return (
				<>
					{this.isAuthenticated() ? (
						<Component {...this.props} />
					) : (
						<Navigate to='/login' replace />
					)}
				</>
			);
		}
	};
}

export default withAuth;
