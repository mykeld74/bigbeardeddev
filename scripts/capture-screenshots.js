/**
 * Re-captures the work-page screenshots from the live client sites.
 *
 *   pnpm screenshots              # every project
 *   pnpm screenshots russell      # only projects whose slug/name matches
 *   SETTLE_MS=6000 pnpm screenshots easter   # give a slow site longer to settle
 *
 * Projects marked `auth: true` need a signed-in session first:
 *   pnpm screenshots:login workout
 *
 * Projects marked `manualShot: true` use an image supplied by hand and are
 * skipped by a full run, so re-running everything will not overwrite them.
 *
 * Loads 1920x1080, waits for the network to settle, then waits a further
 * SETTLE_MS so intro animations have finished before the shot is taken.
 * Output is 1280x720 webp in src/lib/assets/work/, named after each
 * project's `image` field.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { projects } from '../src/lib/data/projects.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src/lib/assets/work');
const authDir = path.join(root, '.auth');

const VIEWPORT = { width: 1920, height: 1080 };
const OUTPUT = { width: 1280, height: 720 };
const SETTLE_MS = Number(process.env.SETTLE_MS ?? 3000);
const NAV_TIMEOUT = 45000;

const filter = process.argv[2]?.toLowerCase();
const targets = filter
	? projects.filter((p) => p.slug.includes(filter) || p.name.toLowerCase().includes(filter))
	: projects;

if (targets.length === 0) {
	console.error(`No projects matched "${filter}".`);
	process.exit(1);
}

await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const failures = [];

console.log(`Capturing ${targets.length} site(s) → ${path.relative(root, outDir)}\n`);

for (const project of targets) {
	const target = project.captureUrl ?? project.url;
	process.stdout.write(`  ${project.name.padEnd(28)} ${target} … `);

	// Hand-supplied images survive a full run; name the project to overwrite one.
	if (project.manualShot && !filter) {
		console.log('skipped — hand-supplied image');
		continue;
	}

	// Projects behind a login reuse the session saved by `pnpm screenshots:login`.
	let storageState;
	if (project.auth) {
		const statePath = path.join(authDir, `${project.slug}.json`);
		try {
			await fs.access(statePath);
			storageState = statePath;
		} catch {
			console.log('SKIPPED — no saved session');
			failures.push({
				name: project.name,
				url: project.url,
				message: `No saved session. Run: pnpm screenshots:login ${project.slug}`
			});
			continue;
		}
	}

	const context = await browser.newContext({
		viewport: VIEWPORT,
		deviceScaleFactor: 1,
		storageState
	});
	const page = await context.newPage();

	try {
		await page.goto(target, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT });

		// A saved session that has expired lands us back on the login page.
		if (project.auth && /login|signin|sign-in/i.test(new URL(page.url()).pathname)) {
			throw new Error(`Session expired — re-run: pnpm screenshots:login ${project.slug}`);
		}

		// Let intro animations, carousels and lazy images finish.
		await page.waitForTimeout(SETTLE_MS);

		const png = await page.screenshot({ fullPage: false });

		await sharp(png)
			.resize(OUTPUT.width, OUTPUT.height, { fit: 'cover', position: 'top' })
			.webp({ quality: 82 })
			.toFile(path.join(outDir, `${project.image}.webp`));

		console.log('ok');
	} catch (error) {
		console.log('FAILED');
		const message = error instanceof Error ? error.message : String(error);
		failures.push({ name: project.name, url: project.url, message });
	} finally {
		await context.close().catch(() => {});
	}
}

await browser.close();

if (failures.length > 0) {
	console.log(`\n${failures.length} failed:`);
	for (const f of failures) console.log(`  ${f.name} (${f.url})\n    ${f.message.split('\n')[0]}`);
	process.exit(1);
}

console.log('\nAll screenshots captured.');
