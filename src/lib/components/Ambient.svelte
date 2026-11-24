<!--
	Ambient background light. A CSS-only stand-in for the old WebGL godrays,
	so it renders the same in every browser and costs nothing to paint.
-->
<div class="ambient" aria-hidden="true">
	<span class="ray rayOne"></span>
	<span class="ray rayTwo"></span>
	<span class="glow"></span>
	<span class="grain"></span>
</div>

<style>
	.ambient {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.ray {
		position: absolute;
		top: -30vh;
		left: -10vw;
		width: 55vw;
		height: 150vh;
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--blue500) 26%, transparent),
			transparent 72%
		);
		rotate: 18deg;
		filter: blur(60px);
		opacity: 0.55;
	}

	.rayTwo {
		left: 22vw;
		width: 32vw;
		rotate: 10deg;
		opacity: 0.35;
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--copper400) 16%, transparent),
			transparent 65%
		);
	}

	.glow {
		position: absolute;
		top: -22vh;
		left: 50%;
		translate: -50% 0;
		width: min(90rem, 140vw);
		aspect-ratio: 2 / 1;
		border-radius: 50%;
		background: radial-gradient(
			ellipse at center,
			color-mix(in oklab, var(--blue500) 22%, transparent),
			transparent 68%
		);
		filter: blur(20px);
	}

	.grain {
		position: absolute;
		inset: 0;
		opacity: 0.035;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
	}

	@media (prefers-reduced-motion: no-preference) {
		.ray {
			animation: drift 18s ease-in-out infinite alternate;
		}

		.rayTwo {
			animation-duration: 25s;
			animation-delay: -6s;
		}
	}

	@keyframes drift {
		from {
			translate: 0 0;
			opacity: 0.4;
		}
		to {
			translate: 4vw 0;
			opacity: 0.6;
		}
	}
</style>
