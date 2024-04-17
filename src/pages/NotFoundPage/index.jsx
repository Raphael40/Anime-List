const NotFoundPage = ({ anime_id }) => {
	if (anime_id) {
		return <div>Anime with id of {anime_id} is not available in the third party api</div>;
	} else {
		return <div>Page Not Found</div>;
	}
};

export default NotFoundPage;
