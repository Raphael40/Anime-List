import React from 'react';
import { Link } from 'react-router-dom';

const Gallery = ({ animes, genre }) => {
	return (
		<div>
			{genre
				? animes
						.filter(anime => anime.genres.some(gen => gen === genre))
						.map(anime => (
							<Link to={`/${anime._id}`} key={anime._id}>
								<img src={anime.image} alt={anime.title} />
							</Link>
						))
				: animes.map(anime => (
						<Link to={`/${anime._id}`} key={anime._id}>
							<img src={anime.image} alt={anime.title} />
						</Link>
				  ))}
		</div>
	);
};

export default Gallery;
