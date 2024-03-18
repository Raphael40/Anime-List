import React from 'react';
import { GalleryImage } from '..';

const Gallery = ({ animes, genre }) => {
	return (
		<div>
			{genre
				? animes
						.filter(anime => anime.genres.some(gen => gen === genre))
						.map(anime => <GalleryImage anime={anime} />)
				: animes.map(anime => <GalleryImage anime={anime} />)}
		</div>
	);
};

export default Gallery;
