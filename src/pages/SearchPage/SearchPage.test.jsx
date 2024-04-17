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
		const animes = [
			{
				myanimelist_id: '4040',
				title: 'Test Anime',
				image: '../../../public/Electric-Grape.png',
				synopsis: 'Data for testing'
			},
			{
				myanimelist_id: '8080',
				title: 'Test Anime 2',
				image: '../../../public/Electric-Grape.png',
				synopsis: 'Data for testing'
			}
		];

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
		const animes = [
			{
				myanimelist_id: '4040',
				title: 'Test Anime',
				image: '../../../public/Electric-Grape.png',
				synopsis: 'Data for testing'
			},
			{
				myanimelist_id: '8080',
				title: 'Test Anime 2',
				image: '../../../public/Electric-Grape.png',
				synopsis: 'Data for testing'
			}
		];

		fetch.mockResolvedValue(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<SearchPage />
			</BrowserRouter>
		);

		expect(fetch).toHaveBeenCalledWith(
			`https://myanimelist.p.rapidapi.com/v2/anime/search?q=one piece&n=50`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
				}
			}
		);

		const galleryImage = await screen.findByAltText('Test Anime');
		expect(galleryImage).toBeInTheDocument();

		const galleryImage2 = await screen.findByAltText('Test Anime 2');
		expect(galleryImage2).toHaveClass('gallery-image');
	});

	it('renders new animes from the api after searching', async () => {
		const animes = [
			{
				myanimelist_id: '4040',
				title: 'Test Anime',
				image: '../../../public/Electric-Grape.png',
				synopsis: 'Data for testing'
			},
			{
				myanimelist_id: '8080',
				title: 'Test Anime 2',
				image: '../../../public/Electric-Grape.png',
				synopsis: 'Data for testing'
			}
		];
		fetch.mockResolvedValueOnce(createFetchResponse(animes));

		render(
			<BrowserRouter>
				<SearchPage />
			</BrowserRouter>
		);

		const galleryImage = await screen.findByAltText('Test Anime');
		expect(galleryImage).toBeInTheDocument();

		const searchAnimes = [
			{
				myanimelist_id: '6060',
				title: 'Search Test Anime',
				image: '../../../public/Electric-Grape.png',
				synopsis: 'Data for testing'
			},
			{
				myanimelist_id: '2020',
				title: 'Search Test Anime 2',
				image: '../../../public/Electric-Grape.png',
				synopsis: 'Data for testing'
			}
		];

		fetch.mockResolvedValue(createFetchResponse(searchAnimes));

		const textBox = screen.getByRole('textbox');
		const submit = screen.getByRole('button');
		await userEvent.type(textBox, 'Berserk');
		await userEvent.click(submit);

		expect(fetch).toHaveBeenCalledWith(
			`https://myanimelist.p.rapidapi.com/v2/anime/search?q=Berserk&n=50`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
				}
			}
		);

		const searchGalleryImage = await screen.findByAltText('Search Test Anime');
		expect(searchGalleryImage).toBeInTheDocument();
	});

	it('returns an error when the fetch fails', async () => {
		const animes = [
			{
				myanimelist_id: '4040',
				title: 'Test Anime',
				image: '../../../public/Electric-Grape.png',
				synopsis: 'Data for testing'
			},
			{
				myanimelist_id: '8080',
				title: 'Test Anime 2',
				image: '../../../public/Electric-Grape.png',
				synopsis: 'Data for testing'
			}
		];

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
			`https://myanimelist.p.rapidapi.com/v2/anime/search?q=one piece&n=50`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${apiKey}`,
					'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
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
