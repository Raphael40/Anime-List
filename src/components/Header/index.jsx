import { NavLink, Outlet } from 'react-router-dom';

const Header = () => {
	return (
		<main>
			<header>
				<nav>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='/search'>Search</NavLink>
				</nav>
			</header>
			<Outlet />
		</main>
	);
};

export default Header;
