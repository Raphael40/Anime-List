import React, { useEffect, useState, useMemo } from 'react';

import { Gallery, Genres, Loading } from '../../components';

const apiKey = import.meta.env.VITE_API_KEY;

const HomePage = () => {
	const [isAnimeLoading, setIsAnimeLoading] = useState(true);
	const [isGenresLoading, setIsGenresLoading] = useState(true);
	const [animes, setAnimes] = useState([]);
	const [genres, setGenres] = useState([]);
	const [genre, setGenre] = useState('');

	const displayAnime = useMemo(
		() => async () => {
			const animeUrl = `https://anime-db.p.rapidapi.com/anime?page=1&size=30&genres=${genre}&sortBy=ranking&sortOrder=asc`;

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
				setIsAnimeLoading(false);
			} catch (error) {
				console.error(error);
			}
		},
		[genre]
	);

	const displayGenres = useMemo(
		() => async () => {
			const genresUrl = 'https://anime-db.p.rapidapi.com/genre';

			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
				}
			};

			try {
				const genresResponse = await fetch(genresUrl, options);
				const genresResult = await genresResponse.json();
				const cleanResult = genresResult.filter(genre => genre._id !== 'Hentai');
				setGenres(cleanResult);
				setTimeout(() => {
					setIsGenresLoading(false);
				}, 2000);
			} catch (error) {
				console.error(error);
			}
		},
		[genre]
	);

	useEffect(() => {
		displayAnime();
	}, [displayAnime]);

	useEffect(() => {
		displayGenres();
	}, []);

	if (isAnimeLoading && isGenresLoading) {
		return <Loading />;
	}

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
