import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header role='header'>
			<nav className='nav-bar'>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/search'>Search</NavLink>
			</nav>
		</header>
	);
};

export default Header;
