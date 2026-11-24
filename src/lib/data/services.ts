export type Service = {
	title: string;
	summary: string;
	points: string[];
};

export const services: Service[] = [
	{
		title: 'Websites built from scratch',
		summary:
			'A site designed and hand-coded for your business, not a theme with your logo dropped on it. Every page is written for what you actually need it to do.',
		points: [
			'Design and build, start to finish',
			'Fast on a phone, on real-world connections',
			'Accessible and readable by default',
			'Search-ready markup and metadata'
		]
	},
	{
		title: 'Content you can edit yourself',
		summary:
			'If your site changes week to week, you should not be emailing a developer about it. I wire your pages up to a content studio and show you how to use it.',
		points: [
			'Sanity-backed pages, posts and events',
			'Edit text and images without touching code',
			'Preview changes before they go live',
			'Training session, and I stay reachable after'
		]
	},
	{
		title: 'Rebuilds and rescues',
		summary:
			'Slow, broken, unmaintained, or built by someone who has moved on. I take over existing sites and bring them back up to standard.',
		points: [
			'Performance and Core Web Vitals work',
			'Migration off abandoned platforms',
			'Mobile and accessibility fixes',
			'Kept current, year over year'
		]
	},
	{
		title: 'Forms, checkout and the moving parts',
		summary:
			'The things that have to work: inquiry forms that arrive, bookings that land in a calendar, payments that clear.',
		points: [
			'Booking and inquiry forms with real validation',
			'Transactional email that reaches the inbox',
			'Stripe checkout wired directly into the site',
			'Error monitoring so failures surface early'
		]
	}
];

export type ProcessStep = {
	n: string;
	title: string;
	body: string;
};

export const processSteps: ProcessStep[] = [
	{
		n: '01',
		title: 'We talk',
		body: 'What the business does, who it serves, and what the site has to accomplish. No pitch deck. I ask a lot of questions and listen to the answers.'
	},
	{
		n: '02',
		title: 'I design it',
		body: 'You see layouts built around your content, not placeholder text. We settle the look and the structure before a line of production code gets written.'
	},
	{
		n: '03',
		title: 'I build it',
		body: 'Hand-coded, tested on real devices, checked for speed and accessibility as I go. You get a live preview link and can watch it take shape.'
	},
	{
		n: '04',
		title: 'You launch, I stay',
		body: 'We go live, I walk you through editing your own content, and I am still here next year when something needs changing.'
	}
];

export type SkillGroup = {
	label: string;
	items: string[];
};

export const skillGroups: SkillGroup[] = [
	{
		label: 'Core',
		items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Accessibility', 'Responsive design']
	},
	{
		label: 'Frameworks',
		items: ['Svelte 5', 'SvelteKit', 'Runes', 'React', 'Gatsby', 'Vite']
	},
	{
		label: 'Content & data',
		items: ['Sanity', 'GROQ', 'Portable Text', 'Drizzle', 'Postgres', 'Payload']
	},
	{
		label: 'Motion & craft',
		items: ['GSAP', 'View transitions', 'CSS animation', 'Scroll-driven animation', 'SVG']
	},
	{
		label: 'Ship & run',
		items: ['Netlify', 'Cloudflare', 'Vercel', 'Stripe', 'Sentry', 'Git']
	}
];
