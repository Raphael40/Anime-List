import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import SearchForm from '.';

describe('SearchForm component', () => {
	beforeEach(() => {
		render(<SearchForm />);
	});

	afterEach(() => {
		cleanup();
	});

	it('displays a form with a role of search-form', () => {
		const form = screen.getByRole('search-form');
		expect(form).toBeInTheDocument();
	});

	it('displays a textbox and a button', () => {
		const textBox = screen.getByRole('textbox');
		expect(textBox).toBeInTheDocument();

		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
	});
});
