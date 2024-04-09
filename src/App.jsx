import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import * as Pages from './pages';

function App() {
	// const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Pages.HomePage />} />
					<Route path='/:id' element={<Pages.AnimeInfoPage />} />
					<Route path='/search' element={<Pages.SearchPage />} />
					<Route path='*' element={<Pages.NotFoundPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
