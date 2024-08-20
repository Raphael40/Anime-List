import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import SearchPage from '.';

global.fetch = vi.fn();

function createFetchResponse(data) {
	return { json: () => new Promise(resolve => resolve(data)) };
}

const apiKey = import.meta.env.VITE_API_KEY;

describe('SearchPage component', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders a search-form-container and a gallery-container', async () => {
		const animes = {
			data: [
				{
					_id: '4040',
					title: 'Test Anime',
					image: '../../../public/Electric-Grape.png',
					synopsis: 'Data for testing'
				},
				{
					_id: '8080',
					title: 'Test Anime 2',
					image: '../../../public/Electric-Grape.png',
					synopsis: 'Data for testing'
				}
			]
		};

		fetch.mockResolvedValueOnce(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<SearchPage />
			</BrowserRouter>
		);

		const searchContainer = await screen.findByRole('search-form-container');
		const galleryContainer = await screen.findByRole('gallery-container');

		expect(searchContainer).toBeInTheDocument();
		expect(galleryContainer).toBeInTheDocument();
	});

	it('renders animes from the api on page load', async () => {
		const animes = {
			data: [
				{
					_id: '4040',
					title: 'Test Anime',
					image: '../../../public/Electric-Grape.png',
					synopsis: 'Data for testing'
				},
				{
					_id: '8080',
					title: 'Test Anime 2',
					image: '../../../public/Electric-Grape.png',
					synopsis: 'Data for testing'
				}
			]
		};

		fetch.mockResolvedValue(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<SearchPage />
			</BrowserRouter>
		);

		expect(fetch).toHaveBeenCalledWith(
			`https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=one piece&sortBy=ranking&sortOrder=asc`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
				}
			}
		);

		const galleryImage = await screen.findByAltText('Test Anime');
		expect(galleryImage).toBeInTheDocument();

		const galleryImage2 = await screen.findByAltText('Test Anime 2');
		expect(galleryImage2).toHaveClass('gallery-image');
	});

	it('renders new animes from the api after searching', async () => {
		const animes = {
			data: [
				{
					_id: '4040',
					title: 'Test Anime',
					image: '../../../public/Electric-Grape.png',
					synopsis: 'Data for testing'
				},
				{
					_id: '8080',
					title: 'Test Anime 2',
					image: '../../../public/Electric-Grape.png',
					synopsis: 'Data for testing'
				}
			]
		};
		fetch.mockResolvedValueOnce(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<SearchPage />
			</BrowserRouter>
		);

		const galleryImage = await screen.findByAltText('Test Anime');
		expect(galleryImage).toBeInTheDocument();

		const searchAnimes = {
			data: [
				{
					_id: '2020',
					title: 'Search Test Anime',
					image: '../../../public/Electric-Grape.png'
				},
				{
					_id: '1000',
					title: 'Search Test Anime 2',
					image: '../../../public/Electric-Grape.png'
				}
			]
		};

		fetch.mockResolvedValue(createFetchResponse(searchAnimes));

		const textBox = screen.getByRole('textbox');
		const submit = screen.getByRole('button');
		await userEvent.type(textBox, 'Berserk');
		await userEvent.click(submit);

		expect(fetch).toHaveBeenCalledWith(
			`https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Berserk&sortBy=ranking&sortOrder=asc`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
				}
			}
		);

		const searchGalleryImage = await screen.findByAltText('Search Test Anime');
		expect(searchGalleryImage).toBeInTheDocument();
	});

	it('returns an error when the fetch fails', async () => {
		const animes = {
			data: [
				{
					_id: '4040',
					title: 'Test Anime',
					image: '../../../public/Electric-Grape.png',
					synopsis: 'Data for testing'
				},
				{
					_id: '8080',
					title: 'Test Anime 2',
					image: '../../../public/Electric-Grape.png',
					synopsis: 'Data for testing'
				}
			]
		};

		fetch.mockResolvedValueOnce(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<SearchPage />
			</BrowserRouter>
		);

		const galleryImage = await screen.findByAltText('Test Anime');
		expect(galleryImage).toBeInTheDocument();

		fetch.mockRejectedValueOnce({});

		const textBox = screen.getByRole('textbox');
		const submit = screen.getByRole('button');
		await userEvent.type(textBox, 'Berserk');
		await userEvent.click(submit);

		expect(fetch).toHaveBeenCalledWith(
			`https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Berserk&sortBy=ranking&sortOrder=asc`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
				}
			}
		);

		try {
			await screen.findByAltText('Search Anime');
		} catch (error) {
			expect(error.message).toContain('Unable to find an element with the alt text: Search Anime');
		}
	});
});
