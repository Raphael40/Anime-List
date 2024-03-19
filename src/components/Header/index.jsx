import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<main>
			<header>
				<nav className='nav-bar'>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='/search'>Search</NavLink>
				</nav>
			</header>
		</main>
	);
};

export default Header;
