import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '../../components';
import { NotFoundPage } from '..';

import './AnimeInfoPage.css';

const apiKey = import.meta.env.VITE_API_KEY;

const AnimeInfoPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [anime, setAnime] = useState(
		{ alternative_titles: {} },
		{ information: {} },
		{ statistics: {} },
		{ characters: [] }
	);
	const { id } = useParams();

	const displayAnime = useMemo(
		() => async () => {
			const url = `https://myanimelist.p.rapidapi.com/anime/${id}`;
			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
				}
			};

			try {
				const response = await fetch(url, options);
				const result = await response.json();
				console.log(result);
				setAnime(result);

				if (anime) {
					setIsLoading(false);
				}
			} catch (error) {
				console.error(error);
			}
		},
		[id]
	);

	useEffect(() => {
		displayAnime();
	}, [displayAnime]);

	if (isLoading) {
		return <Loading />;
	}

	if (anime.data === `no anime found with id '${id}'`) {
		return <NotFoundPage anime_id={id} />;
	}

	return (
		<div className='anime-info-container' role='anime-info-container'>
			<h2>{anime.title_ov}</h2>
			<h3>{anime.alternative_titles.english}</h3>
			<img src={anime.picture_url} alt={anime.title_en} />
			<div className='rankingContainer'>
				<p>
					<strong>Rank:</strong> {anime.statistics.ranked}
				</p>
				<p>
					<strong>Score:</strong> {anime.statistics.score}
				</p>
			</div>
			<div className='genresContainer'>
				<p>
					<strong>Genres:</strong>
				</p>
				{anime.information.genres.map(genre => (
					<p key={genre.name}>{genre.name}</p>
				))}
			</div>
			<div role='synopsis'>
				<p>{anime.synopsis}</p>
			</div>
		</div>
	);
};

export default AnimeInfoPage;
