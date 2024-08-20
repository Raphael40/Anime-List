import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Filters from '.';

const setFilterMock = vi.fn();

describe('Filters component', () => {
	beforeEach(() => {
		render(<Filters setFilter={setFilterMock} />);
	});

	afterEach(() => {
		cleanup();
	});

	it('Displays a filters list with sixteen children and text for each', () => {
		const filtersList = screen.getByRole('filters-list');
		const testFilter = screen.getByText('Fantasy');

		expect(filtersList).toBeInTheDocument();
		expect(filtersList.childNodes.length).toBe(16);
		expect(testFilter).toBeInTheDocument();
	});

	it('Calls setFilter with correct filter when a filter is clicked', async () => {
		const testFilter = screen.getByText('Action');
		await userEvent.click(testFilter);

		expect(setFilterMock).toHaveBeenCalledWith('Action');
	});
});
