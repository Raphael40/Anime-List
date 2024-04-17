import React, { useEffect, useState, useMemo } from 'react';

import { Gallery, Filters, Loading } from '../../components';

const apiKey = import.meta.env.VITE_API_KEY;

const filters = [
	{ _id: 'all' },
	{ _id: 'airing' },
	{ _id: 'upcoming' },
	{ _id: 'tv' },
	{ _id: 'movies' },
	{ _id: 'popular' }
];

const HomePage = () => {
	const [isAnimeLoading, setIsAnimeLoading] = useState(true);
	const [animes, setAnimes] = useState([]);
	const [filter, setFilter] = useState('all');

	const displayAnime = useMemo(
		() => async () => {
			const animeUrl = `https://myanimelist.p.rapidapi.com/anime/top/${filter}`;

			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
				}
			};

			try {
				const animeResponse = await fetch(animeUrl, options);
				const animeResult = await animeResponse.json();
				setAnimes(animeResult);
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
					<Filters filters={filters} setFilter={setFilter} />
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
