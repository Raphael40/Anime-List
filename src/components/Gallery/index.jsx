import './Gallery.css';
import { GalleryImage } from '..';

const Gallery = ({ animes }) => {
	return (
		<div className='gallery'>
			{animes.map(anime => (
				<GalleryImage anime={anime} key={anime._id} />
			))}
		</div>
	);
};

export default Gallery;
