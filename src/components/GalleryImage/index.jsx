import { Link } from 'react-router-dom';
import './GalleryImage.css';

const GalleryImage = ({ anime }) => {
	console.log(anime);
	return (
		<div className='gallery-image-container' role='gallery-image-container'>
			<Link to={`/${anime.myanimelist_id}`} key={anime.myanimelist_id}>
				<img src={anime.image} alt={anime.title} className='gallery-image' />
			</Link>
		</div>
	);
};

export default GalleryImage;
