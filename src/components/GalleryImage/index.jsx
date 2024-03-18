import React from 'react';
import { Link } from 'react-router-dom';

const GalleryImage = ({ anime }) => {
	return (
		<>
			<Link to={`/${anime._id}`} key={anime._id}>
				<img src={anime.image} alt={anime.title} />
			</Link>
		</>
	);
};

export default GalleryImage;
