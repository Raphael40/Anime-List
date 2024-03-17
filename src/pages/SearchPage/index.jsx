import React, { useState, useEffect } from 'react';

const apiKey = import.meta.env.VITE_API_KEY;

const SearchPage = () => {
	const [inputValue, setInputValue] = useState('');
	const [searchString, setSearchString] = useState('');

	useEffect(() => {
		const searchApi = async () => {
			const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${searchString}sortBy=ranking&sortOrder=asc`;
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
			} catch (error) {
				console.error(error);
			}
		};
		searchApi();
	}, [searchString]);

	const handleSubmit = () => {
		e.preventDefault();
		setSearchString(inputValue);
		setInputValue('');
	};

	const handleInput = () => {
		const newInput = e.target.value;
		setInputValue(newInput);
	};

	return (
		<>
			<div>
				<form onSubmit={handleSubmit}>
					<label>Search: </label>
					<input type='text' onChange={handleInput} required></input>
					<input type='submit' value='search'></input>
				</form>
			</div>
		</>
	);
};

export default SearchPage;
