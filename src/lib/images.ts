/**
 * Client-site screenshots, resolved from `src/lib/assets/work/*.webp`
 * so a project only needs to reference its image by name.
 * All screenshots are 1280×720.
 */
const files: Record<string, string> = import.meta.glob('./assets/work/*.webp', {
	eager: true,
	query: '?url',
	import: 'default'
});

const byName: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
	const name = path.split('/').pop()?.replace('.webp', '');
	if (name) byName[name] = url;
}

export const workImageWidth = 1280;
export const workImageHeight = 720;

export function workImage(name: string): string | undefined {
	return byName[name];
}
