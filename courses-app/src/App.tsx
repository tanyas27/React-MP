import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { Header } from './components/Header/Header';

function App() {
	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<Courses />} />
				<Route path='/add-course' element={<CreateCourse />} />
			</Routes>
		</div>
	);
}

export default App;
