export type Project = {
	slug: string;
	name: string;
	url: string;
	image: string;
	sector: string;
	blurb: string;
	stack: string[];
	featured?: boolean;
	/** Screenshot this URL instead of `url` (e.g. past a login redirect). */
	captureUrl?: string;
	/** Needs a signed-in session saved by `pnpm screenshots:login`. */
	auth?: boolean;
	/**
	 * Image was supplied by hand rather than captured. A full `pnpm screenshots`
	 * run leaves it alone; naming the project explicitly still recaptures it.
	 */
	manualShot?: boolean;
};

/**
 * Sites shown on the work page. Stacks reflect what each one is really built with.
 */
export const projects: Project[] = [
	{
		slug: 'westwoods-community-church',
		name: 'Westwoods Community Church',
		url: 'https://westwoodscc.org/',
		image: 'westwoodsCommunityChurch',
		sector: 'Church',
		blurb:
			'The largest site I maintain, and one I have rebuilt as the web has changed. Content runs through a Sanity studio, with a database behind the custom features and error monitoring watching the whole thing.',
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
		slug: 'the-russell-farm',
		name: 'The Russell Farm',
		url: 'https://therussellfarm.com',
		image: 'theRussellFarm',
		sector: 'Farm & agritourism',
		blurb:
			'A working farm that sells by the season — Christmas trees in winter, maple syrup in spring. Visitors book their own slots and manage reservations through accounts, with an admin side the farm runs through its busiest weeks.',
		stack: ['SvelteKit', 'Drizzle', 'Neon', 'Better Auth', 'Resend'],
		featured: true
	},
	{
		slug: 'made-for-a-reason',
		name: 'Made For a Reason',
		url: 'https://madeforareasonbook.com/',
		image: 'madeForAReason',
		sector: 'Book / e-commerce',
		blurb:
			"An author selling a personalized children's book direct to readers. The child's name and nickname run through all 32 pages, so the order has to capture that exactly, and Stripe checkout runs on the site rather than handing off to a storefront.",
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
			'A Vermont church whose site does two jobs: welcome someone planning a first visit, and keep ministry pages and sermons current week to week. The team publishes its own content through a Sanity studio, with a dark mode across the whole site.',
		stack: ['SvelteKit', 'Sanity', 'GSAP']
	},
	{
		slug: 'helping-hands-phlebotomy',
		name: 'Helping Hands Phlebotomy',
		url: 'https://www.helpinghandsphlebotomy.com/',
		image: 'helpingHandsPhlebotomy',
		sector: 'Mobile healthcare',
		blurb:
			'A mobile phlebotomy practice that takes its bookings through the site. Forms that shape phone numbers and dates as you type, and confirmation email that reaches the inbox rather than the spam folder.',
		stack: ['SvelteKit', 'Svelte Email', 'Vercel']
	},
	{
		slug: 'workout-builder',
		name: 'Workout Builder',
		url: 'https://theworkoutbuilder.com',
		image: 'workoutBuilder',
		sector: 'Fitness app',
		blurb:
			'A training app that builds plans around your age and the equipment you own, rather than assuming a full gym. Accounts, saved sessions and progress tracking, backed by Postgres.',
		stack: ['SvelteKit', 'Drizzle', 'Neon', 'Better Auth'],
		auth: true,
		manualShot: true
	},
	{
		slug: 'highland-417',
		name: 'Highland 417',
		url: 'https://highland417.com/',
		image: 'highland417',
		sector: 'Business IT & security',
		blurb:
			'A B2B IT firm selling infrastructure, security and ongoing stewardship — explicitly not consumer tech support. The site has to make that distinction immediately and turn the right kind of visitor into a booked consultation.',
		stack: ['SvelteKit', 'GSAP', 'Cloudflare']
	},
	{
		slug: 'essential-strides',
		name: 'Essential Strides',
		url: 'https://essentialstrides.org/',
		image: 'essentialStrides',
		sector: 'Medical nonprofit',
		blurb:
			'A medical mission nonprofit treating lower-extremity conditions, started by two doctors. The site has to make specialized medical work clear to donors and volunteers, then make getting involved easy.',
		stack: ['SvelteKit', 'Netlify']
	},
	{
		slug: 'brenda-bennett-art',
		name: 'Brenda Bennett Art',
		url: 'https://brendabennettart.com/',
		image: 'brendaBennettArt',
		sector: 'Artist gallery',
		blurb:
			'An artist who paints with paper, so the work only lands when you can see it up close. A gallery-first build covering originals, prints, commissions and workshops, with nothing in the interface competing with the art.',
		stack: ['React', 'Gatsby']
	},
	{
		slug: 'lakewood-christmas',
		name: 'Lakewood Christmas',
		url: 'https://lakewoodchristmas.org',
		image: 'lakewoodChristmas',
		sector: 'Community Event',
		blurb:
			'A Christmas Eve campaign site for Westwoods — three services, one invitation. It answers what a first-time visitor needs to know (when, where, how long, what happens) and gets rebuilt each year as the dates change.',
		stack: ['SvelteKit', 'Enhanced Images', 'Netlify']
	},
	{
		slug: 'easter-in-lakewood',
		name: 'Easter In Lakewood',
		url: 'https://easterinlakewood.com',
		image: 'easterInLakewood',
		sector: 'Community Event',
		blurb:
			'Westwoods again in spring — Easter Sunday, Good Friday and the egg hunt. The copy is aimed at people who do not go to church, so the site has to read as an invitation rather than an announcement.',
		stack: ['SvelteKit', 'GSAP', 'Netlify']
	}
];

export const featuredProjects = projects.filter((p) => p.featured);
