import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Genres } from '../../components';

const apiKey = import.meta.env.VITE_API_KEY;

const HomePage = () => {
	const [animes, setAnimes] = useState([]);
	const [genres, setGenres] = useState([]);
	const [genre, setGenre] = useState('');

	useEffect(() => {
		displayAnime();
	}, []);

	const displayAnime = async () => {
		const animeUrl =
			'https://anime-db.p.rapidapi.com/anime?page=1&size=10&sortBy=ranking&sortOrder=asc';
		const genresUrl = 'https://anime-db.p.rapidapi.com/genre';

		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${apiKey}`,
				'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
			}
		};

		try {
			const animeResponse = await fetch(animeUrl, options);
			const animeResult = await animeResponse.json();
			setAnimes(animeResult.data);

			const genresResponse = await fetch(genresUrl, options);
			const genresResult = await genresResponse.json();
			setGenres(genresResult);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<h1>Welcome to Electric Anime</h1>
			<div>
				<h2>Top Ranked Anime</h2>
			</div>
			<section>
				<Genres genres={genres} setGenre={setGenre} />
			</section>
			<main>
				<div>
					{genre
						? animes
								.filter(anime => anime.genres.some(gen => gen === genre))
								.map(anime => (
									<Link to={`anime/${anime._id}`} key={anime._id}>
										<img src={anime.image} alt={anime.title} />
									</Link>
								))
						: animes.map(anime => (
								<Link to={`anime/${anime._id}`} key={anime._id}>
									<img src={anime.image} alt={anime.title} />
								</Link>
						  ))}
				</div>
			</main>
		</>
	);
};

export default HomePage;
