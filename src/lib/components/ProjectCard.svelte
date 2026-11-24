<script lang="ts">
	import type { Project } from '#lib/data/projects';
	import { workImage, workImageWidth, workImageHeight } from '#lib/images';

	let { project, priority = false }: { project: Project; priority?: boolean } = $props();

	const src = $derived(workImage(project.image));
</script>

<article class="card projectCard">
	<a
		class="shot"
		href={project.url}
		target="_blank"
		rel="external noreferrer"
		tabindex="-1"
		aria-hidden="true"
	>
		{#if src}
			<img
				{src}
				alt=""
				width={workImageWidth}
				height={workImageHeight}
				loading={priority ? 'eager' : 'lazy'}
				fetchpriority={priority ? 'high' : 'auto'}
				decoding="async"
			/>
		{/if}
	</a>

	<div class="body">
		<p class="sector">{project.sector}</p>
		<h3>
			<a href={project.url} target="_blank" rel="external noreferrer">
				{project.name}
				<svg viewBox="0 0 24 24" aria-hidden="true" class="arrow">
					<path
						d="M7 17 17 7M9 7h8v8"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span class="srOnly">(opens in a new tab)</span>
			</a>
		</h3>
		<p class="blurb">{project.blurb}</p>
		<ul class="stack" role="list">
			{#each project.stack as tech (tech)}
				<li>{tech}</li>
			{/each}
		</ul>
	</div>
</article>

<style>
	.projectCard {
		display: flex;
		flex-direction: column;
		/* Fill the grid cell so every card in a row is the same height. */
		height: 100%;
		overflow: hidden;
		transition:
			border-color 0.3s var(--ease),
			transform 0.3s var(--ease),
			box-shadow 0.3s var(--ease);
	}

	.projectCard:hover {
		border-color: var(--borderStrong);
		transform: translateY(-4px);
		box-shadow: var(--shadowLg);
	}

	.shot {
		display: block;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: var(--base700);
		border-bottom: 1px solid var(--border);
	}

	.shot img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		transition: scale 0.6s var(--ease);
	}

	.projectCard:hover .shot img {
		scale: 1.03;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		/* Take the leftover height so `.stack` can sit at the bottom. */
		flex: 1;
		padding: clamp(1.25rem, 1rem + 1vw, 1.75rem);
	}

	.sector {
		font-family: var(--fontMono);
		font-size: var(--stepXs);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--textFaint);
	}

	h3 {
		font-size: var(--step2);
	}

	h3 a {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		text-decoration: none;
		color: var(--text);
		transition: color 0.25s var(--ease);
	}

	h3 a:hover {
		color: var(--accentStrong);
	}

	.arrow {
		width: 0.85em;
		height: 0.85em;
		flex-shrink: 0;
		color: var(--accent);
		transition: translate 0.25s var(--ease);
	}

	h3 a:hover .arrow {
		translate: 2px -2px;
	}

	.blurb {
		font-size: var(--stepSm);
		line-height: 1.6;
		color: var(--textMuted);
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		/* Pinned to the bottom so tool tags line up across the row. */
		margin: auto 0 0;
		padding-top: 0.35rem;
	}

	.stack li {
		padding: 0.25rem 0.6rem;
		border: 1px solid var(--border);
		border-radius: var(--radiusPill);
		font-family: var(--fontMono);
		font-size: 0.6875rem;
		letter-spacing: 0.04em;
		color: var(--textMuted);
		background: color-mix(in oklab, var(--base600) 45%, transparent);
	}
</style>
