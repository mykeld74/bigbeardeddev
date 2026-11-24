/**
 * Saves a signed-in browser session so the screenshot script can capture
 * pages that sit behind a login.
 *
 *   pnpm screenshots:login workout
 *
 * Opens a real browser window. You sign in yourself — your password goes
 * straight into the site and is never passed through this script, stored in
 * the repo, or shown to anyone. Once you land on a signed-in page, the
 * session cookies are written to .auth/<slug>.json, which is gitignored.
 *
 * Sessions expire; re-run this when a capture comes back showing the login page.
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { projects } from '../src/lib/data/projects.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const authDir = path.join(root, '.auth');

const filter = process.argv[2]?.toLowerCase();
const candidates = projects.filter((p) => p.auth);

if (candidates.length === 0) {
	console.error('No projects are marked `auth: true` in src/lib/data/projects.ts.');
	process.exit(1);
}

const project = filter
	? candidates.find((p) => p.slug.includes(filter) || p.name.toLowerCase().includes(filter))
	: candidates.length === 1
		? candidates[0]
		: undefined;

if (!project) {
	console.error(
		filter
			? `No project needing auth matched "${filter}".`
			: `Several projects need auth — name one: ${candidates.map((p) => p.slug).join(', ')}`
	);
	process.exit(1);
}

await fs.mkdir(authDir, { recursive: true });
const statePath = path.join(authDir, `${project.slug}.json`);

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

console.log(`\nOpening ${project.url}`);
console.log('Sign in in the browser window. This will wait up to 5 minutes.\n');

await page.goto(project.url, { waitUntil: 'domcontentloaded' });

try {
	// Signed in once we are no longer sitting on a login/sign-in screen.
	await page.waitForURL((url) => !/login|signin|sign-in|auth/i.test(url.pathname), {
		timeout: 5 * 60 * 1000
	});
	// Let any post-login redirect settle before saving cookies.
	await page.waitForTimeout(2000);

	await context.storageState({ path: statePath });
	console.log(`Session saved → ${path.relative(root, statePath)}`);
	console.log(`Now run:  pnpm screenshots ${project.slug}\n`);
} catch {
	console.error('\nTimed out waiting for sign-in. Nothing was saved.');
	process.exitCode = 1;
} finally {
	await context.close().catch(() => {});
	await browser.close().catch(() => {});
}
