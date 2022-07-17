import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import {
	Header,
	Courses,
	CreateCourse,
	Registration,
	Login,
	CourseInfo,
} from './components';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<Navigate to='/login' replace={true} />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route path='/courses' element={<PrivateRoute component={Courses} />} />
				<Route
					path='/courses/:courseId'
					element={<PrivateRoute component={CourseInfo} />}
				/>
				<Route
					path='/courses/add'
					element={<PrivateRoute component={CreateCourse} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
