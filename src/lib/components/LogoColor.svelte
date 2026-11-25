<script lang="ts">
	/**
	 * The full-colour mark, inlined so its eyes can be addressed.
	 *
	 * The pupils follow the pointer, cross when it sits between the eyes, and
	 * the eyes blink now and then. All of it is decoration: the SVG is
	 * aria-hidden, nothing here is needed to read the page, and it sits behind
	 * a reduced-motion check.
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
	/* Crossing gets its own, larger range. Sclera rx 26 minus iris rx 13 puts
	   the iris tangent to the inner rim at 13; past that the sclera clip shaves
	   its inner edge, which reads as the eye rolling further toward the nose
	   rather than as a cut-off shape. 16 takes that sliver. The pupil (rx 5)
	   stays clear of the rim, so the eye never goes blind-looking. Tracking
	   stays at 9 so a pupil merely following the pointer sits inside the eye. */
	const CROSS_RANGE_X = 16;
	/** Screen px from an eye centre to reach full deflection. */
	const FALLOFF = 100;
	/** How far above or below the eye line the crossed look survives, as a
	    multiple of the gap between the eyes. Without it, a pointer on the
	    chin would cross the eyes just for sharing an x with the nose. */
	const CROSS_REACH = 1.2;
	/** Reach full cross before the midpoint, so the inner third of the gap
	    holds it rather than peaking on one exact pixel. */
	const CROSS_BITE = 1.5;

	/** Ease the convergence on and off so it doesn't pop at the boundary. */
	const smooth = (t: number) => t * t * (3 - 2 * t);

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		// Move the whole eyeball — iris, pupil and glint together — inside the
		// fixed white sclera, rather than sliding the pupil across a static iris.
		// The sclera never moves, so it's the stable origin to aim from; the
		// ball's own box would chase itself.
		const eyes = [...host.querySelectorAll<SVGElement>('[data-eye]')]
			.map((eye) => ({
				ball: eye.querySelector<SVGElement>('[data-eye-part="ball"]'),
				socket: eye.querySelector<SVGElement>('[data-eye-part="sclera"]')
			}))
			.filter((eye): eye is { ball: SVGElement; socket: SVGElement } =>
				Boolean(eye.ball && eye.socket)
			);
		if (eyes.length === 0) return;

		let frame = 0;

		const track = (event: PointerEvent) => {
			// Coalesce to one update per frame; pointermove fires far faster.
			if (frame !== 0) return;
			frame = requestAnimationFrame(() => {
				frame = 0;

				// Measure every frame rather than caching: scrolling moves the
				// logo without firing pointermove.
				const sockets = eyes.map(({ socket }) => {
					const box = socket.getBoundingClientRect();
					return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
				});
				const midX = sockets.reduce((sum, s) => sum + s.x, 0) / sockets.length;
				const eyeY = sockets.reduce((sum, s) => sum + s.y, 0) / sockets.length;
				const xs = sockets.map((s) => s.x);
				const halfGap = (Math.max(...xs) - Math.min(...xs)) / 2;

				// Cross the eyes as the pointer enters the gap between them: full
				// at the midpoint, nothing by the time it reaches either eye, and
				// faded out vertically so it only reads as crossed near eye level.
				let cross = 0;
				if (halfGap > 0) {
					const inGap = Math.min(
						(1 - Math.min(Math.abs(event.clientX - midX) / halfGap, 1)) * CROSS_BITE,
						1
					);
					const level =
						1 - Math.min(Math.abs(event.clientY - eyeY) / (halfGap * 2 * CROSS_REACH), 1);
					cross = smooth(inGap) * smooth(level);
				}

				eyes.forEach(({ ball }, index) => {
					const origin = sockets[index];
					const dx = event.clientX - origin.x;
					const dy = event.clientY - origin.y;
					const distance = Math.hypot(dx, dy);

					// Direction from screen space; magnitude in SVG user units.
					let x = 0;
					let y = 0;
					if (distance >= 1) {
						const reach = Math.min(distance / FALLOFF, 1);
						x = (dx / distance) * reach * RANGE_X;
						y = (dy / distance) * reach * RANGE_Y;
					}

					// Pull toward the other eye. Plain tracking already aims each
					// pupil inward here, but the pointer is only half a gap away,
					// so the deflection is a couple of units — a squint, not a
					// cross. This overrides it to the full inward range.
					const inward = Math.sign(midX - origin.x) * CROSS_RANGE_X;
					x += (inward - x) * cross;

					ball.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
				});
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
