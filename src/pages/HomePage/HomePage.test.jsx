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
		const animes = {
			data: [
				{
					_id: '4040',
					title: 'Test Anime',
					image: '../../../public/Electric-Grape.png'
				},
				{
					_id: '8080',
					title: 'Test Anime 2',
					image: '../../../public/Electric-Grape.png'
				}
			]
		};

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
		const animes = {
			data: [
				{
					_id: '4040',
					title: 'Test Anime',
					image: '../../../public/Electric-Grape.png'
				},
				{
					_id: '8080',
					title: 'Test Anime 2',
					image: '../../../public/Electric-Grape.png'
				}
			]
		};

		fetch.mockResolvedValueOnce(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);

		expect(fetch).toHaveBeenCalledWith(
			`https://anime-db.p.rapidapi.com/anime?page=1&size=20&sortBy=ranking&sortOrder=asc`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
				}
			}
		);

		const galleryImage = await screen.findByAltText('Test Anime');
		expect(galleryImage).toHaveClass('gallery-image');
	});

	it('renders new anime from the api after selecting a filter', async () => {
		const animes = {
			data: [
				{
					_id: '4040',
					title: 'Test Anime',
					image: '../../../public/Electric-Grape.png'
				},
				{
					_id: '8080',
					title: 'Test Anime 2',
					image: '../../../public/Electric-Grape.png'
				}
			]
		};

		fetch.mockResolvedValueOnce(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);

		const galleryImage = await screen.findByAltText('Test Anime');
		expect(galleryImage).toHaveClass('gallery-image');

		const filteredAnimes = {
			data: [
				{
					_id: '6060',
					title: 'Filtered Anime',
					image: '../../../public/Electric-Grape.png'
				},
				{
					_id: '1000',
					title: 'Filtered Anime 2',
					image: '../../../public/Electric-Grape.png'
				}
			]
		};

		const filterText = await screen.findByText('Fantasy');
		expect(filterText).toBeInTheDocument();

		fetch.mockResolvedValue(createFetchResponse(filteredAnimes));

		await userEvent.click(filterText);

		expect(fetch).toHaveBeenCalledWith(
			`https://anime-db.p.rapidapi.com/anime?page=1&size=20&genres=Fantasy&sortBy=ranking&sortOrder=asc`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
				}
			}
		);

		const filteredGalleryImage = await screen.findByAltText('Filtered Anime');
		expect(filteredGalleryImage).toBeInTheDocument();
		expect(filteredGalleryImage).toHaveClass('gallery-image');
	});

	it('returns an error when the fetch fails', async () => {
		const animes = {
			data: [
				{
					_id: '4040',
					title: 'Test Anime',
					image: '../../../public/Electric-Grape.png'
				},
				{
					_id: '8080',
					title: 'Test Anime 2',
					image: '../../../public/Electric-Grape.png'
				}
			]
		};

		fetch.mockResolvedValueOnce(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);

		const galleryImage = await screen.findByAltText('Test Anime');
		expect(galleryImage).toHaveClass('gallery-image');

		const filterText = await screen.findByText('Fantasy');
		expect(filterText).toBeInTheDocument();

		fetch.mockRejectedValueOnce(createFetchResponse({}));

		await userEvent.click(filterText);

		expect(fetch).toHaveBeenCalledWith(
			`https://anime-db.p.rapidapi.com/anime?page=1&size=20&sortBy=ranking&sortOrder=asc`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
				}
			}
		);

		try {
			await screen.findByAltText('Filtered Anime');
		} catch (error) {
			expect(error.message).toContain(
				'Unable to find an element with the alt text: Filtered Anime'
			);
		}
	});
});
