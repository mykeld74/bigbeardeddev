<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from './Logo.svelte';
	import { site, yearsExperience } from '#lib/data/site';

	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="wrap inner">
		<div class="brandCol">
			<a class="brand" href={resolve('/')} aria-label="{site.name} — home">
				<Logo size={56} title="" />
				<span>
					<strong>Big Bearded Dev</strong>
					<small>{site.owner}</small>
				</span>
			</a>
			<p class="blurb">
				Hand-built websites in Svelte and SvelteKit. {yearsExperience} years of client work out of
				{site.location}.
			</p>
		</div>

		<nav class="linkCols" aria-label="Footer">
			<div>
				<h2>Site</h2>
				<ul role="list">
					<li><a href={resolve('/work')}>Work</a></li>
					<li><a href={resolve('/services')}>Services</a></li>
					<li><a href={resolve('/about')}>About</a></li>
					<li><a href={resolve('/contact')}>Contact</a></li>
				</ul>
			</div>
			<div>
				<h2>Elsewhere</h2>
				<ul role="list">
					<li>
						<a href={site.links.github} rel="external me noreferrer" target="_blank">GitHub</a>
					</li>
					<li>
						<a href={site.links.agency} rel="external noreferrer" target="_blank">MSD Web Pros</a>
					</li>
					<li><a href="mailto:{site.email}" rel="external">{site.email}</a></li>
				</ul>
			</div>
		</nav>
	</div>

	<div class="wrap base">
		<p>&copy; {year} {site.owner}. Built by hand with SvelteKit.</p>
		<p class="mono">{site.location}</p>
	</div>
</footer>

<style>
	.footer {
		margin-top: auto;
		border-top: 1px solid var(--border);
		background: linear-gradient(
			180deg,
			transparent,
			color-mix(in oklab, var(--base800) 70%, transparent)
		);
		padding-top: clamp(3rem, 1.5rem + 4vw, 5rem);
	}

	.inner {
		display: grid;
		gap: clamp(2.5rem, 1rem + 5vw, 5rem);
		padding-bottom: 3rem;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		text-decoration: none;
		color: var(--text);
	}

	.brand strong {
		display: block;
		font-family: var(--fontDisplay);
		font-size: 1.2rem;
		font-weight: 600;
	}

	.brand small {
		display: block;
		font-family: var(--fontMono);
		font-size: 0.6875rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--textFaint);
	}

	.blurb {
		margin-top: 1.25rem;
		max-width: 30ch;
		font-size: var(--stepSm);
		color: var(--textMuted);
	}

	.linkCols {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 2rem;
	}

	.linkCols h2 {
		font-family: var(--fontMono);
		font-size: var(--stepXs);
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--textFaint);
		margin-bottom: 1rem;
	}

	.linkCols ul {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin: 0;
		padding: 0;
	}

	.linkCols a {
		font-size: var(--stepSm);
		color: var(--textMuted);
		text-decoration: none;
		transition: color 0.25s var(--ease);
	}

	.linkCols a:hover {
		color: var(--accentStrong);
	}

	.base {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		justify-content: space-between;
		align-items: center;
		padding-block: 1.5rem;
		border-top: 1px solid var(--border);
		font-size: var(--stepXs);
		color: var(--textFaint);
	}

	.mono {
		font-family: var(--fontMono);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	@media (min-width: 46rem) {
		.inner {
			grid-template-columns: 1.1fr 1fr;
			align-items: start;
		}
	}
</style>
