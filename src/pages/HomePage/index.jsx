import React, { useEffect, useState } from 'react';
const apiKey = import.meta.env.VITE_API_KEY;

const HomePage = () => {
	const [anime, setAnime] = useState([]);

	useEffect(() => {
		console.log(apiKey);
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
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<h1>Welcome to Electric Anime</h1>
		</>
	);
};

export default HomePage;
