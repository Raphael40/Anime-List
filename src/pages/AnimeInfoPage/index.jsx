import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './AnimeInfoPage.css';

const apiKey = import.meta.env.VITE_API_KEY;

const AnimeInfoPage = () => {
	const [anime, setAnime] = useState({ genres: [] });
	const { id } = useParams();

	useEffect(() => {
		displayAnime();
	}, []);

	const displayAnime = async () => {
		const url = `https://anime-db.p.rapidapi.com/anime/by-id/${id}`;
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${apiKey}`,
				'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
			}
		};

		try {
			const response = await fetch(url, options);
			const result = await response.json();
			setAnime(result);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='anime-info-container'>
			<h2>{anime.title}</h2>
			<h3>{anime.alternativeTitles}</h3>
			<img src={anime.image} alt={anime.title} />
			<div className='rankingContainer'>
				<p>
					<strong>Rank:</strong> {anime.ranking}
				</p>
			</div>
			<div className='genresContainer'>
				<p>
					<strong>Genres:</strong>
				</p>
				{anime.genres.map(genre => (
					<p key={genre}>{genre}</p>
				))}
			</div>
			<div>
				<p>{anime.synopsis}</p>
			</div>
		</div>
	);
};

export default AnimeInfoPage;
