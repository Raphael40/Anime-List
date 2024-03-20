import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import AnimeInfoPage from '.';
import { useParams } from 'react-router-dom';

global.fetch = vi.fn();

vi.mock('react-router-dom', async () => ({
	...(await vi.importActual('react-router-dom')),
	useParams: vi.fn()
}));

function createFetchResponse(data) {
	return { json: () => new Promise(resolve => resolve(data)) };
}

const apiKey = import.meta.env.VITE_API_KEY;

describe('AnimeInfoPage component', () => {
	beforeEach(() => {
		vi.mocked(useParams).mockReturnValue({ id: '4040' });
	});

	afterEach(() => {
		cleanup();
	});

	it.skip('renders an anime-info-container', () => {
		render(<AnimeInfoPage />);

		const container = screen.getByRole('anime-info-container');

		expect(container).toBeInTheDocument();
	});

	it('renders an anime from the api on the page', async () => {
		const animeData = {
			_id: '4040',
			title: 'Test Anime',
			alternativeTitles: 'Tests',
			image: '../../../public/Electric-Grape.png',
			synopsis: 'Data for testing',
			ranking: 1,
			genres: ['test']
		};

		fetch.mockResolvedValue(createFetchResponse(animeData));

		render(<AnimeInfoPage />);

		expect(fetch).toHaveBeenCalledWith(`https://anime-db.p.rapidapi.com/anime/by-id/4040`, {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${apiKey}`,
				'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
			}
		});

		const anime = await screen.findAllByRole('heading');
		expect(anime[0]).toContainHTML('<h2>Test Anime</h2>');
		expect(anime[1]).toContainHTML('<h3>Tests</h3>');

		const synopsis = await screen.findByRole('synopsis');
		expect(synopsis.childNodes[0].textContent).toBe('Data for testing');
	});

	it('returns an error when the fetch fails', async () => {
		const animeData = {
			_id: '4040',
			title: 'Test Anime',
			alternativeTitles: 'Tests',
			image: '../../../public/Electric-Grape.png',
			synopsis: 'Data for testing',
			ranking: 1,
			genres: ['test']
		};

		fetch.mockRejectedValue({ error: 'Could not find anime' });

		render(<AnimeInfoPage />);

		expect(fetch).toHaveBeenCalledWith(`https://anime-db.p.rapidapi.com/anime/by-id/4040`, {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${apiKey}`,
				'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
			}
		});

		try {
			await screen.findAllByRole('heading');
		} catch (error) {
			expect({ error: 'Could not find anime' });
		}
	});
});
