import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Gallery from '.';

const animes = [
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
];

describe('Gallery component', () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<Gallery animes={animes} />
			</BrowserRouter>
		);
	});

	afterEach(() => {
		cleanup();
	});

	it('Displays a div with a className of gallery', () => {
		const div = screen.getByRole('gallery');
		expect(div).toBeInTheDocument();
	});

	it('Renders GalleryImage component for each anime', () => {
		animes.forEach(anime => {
			const div = screen.getByRole('gallery');
			const img = screen.getByAltText('Test Anime');
			expect(div.childNodes.length).toBe(2);
			expect(div.childNodes[0]).toHaveRole('gallery-image-container');
			expect(div.childNodes[0]).toContainElement(img);
		});
	});
});
