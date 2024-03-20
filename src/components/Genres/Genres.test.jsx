import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Genres from '.';

const genres = [{ _id: 'Test Genre' }, { _id: 'Second Test Genre' }];

describe('Genres component', () => {
	beforeEach(() => {
		render(<Genres genres={genres} />);
	});

	afterEach(() => {
		cleanup();
	});

	it('Displays a genres list with three children', () => {
		const genresList = screen.getByRole('genres-list');

		expect(genresList).toBeInTheDocument();
		expect(genresList.childNodes.length).toBe(3);
	});

	it('Displays two p tags containing the text, Test Genre and Second Test Genre', async () => {
		const testGenre = screen.getByText('Test Genre');
		const secondTestGenre = screen.getByText('Second Test Genre');

		expect(testGenre).toBeInTheDocument();
		expect(secondTestGenre).toBeInTheDocument();
	});
});
