import './NotFoundPage.css';

const NotFoundPage = ({ anime_id }) => {
	if (anime_id) {
		return (
			<div className='text-container'>
				Anime with id of {anime_id} is not available in the third party api
			</div>
		);
	} else {
		return <div className='text-container'>Page Not Found</div>;
	}
};

export default NotFoundPage;
