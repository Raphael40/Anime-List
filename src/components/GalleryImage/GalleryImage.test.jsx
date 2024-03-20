import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import GalleryImage from '.';

const anime = {
	_id: '4040',
	title: 'Test Anime',
	image: '../../../public/Electric-Grape.png',
	synopsis: 'Data for testing'
};

describe('GalleryImage component', () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<GalleryImage anime={anime} />
			</BrowserRouter>
		);
	});

	afterEach(() => {
		cleanup();
	});

	it('Displays a div with a role of gallery-image-container', () => {
		const div = screen.getByRole('gallery-image-container');
		const link = screen.getByRole('link');
		expect(div).toBeInTheDocument();
		expect(div).toContainElement(link);
	});

	it('Displays a div with a role of gallery-image-container', () => {
		const link = screen.getByRole('link');
		const img = screen.getByAltText('Test Anime');
		expect(link).toContainElement(img);
	});

	it('Displays an img with an  alt of Test Anime', () => {
		const img = screen.getByAltText('Test Anime');
		expect(img).toBeInTheDocument();
	});
});
