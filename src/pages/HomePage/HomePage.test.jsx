import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import HomePage from '.';

global.fetch = vi.fn();

function createFetchResponse(data) {
	return { json: () => new Promise(resolve => resolve(data)) };
}

const apiKey = import.meta.env.VITE_API_KEY;

describe('HomePage component', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders a sidebar-section and a anime-section', async () => {
		const animes = [
			{
				myanimelist_id: '4040',
				title: 'Test Anime',
				picture_url: '../../../public/Electric-Grape.png'
			},
			{
				myanimelist_id: '8080',
				title: 'Test Anime 2',
				picture_url: '../../../public/Electric-Grape.png'
			}
		];

		fetch.mockResolvedValueOnce(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);

		const filtersSection = await screen.findByRole('filters-section');
		const animeSection = await screen.findByRole('anime-section');

		expect(filtersSection).toBeInTheDocument();
		expect(animeSection).toBeInTheDocument();
	});

	it('renders animes from the api on page load', async () => {
		const animes = [
			{
				myanimelist_id: '4040',
				title: 'Test Anime',
				picture_url: '../../../public/Electric-Grape.png'
			},
			{
				myanimelist_id: '8080',
				title: 'Test Anime 2',
				picture_url: '../../../public/Electric-Grape.png'
			}
		];

		fetch.mockResolvedValueOnce(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);

		expect(fetch).toHaveBeenCalledWith(`https://myanimelist.p.rapidapi.com/anime/top/all`, {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${apiKey}`,
				'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
			}
		});

		const galleryImage = await screen.findByAltText('Test Anime');
		expect(galleryImage).toHaveClass('gallery-image');
	});

	it('renders new anime from the api after selecting a filter', async () => {
		const animes = [
			{
				myanimelist_id: '4040',
				title: 'Test Anime',
				picture_url: '../../../public/Electric-Grape.png'
			},
			{
				myanimelist_id: '8080',
				title: 'Test Anime 2',
				picture_url: '../../../public/Electric-Grape.png'
			}
		];

		fetch.mockResolvedValueOnce(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);

		const galleryImage = await screen.findByAltText('Test Anime');
		expect(galleryImage).toHaveClass('gallery-image');

		const filteredAnimes = [
			{
				myanimelist_id: '6060',
				title: 'Filtered Test Anime',
				picture_url: '../../../public/Electric-Grape.png'
			},
			{
				myanimelist_id: '1010',
				title: 'Filtered Test Anime 2',
				picture_url: '../../../public/Electric-Grape.png'
			}
		];

		const filterText = await screen.findByText('movies');
		expect(filterText).toBeInTheDocument();

		fetch.mockResolvedValue(createFetchResponse(filteredAnimes));

		await userEvent.click(filterText);

		expect(fetch).toHaveBeenCalledWith(`https://myanimelist.p.rapidapi.com/anime/top/movies`, {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${apiKey}`,
				'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
			}
		});

		const filteredGalleryImage = await screen.findByAltText('Filtered Test Anime');
		expect(filteredGalleryImage).toBeInTheDocument();
		expect(filteredGalleryImage).toHaveClass('gallery-image');
	});

	it('returns an error when the fetch fails', async () => {
		const animes = [
			{
				myanimelist_id: '4040',
				title: 'Test Anime',
				picture_url: '../../../public/Electric-Grape.png'
			},
			{
				myanimelist_id: '8080',
				title: 'Test Anime 2',
				picture_url: '../../../public/Electric-Grape.png'
			}
		];

		fetch.mockResolvedValueOnce(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);

		const galleryImage = await screen.findByAltText('Test Anime');
		expect(galleryImage).toHaveClass('gallery-image');

		const filterText = await screen.findByText('movies');
		expect(filterText).toBeInTheDocument();

		fetch.mockRejectedValueOnce(createFetchResponse({}));

		await userEvent.click(filterText);

		expect(fetch).toHaveBeenCalledWith(`https://myanimelist.p.rapidapi.com/anime/top/all`, {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${apiKey}`,
				'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
			}
		});

		try {
			await screen.findByAltText('Filtered Anime');
		} catch (error) {
			expect(error.message).toContain(
				'Unable to find an element with the alt text: Filtered Anime'
			);
		}
	});
});
