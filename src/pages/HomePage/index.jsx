import React, { useEffect, useState, useMemo } from 'react';

import { Gallery } from '../../components';
import { Genres } from '../../components';

const apiKey = import.meta.env.VITE_API_KEY;

const HomePage = () => {
	const [animes, setAnimes] = useState([]);
	const [genres, setGenres] = useState([]);
	const [genre, setGenre] = useState('');

	const displayAnime = useMemo(
		() => async () => {
			const animeUrl = `https://anime-db.p.rapidapi.com/anime?page=1&size=30&genres=${genre}&sortBy=ranking&sortOrder=asc`;
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
				const cleanResult = genresResult.filter(genre => genre._id !== 'Hentai');
				setGenres(cleanResult);
			} catch (error) {
				console.error(error);
			}
		},
		[genre]
	);

	useEffect(() => {
		displayAnime();
	}, [displayAnime]);

	return (
		<>
			<h1>Welcome to Julian's Anime List</h1>
			<div>{genre ? <h2>Top {genre} Anime</h2> : <h2>Top Ranked Anime</h2>}</div>
			<main className='container'>
				<section className='genres-section' role='genres-section'>
					<Genres genres={genres} setGenre={setGenre} />
				</section>
				<section className='main-content'>
					<div className='gallery-container' role='gallery-container'>
						<Gallery animes={animes} />
					</div>
				</section>
			</main>
		</>
	);
};

export default HomePage;
