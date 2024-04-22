// tests/HomePage.spec.js
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('http://localhost:5173/');

	await expect(page).toHaveTitle(/Anime List/);
});

test('has heading and main', async ({ page }) => {
	await page.goto('http://localhost:5173/');

	expect(page.getByRole('heading', { name: "Welcome to Julian's Anime List" })).toBeVisible;

	expect(page.getByRole('container')).toBeVisible;
});
