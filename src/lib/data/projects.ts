export type Project = {
	slug: string;
	name: string;
	url: string;
	image: string;
	sector: string;
	blurb: string;
	stack: string[];
	featured?: boolean;
};

/**
 * Live client sites. Stacks reflect what each site is actually built with.
 */
export const projects: Project[] = [
	{
		slug: 'westwoods-community-church',
		name: 'Westwoods Community Church',
		url: 'https://westwoodscc.org/',
		image: 'westwoodsCommunityChurch',
		sector: 'Church',
		blurb:
			'The largest site I maintain, and one I have rebuilt as the web has changed. Staff publish sermons, events and ministry pages themselves through a Sanity studio, with error monitoring and a database behind the custom pieces.',
		stack: ['SvelteKit', 'Sanity', 'Drizzle', 'Sentry', 'GSAP'],
		featured: true
	},
	{
		slug: 'guardian-garage-doors',
		name: 'Guardian Garage Doors',
		url: 'https://guardianrepairs.com/',
		image: 'guardianGarageDoors',
		sector: 'Home services',
		blurb:
			'A service business that lives or dies by the phone ringing. Built to load fast on a phone in a driveway, put the call button everywhere, and make the service area obvious.',
		stack: ['SvelteKit', 'GSAP', 'Netlify'],
		featured: true
	},
	{
		slug: 'kwd-woodworks',
		name: 'KWD Woodworks',
		url: 'https://kwdwoodworks.com/',
		image: 'kwdWoodworks',
		sector: 'Custom woodworking',
		blurb:
			'A maker whose work sells itself once you see it, so the build gets out of the way of the photography. New pieces go up from a Sanity studio without touching code.',
		stack: ['SvelteKit', 'Sanity', 'GSAP', 'Netlify'],
		featured: true
	},
	{
		slug: 'made-for-a-reason',
		name: 'Made For a Reason',
		url: 'https://madeforareasonbook.com/',
		image: 'madeForAReason',
		sector: 'Book / e-commerce',
		blurb:
			'An author selling direct to readers. Stripe checkout wired straight into the site, so there is no handoff to a third-party storefront in the middle of a sale.',
		stack: ['SvelteKit', 'Stripe', 'Cloudflare'],
		featured: true
	},
	{
		slug: 'hinesburg-cma-church',
		name: 'Hinesburg CMA Church',
		url: 'https://hinesburgcma.org',
		image: 'hinesburgCmaChurch',
		sector: 'Church',
		blurb:
			'A small church that needed to look established and keep its own content current. Sanity-backed pages and sermons, with a build simple enough for a volunteer to run.',
		stack: ['SvelteKit', 'Sanity', 'GSAP']
	},
	{
		slug: 'helping-hands-phlebotomy',
		name: 'Helping Hands Phlebotomy',
		url: 'https://www.helpinghandsphlebotomy.com/',
		image: 'helpingHandsPhlebotomy',
		sector: 'Mobile healthcare',
		blurb:
			'A mobile phlebotomy practice that books from the site. Masked, validated booking forms and transactional email that reaches the inbox rather than the spam folder.',
		stack: ['SvelteKit', 'Svelte Email', 'Vercel']
	},
	{
		slug: 'innovation-roofing',
		name: 'Innovation Roofing',
		url: 'https://innovationroofingllc.com/',
		image: 'innovationRoofing',
		sector: 'Roofing contractor',
		blurb:
			'A roofing contractor competing against template sites. Built lean and fast, with the estimate request never more than a tap away.',
		stack: ['SvelteKit', 'Netlify']
	},
	{
		slug: 'highland-417',
		name: 'Highland 417',
		url: 'https://highland417.com/',
		image: 'highland417',
		sector: 'Venue',
		blurb:
			'An event venue that sells on atmosphere. Scroll-driven motion carries the photography without turning the page into a slideshow, served from the edge.',
		stack: ['SvelteKit', 'GSAP', 'Cloudflare']
	},
	{
		slug: 'essential-strides',
		name: 'Essential Strides',
		url: 'https://essentialstrides.org/',
		image: 'essentialStrides',
		sector: 'Nonprofit',
		blurb:
			'A nonprofit that needed to explain its work and collect sign-ups in the same breath. Clear story up front, forms that do not fight the people filling them in.',
		stack: ['SvelteKit', 'Netlify']
	},
	{
		slug: 'brenda-bennett-art',
		name: 'Brenda Bennett Art',
		url: 'https://brendabennettart.com/',
		image: 'brendaBennettArt',
		sector: 'Artist portfolio',
		blurb:
			'A working artist with a growing catalogue. A gallery-first layout where the paintings get the room, and nothing in the interface competes with them.',
		stack: ['React', 'Gatsby']
	},
	{
		slug: 'lakewood-christmas',
		name: 'Lakewood Christmas',
		url: 'https://lakewoodchristmas.org',
		image: 'lakewoodChristmas',
		sector: 'Community event',
		blurb:
			'A community Christmas event that spikes hard for a few weeks a year. Rebuilt annually, tuned for image weight so it holds up when the whole town arrives at once.',
		stack: ['SvelteKit', 'Enhanced Images', 'Netlify']
	},
	{
		slug: 'easter-in-lakewood',
		name: 'Easter In Lakewood',
		url: 'https://easterinlakewood.com',
		image: 'easterInLakewood',
		sector: 'Community event',
		blurb:
			'The spring counterpart: one weekend, one job, which is getting people the time and the place without making them hunt for it.',
		stack: ['SvelteKit', 'GSAP', 'Netlify']
	}
];

export const featuredProjects = projects.filter((p) => p.featured);
