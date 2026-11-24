import { site } from '#lib/data/site';

export const prerender = true;

const routes = ['/', '/work', '/services', '/about', '/contact'];

export function GET() {
	const today = new Date().toISOString().slice(0, 10);

	const body = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(route) => `	<url>
		<loc>${new URL(route, site.url).href}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>${route === '/' ? '1.0' : '0.7'}</priority>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
