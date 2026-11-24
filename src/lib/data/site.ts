export const site = {
	name: 'Big Bearded Dev',
	owner: 'Mike Daugherty',
	role: 'Front-End Web Developer',
	url: 'https://bigbearded.dev',
	email: 'mike@bigbearded.dev',
	tagline: 'Fast, custom-built websites for people who need one that actually works.',
	description:
		'Mike Daugherty — front-end web developer building fast, accessible, custom websites in Svelte and SvelteKit. Over a decade of client work for small businesses, churches and nonprofits.',
	location: 'Lakewood, Colorado',
	since: 2012,
	/**
	 * Longest unbroken client relationship (Westwoods Community Church),
	 * shown in the hero. Stated as a floor rather than an exact figure.
	 */
	longestClient: '10+ years',
	links: {
		github: 'https://github.com/mykeld74',
		agency: 'https://msdweb.pro'
	}
} as const;

/** Years shipping front-end work, derived so it never goes stale. */
export const yearsExperience = new Date().getFullYear() - site.since;
