<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Logo from './Logo.svelte';
	import { site } from '#lib/data/site';

	const navItems = [
		{ label: 'Work', href: resolve('/work') },
		{ label: 'Services', href: resolve('/services') },
		{ label: 'About', href: resolve('/about') }
	];

	let menuOpen = $state(false);
	let scrolled = $state(false);

	const currentPath = $derived(page.url.pathname);

	function isActive(href: string) {
		return currentPath === href || currentPath.startsWith(href + '/');
	}

	function onScroll() {
		scrolled = window.scrollY > 16;
	}
</script>

<svelte:window on:scroll={onScroll} />

<header class="header" class:scrolled data-open={menuOpen}>
	<div class="bar wrap">
		<a
			class="brand"
			href={resolve('/')}
			aria-label="{site.name} — home"
			onclick={() => (menuOpen = false)}
		>
			<Logo size={38} title="" variant="color" />
			<span class="brandText">
				<strong>Big Bearded Dev</strong>
				<small>{site.owner}</small>
			</span>
		</a>

		<nav class="desktopNav" aria-label="Main">
			<ul role="list">
				{#each navItems as item (item.href)}
					<li>
						<a href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
			<a class="btn btnPrimary navCta" href={resolve('/contact')}>Start a project</a>
		</nav>

		<button
			class="menuToggle"
			type="button"
			aria-expanded={menuOpen}
			aria-controls="mobileNav"
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span class="srOnly">{menuOpen ? 'Close menu' : 'Open menu'}</span>
			<svg viewBox="0 0 24 24" aria-hidden="true" class="menuIcon">
				{#if menuOpen}
					<path d="M6 6l12 12M18 6L6 18" />
				{:else}
					<path d="M4 7h16M4 12h16M4 17h16" />
				{/if}
			</svg>
		</button>
	</div>

	<nav id="mobileNav" class="mobileNav" aria-label="Main" hidden={!menuOpen}>
		<ul role="list">
			{#each navItems as item (item.href)}
				<li>
					<a
						href={item.href}
						aria-current={isActive(item.href) ? 'page' : undefined}
						onclick={() => (menuOpen = false)}
					>
						{item.label}
					</a>
				</li>
			{/each}
			<li>
				<a class="btn btnPrimary" href={resolve('/contact')} onclick={() => (menuOpen = false)}>
					Start a project
				</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: color-mix(in oklab, var(--base900) 72%, transparent);
		border-bottom: 1px solid transparent;
		transition:
			background-color 0.3s var(--ease),
			border-color 0.3s var(--ease),
			backdrop-filter 0.3s var(--ease);
	}

	@supports (backdrop-filter: blur(1px)) {
		.header {
			backdrop-filter: blur(14px) saturate(140%);
		}
	}

	.header.scrolled,
	.header[data-open='true'] {
		background: color-mix(in oklab, var(--base900) 92%, transparent);
		border-bottom-color: var(--border);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 4.5rem;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		text-decoration: none;
		color: var(--text);
		transition: color 0.25s var(--ease);
	}

	.brand:hover {
		color: var(--accentStrong);
	}

	.brandText {
		display: flex;
		flex-direction: column;
		line-height: 1.15;
	}

	.brandText strong {
		font-family: var(--fontDisplay);
		font-size: 1.05rem;
		font-weight: 600;
	}

	.brandText small {
		font-family: var(--fontMono);
		font-size: 0.6875rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--textFaint);
	}

	.desktopNav {
		display: none;
		align-items: center;
		gap: 2rem;
	}

	.desktopNav ul {
		display: flex;
		align-items: center;
		gap: 1.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.desktopNav a:not(.navCta) {
		position: relative;
		font-size: var(--stepSm);
		font-weight: 500;
		color: var(--textMuted);
		text-decoration: none;
		padding-block: 0.4rem;
		transition: color 0.25s var(--ease);
	}

	.desktopNav a:not(.navCta)::after {
		content: '';
		position: absolute;
		inset-inline: 0;
		bottom: 0;
		height: 1px;
		background: var(--accent);
		scale: 0 1;
		transform-origin: left;
		transition: scale 0.3s var(--ease);
	}

	.desktopNav a:not(.navCta):hover,
	.desktopNav a[aria-current='page'] {
		color: var(--text);
	}

	.desktopNav a:not(.navCta):hover::after,
	.desktopNav a[aria-current='page']::after {
		scale: 1 1;
	}

	.navCta {
		padding: 0.65em 1.25em;
	}

	/* --- mobile ---------------------------------------------------------- */

	.menuToggle {
		display: inline-grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radiusSm);
		cursor: pointer;
	}

	.menuIcon {
		width: 1.25rem;
		height: 1.25rem;
		fill: none;
		stroke: var(--text);
		stroke-width: 1.75;
		stroke-linecap: round;
	}

	.mobileNav {
		border-top: 1px solid var(--border);
		padding: 1rem var(--gutter) 1.75rem;
	}

	.mobileNav ul {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.mobileNav a:not(.btn) {
		display: block;
		padding: 0.85rem 0.25rem;
		font-family: var(--fontDisplay);
		font-size: 1.35rem;
		color: var(--textMuted);
		text-decoration: none;
		border-bottom: 1px solid var(--border);
	}

	.mobileNav a[aria-current='page'] {
		color: var(--accentStrong);
	}

	.mobileNav .btn {
		margin-top: 1.25rem;
		width: 100%;
	}

	@media (min-width: 52rem) {
		.desktopNav {
			display: flex;
		}

		.menuToggle,
		.mobileNav {
			display: none;
		}
	}
</style>
