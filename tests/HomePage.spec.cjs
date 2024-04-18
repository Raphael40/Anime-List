// tests/HomePage.spec.js
import { test, expect } from '@playwright/test';

test.skip('has title', async ({ page }) => {
	await page.goto('https://anime-list-vdy4.onrender.com/');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Welcome to Julian's Anime List/);

	// Expect a section to have Filters component

	// Expect a section to have Gallery component
});

test.skip('get started link', async ({ page }) => {
	await page.goto('https://anime-list-vdy4.onrender.com/');

	// Click the get started link.
	await page.getByRole('link', { name: 'Get started' }).click();

	// Expects page to have a heading with the name of Installation.
	await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
