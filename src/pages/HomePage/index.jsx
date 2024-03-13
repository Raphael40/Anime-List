import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const apiKey = import.meta.env.VITE_API_KEY;

const HomePage = () => {
	const [animes, setAnimes] = useState([]);

	useEffect(() => {
		displayAnime();
	}, []);

	const displayAnime = async () => {
		const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&sortBy=ranking&sortOrder=asc';
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
			console.log(result.data);
			setAnimes(result.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<h1>Welcome to Electric Anime</h1>
			<div>
				<h2>Top Ranked Anime</h2>
				{animes.map(anime => (
					<Link to={`anime/${anime._id}`}>
						<img src={anime.image} key={anime._id} />
					</Link>
				))}
			</div>
		</>
	);
};

export default HomePage;
