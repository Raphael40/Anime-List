import React, { useEffect, useState, useMemo } from 'react';

import { Gallery, Filters, Loading } from '../../components';

const apiKey = import.meta.env.VITE_API_KEY;

const HomePage = () => {
	const [isAnimeLoading, setIsAnimeLoading] = useState(true);
	const [animes, setAnimes] = useState([]);
	const [filter, setFilter] = useState();

	const displayAnime = useMemo(
		() => async () => {
			const animeUrl = `https://anime-db.p.rapidapi.com/anime?page=1&size=20&sortBy=ranking&sortOrder=asc`;
			const animeUrlWithGenre = `https://anime-db.p.rapidapi.com/anime?page=1&size=20&genres=${filter}&sortBy=ranking&sortOrder=asc`;
			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
				}
			};

			try {
				if (filter) {
					const animeResponse = await fetch(animeUrlWithGenre, options);
					const animeResult = await animeResponse.json();
					setAnimes(animeResult.data);
				} else {
					const animeResponse = await fetch(animeUrl, options);
					const animeResult = await animeResponse.json();
					setAnimes(animeResult.data);
				}
				if (animes) {
					setIsAnimeLoading(false);
				}
			} catch (error) {
				console.error(error);
			}
		},
		[filter]
	);

	useEffect(() => {
		displayAnime();
	}, [displayAnime]);

	if (isAnimeLoading) {
		return <Loading />;
	}

	return (
		<>
			<h1>Welcome to Julian's Anime List</h1>
			<div>{filter !== 'all' ? <h2>Top {filter} Anime</h2> : <h2>Top Anime</h2>}</div>
			<main className='container'>
				<section role='filters-section'>
					<Filters setFilter={setFilter} />
				</section>
				<section className='anime-section' role='anime-section'>
					<div className='gallery-container'>
						<Gallery animes={animes} />
					</div>
				</section>
			</main>
		</>
	);
};

export default HomePage;
