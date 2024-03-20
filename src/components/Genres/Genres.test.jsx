import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Genres from '.';

const setGenreMock = vi.fn();
const genres = [{ _id: 'Test Genre' }, { _id: 'Second Test Genre' }];

describe('Genres component', () => {
	beforeEach(() => {
		render(<Genres genres={genres} setGenre={setGenreMock} />);
	});

	afterEach(() => {
		cleanup();
	});

	it('Displays a genres list with three children', () => {
		const genresList = screen.getByRole('genres-list');

		expect(genresList).toBeInTheDocument();
		expect(genresList.childNodes.length).toBe(3);
	});

	it('Displays two p tags containing the text; Test Genre and Second Test Genre', async () => {
		const testGenre = screen.getByText('Test Genre');
		const secondTestGenre = screen.getByText('Second Test Genre');

		expect(testGenre).toBeInTheDocument();
		expect(secondTestGenre).toBeInTheDocument();
	});

	it('Calls setGenre with correct genre when a genre tag is clicked', async () => {
		const testGenre = screen.getByText('Test Genre');
		await userEvent.click(testGenre);

		expect(setGenreMock).toHaveBeenCalledWith('Test Genre');
	});

	it('Calls setGenre with empty string when "All" tag is clicked', async () => {
		const allGenreTag = screen.getByText('All');
		await userEvent.click(allGenreTag);

		expect(setGenreMock).toHaveBeenCalledWith('');
	});
});
