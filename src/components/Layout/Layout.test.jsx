import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Layout from '.';

describe('Layout component', () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<Layout />
			</BrowserRouter>
		);
	});

	afterEach(() => {
		cleanup();
	});

	it('Displays a header', () => {
		const header = screen.getByRole('header');

		expect(header).toBeInTheDocument();
	});
});
