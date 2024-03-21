import React, { useState, useEffect } from 'react';

import { Gallery, SearchForm } from '../../components';

const apiKey = import.meta.env.VITE_API_KEY;

const SearchPage = () => {
	const [inputValue, setInputValue] = useState('');
	const [searchString, setSearchString] = useState('');
	const [animes, setAnimes] = useState([]);

	useEffect(() => {
		const searchApi = async () => {
			const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${searchString}&sortBy=ranking&sortOrder=asc`;
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
				setAnimes(result.data);
			} catch (error) {
				console.error(error);
			}
		};
		searchApi();
	}, [searchString]);

	const handleSubmit = e => {
		e.preventDefault();
		setSearchString(inputValue);
		setInputValue('');
	};

	const handleInput = e => {
		const newInput = e.target.value;
		setInputValue(newInput);
	};

	return (
		<>
			<div role='search-form-container'>
				<SearchForm inputValue={inputValue} handleInput={handleInput} handleSubmit={handleSubmit} />
			</div>
			<main>
				<div role='gallery-container'>
					<Gallery animes={animes} />
				</div>
			</main>
		</>
	);
};

export default SearchPage;
