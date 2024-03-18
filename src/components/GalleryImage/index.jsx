import React from 'react';
import { Link } from 'react-router-dom';
import './GalleryImage.css';

const GalleryImage = ({ anime }) => {
	return (
		<div className='gallery-image'>
			<Link to={`/${anime._id}`} key={anime._id}>
				<img src={anime.image} alt={anime.title} />
			</Link>
		</div>
	);
};

export default GalleryImage;
