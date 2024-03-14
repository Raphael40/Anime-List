import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import * as Pages from './pages';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Header />}>
					<Route index element={<Pages.HomePage />} />
					<Route path='/anime/:id' element={<Pages.AnimeInfoPage />} />
					<Route path='genres' element={<Pages.GenresPage />} />
					<Route path='search' element={<Pages.SearchPage />} />
					<Route path='*' element={<Pages.NotFoundPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
