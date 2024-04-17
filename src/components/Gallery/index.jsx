import './Gallery.css';
import { GalleryImage } from '..';

const Gallery = ({ animes }) => {
	console.log(animes);
	return (
		<div className='gallery' role='gallery'>
			{animes.map(anime => (
				<GalleryImage anime={anime} key={anime.myanimelist_id} />
			))}
		</div>
	);
};

export default Gallery;
