import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';

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

	it('renders an anime-info-container', async () => {
		const animeData = {
			myanimelist_id: '4040',
			title_ov: 'Test Anime',
			alternative_titles: { english: 'Tests' },
			picture_url: '../../../public/Electric-Grape.png',
			synopsis: 'Data for testing',
			statistics: { ranked: 1 },
			information: { genres: ['test'] }
		};

		fetch.mockResolvedValue(createFetchResponse(animeData));

		render(<AnimeInfoPage />);

		const container = await screen.findByRole('anime-info-container');

		expect(container).toBeInTheDocument();
	});

	it('renders an anime from the api on the page', async () => {
		const animeData = {
			myanimelist_id: '4040',
			title_ov: 'Test Anime',
			alternative_titles: { english: 'Tests' },
			picture_url: '../../../public/Electric-Grape.png',
			synopsis: 'Data for testing',
			statistics: { ranked: 1 },
			information: { genres: ['test'] }
		};

		fetch.mockResolvedValue(createFetchResponse(animeData));

		render(<AnimeInfoPage />);

		expect(fetch).toHaveBeenCalledWith(`https://myanimelist.p.rapidapi.com/anime/4040`, {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${apiKey}`,
				'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
			}
		});

		const anime = await screen.findAllByRole('heading');
		expect(anime[0]).toContainHTML('<h2>Test Anime</h2>');
		expect(anime[1]).toContainHTML('<h3>Tests</h3>');

		const synopsis = await screen.findByRole('synopsis');
		expect(synopsis.childNodes[0].textContent).toBe('Data for testing');
	});

	it('returns an error when the fetch fails', async () => {
		fetch.mockRejectedValue({});

		render(<AnimeInfoPage />);

		expect(fetch).toHaveBeenCalledWith(`https://myanimelist.p.rapidapi.com/anime/4040`, {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${apiKey}`,
				'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
			}
		});

		try {
			await screen.findByText('Missing anime');
		} catch (error) {
			expect(error.message).toContain('Unable to find an element with the text: Missing anime.');
		}
	});
});
