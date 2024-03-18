import './Gallery.css';
import { GalleryImage } from '..';

const Gallery = ({ animes, genre }) => {
	return (
		<div className='gallery'>
			{genre
				? animes
						.filter(anime => anime.genres.some(gen => gen === genre))
						.map(anime => <GalleryImage anime={anime} key={anime._id} />)
				: animes.map(anime => <GalleryImage anime={anime} key={anime._id} />)}
		</div>
	);
};

export default Gallery;
