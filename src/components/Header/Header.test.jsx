import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Header from '.';

describe('Header component', () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		);
	});

	afterEach(() => {
		cleanup();
	});

	it('Displays a nav bar with two children', () => {
		const nav = screen.getByRole('navigation');

		expect(nav).toBeInTheDocument();
		expect(nav.childNodes.length).toBe(2);
	});

	it('Changes location when a navlink is clicked', async () => {
		expect(window.location.href).not.toContain('/search');
		const search = screen.getByText('Search');
		await userEvent.click(search);
		expect(window.location.href).toContain('/search');
	});
});
