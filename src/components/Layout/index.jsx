import { Outlet } from 'react-router-dom';
import { Header } from '..';

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default Layout;
