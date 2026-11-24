<script lang="ts">
	/**
	 * The full-colour mark, inlined so its eyes can be addressed.
	 *
	 * The pupils follow the pointer and the eyes blink now and then. Both are
	 * decoration: the SVG is aria-hidden, nothing here is needed to read the
	 * page, and it all sits behind a reduced-motion check.
	 */
	import { onMount } from 'svelte';
	import raw from '#lib/assets/logo-color.svg?raw';

	let { width = 404, height = 710 }: { width?: number; height?: number } = $props();

	let host: HTMLElement;

	/* How far the eyeball may travel inside the sclera, in SVG user units.
	   Sclera is rx 26 / ry 13, iris rx 13 / ry 11.5. Vertical range lets up
	   to ~1/4 of the iris tuck under the lid (clipped to the sclera). */
	const RANGE_X = 9;
	const RANGE_Y = 4.4;
	/** Screen px from an eye centre to reach full deflection. Short enough that
	    a pointer between the eyes pulls each pupil inward (cross-eyed). */
	const FALLOFF = 100;

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		// Move the whole eyeball — iris, pupil and glint together — inside the
		// fixed white sclera, rather than sliding the pupil across a static iris.
		const movers = [...host.querySelectorAll<SVGElement>('[data-eye-part="ball"]')];
		if (movers.length === 0) return;

		let frame = 0;

		const track = (event: PointerEvent) => {
			// Coalesce to one update per frame; pointermove fires far faster.
			if (frame !== 0) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				for (const part of movers) {
					// Aim from the resting eye centre (parent clip), not the
					// moving ball — otherwise feedback fights cross-eye looks.
					const origin = (part.parentElement ?? part).getBoundingClientRect();
					const dx = event.clientX - (origin.left + origin.width / 2);
					const dy = event.clientY - (origin.top + origin.height / 2);
					const distance = Math.hypot(dx, dy);
					if (distance < 1) {
						part.style.translate = '';
						continue;
					}
					// Direction from screen space; magnitude in SVG user units.
					// x = dx * RANGE / FALLOFF (capped), so a pointer between
					// the eyes drives each pupil toward the other.
					const reach = Math.min(distance / FALLOFF, 1);
					const x = ((dx / distance) * reach * RANGE_X).toFixed(2);
					const y = ((dy / distance) * reach * RANGE_Y).toFixed(2);
					part.style.translate = `${x}px ${y}px`;
				}
			});
		};

		window.addEventListener('pointermove', track, { passive: true });

		return () => {
			window.removeEventListener('pointermove', track);
			if (frame !== 0) cancelAnimationFrame(frame);
		};
	});
</script>

<div class="logoColor" style="--w:{width};--h:{height}" bind:this={host} aria-hidden="true">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html raw}
</div>

<style>
	.logoColor {
		width: 100%;
	}

	.logoColor :global(svg) {
		width: 100%;
		height: auto;
		display: block;
		overflow: visible;
	}

	/* The eyeball eases toward the pointer rather than snapping to it. */
	.logoColor :global([data-eye-part='ball']) {
		transition: translate 0.35s cubic-bezier(0.22, 1, 0.36, 1);
	}

	/* Blink the whole eye as one unit. Scaling the parts individually left
	   the pupil and glint behind while only the iris flattened. Scaling about
	   the group's own box needs fill-box; the default (view-box) would scale
	   it around the whole artwork. */
	.logoColor :global([data-eye]) {
		transform-box: fill-box;
		transform-origin: center;
	}

	@media (prefers-reduced-motion: no-preference) {
		.logoColor :global([data-eye]) {
			animation: blink 7s infinite both;
		}
	}

	@keyframes blink {
		0%,
		93%,
		100% {
			scale: 1 1;
		}
		96% {
			/* Fully close so the pupil cannot leave a dark speck on the lid line.
			   Skin-colored sockets under the eyes cover the black facial paths
			   that would otherwise show through while the sclera is scaled down. */
			scale: 1 0;
		}
	}
</style>
