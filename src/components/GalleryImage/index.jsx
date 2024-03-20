import React from 'react';
import { Link } from 'react-router-dom';
import './GalleryImage.css';

const GalleryImage = ({ anime }) => {
	return (
		<div className='gallery-image-container' role='gallery-image-container'>
			<Link to={`/${anime._id}`} key={anime._id}>
				<img src={anime.image} alt={anime.title} className='gallery-image' />
			</Link>
		</div>
	);
};

export default GalleryImage;
