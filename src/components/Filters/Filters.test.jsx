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

	it('Displays a filters list with six children and text for each', () => {
		const filtersList = screen.getByRole('filters-list');
		const testFilter = screen.getByText('Upcoming');

		expect(filtersList).toBeInTheDocument();
		expect(filtersList.childNodes.length).toBe(6);
		expect(testFilter).toBeInTheDocument();
	});

	it('Calls setFilter with correct filter when a filter is clicked', async () => {
		const testFilter = screen.getByText('Movie');
		await userEvent.click(testFilter);

		expect(setFilterMock).toHaveBeenCalledWith('movie');
	});

	it('Calls setFilter with bypopularity when popularity is clicked', async () => {
		const testFilter = screen.getByText('Popular');

		await userEvent.click(testFilter);

		expect(setFilterMock).toHaveBeenCalledWith('bypopularity');
	});
});
