import React, { useEffect, useState } from 'react';
import './Genres.css';

const GenresPage = ({ genres, setGenre }) => {
	const handleClick = genre => {
		setGenre(genre);
	};

	return (
		<>
			<p class='genre-tag' onClick={() => setGenre('')}>
				All
			</p>
			{genres.map(genre => (
				<p class='genre-tag' onClick={() => handleClick(genre._id)} key={genre._id}>
					{genre._id}
				</p>
			))}
		</>
	);
};

export default GenresPage;
