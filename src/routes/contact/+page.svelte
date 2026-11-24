<script lang="ts">
	import { enhance } from '$app/forms';
	import Seo from '#lib/components/Seo.svelte';
	import { site } from '#lib/data/site';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let submitting = $state(false);

	const values = $derived(form && 'values' in form ? form.values : undefined);
	const errors = $derived(form && 'errors' in form ? form.errors : undefined);

	const budgets = [
		'Not sure yet',
		'Under $2,000',
		'$2,000 – $5,000',
		'$5,000 – $10,000',
		'$10,000+'
	];
</script>

<Seo
	title="Contact"
	description="Start a project with Mike Daugherty — tell him about your business and what your website needs to do."
/>

<section class="section pageHead">
	<div class="wrap">
		<p class="eyebrow">Contact</p>
		<h1>Let's talk about your project</h1>
		<p class="lead prose">
			Tell me what your business does and what you need the site to accomplish. I read every message
			myself and I'll get back to you — including when I'm not the right fit.
		</p>
	</div>
</section>

<section class="section formSection">
	<div class="wrap contactGrid">
		<div class="formCol">
			{#if form?.success}
				<div class="card notice noticeGood" role="status">
					<h2>Message sent</h2>
					<p>
						Thanks for reaching out — it's in my inbox and I'll reply as soon as I can, usually
						within a day or two. If it's urgent, email me directly at
						<a href="mailto:{site.email}" rel="external">{site.email}</a>.
					</p>
				</div>
			{:else}
				{#if form && 'formError' in form && form.formError}
					<div class="card notice noticeBad" role="alert">
						<p>{form.formError}</p>
					</div>
				{/if}

				<form
					method="POST"
					class="card contactForm"
					novalidate
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							await update();
							submitting = false;
						};
					}}
				>
					<div class="field">
						<label for="name">Your name <span aria-hidden="true">*</span></label>
						<input
							id="name"
							name="name"
							type="text"
							autocomplete="name"
							required
							value={values?.name ?? ''}
							aria-invalid={errors?.name ? 'true' : undefined}
							aria-describedby={errors?.name ? 'nameError' : undefined}
						/>
						{#if errors?.name}
							<p class="fieldError" id="nameError">{errors.name}</p>
						{/if}
					</div>

					<div class="fieldRow">
						<div class="field">
							<label for="email">Email <span aria-hidden="true">*</span></label>
							<input
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								required
								value={values?.email ?? ''}
								aria-invalid={errors?.email ? 'true' : undefined}
								aria-describedby={errors?.email ? 'emailError' : undefined}
							/>
							{#if errors?.email}
								<p class="fieldError" id="emailError">{errors.email}</p>
							{/if}
						</div>

						<div class="field">
							<label for="phone">Phone <span class="optional">optional</span></label>
							<input
								id="phone"
								name="phone"
								type="tel"
								autocomplete="tel"
								value={values?.phone ?? ''}
							/>
						</div>
					</div>

					<div class="fieldRow">
						<div class="field">
							<label for="company">
								Business or organization <span class="optional">optional</span>
							</label>
							<input
								id="company"
								name="company"
								type="text"
								autocomplete="organization"
								value={values?.company ?? ''}
							/>
						</div>

						<div class="field">
							<label for="budget">Rough budget <span class="optional">optional</span></label>
							<select id="budget" name="budget">
								<option value="">Choose one</option>
								{#each budgets as budget (budget)}
									<option value={budget} selected={values?.budget === budget}>{budget}</option>
								{/each}
							</select>
						</div>
					</div>

					<div class="field">
						<label for="message">
							What do you need? <span aria-hidden="true">*</span>
						</label>
						<textarea
							id="message"
							name="message"
							rows="7"
							required
							placeholder="A new site, a rebuild, something that's broken — and anything you already know about what it has to do."
							aria-invalid={errors?.message ? 'true' : undefined}
							aria-describedby={errors?.message ? 'messageError' : undefined}
							>{values?.message ?? ''}</textarea
						>
						{#if errors?.message}
							<p class="fieldError" id="messageError">{errors.message}</p>
						{/if}
					</div>

					<!-- spam trap, intentionally hidden from people -->
					<div class="honeypot" aria-hidden="true">
						<label for="website">Website</label>
						<input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
					</div>

					<div class="formFoot">
						<button class="btn btnPrimary" type="submit" disabled={submitting}>
							{submitting ? 'Sending…' : 'Send message'}
						</button>
						<p class="formNote">Required fields are marked <span aria-hidden="true">*</span></p>
					</div>
				</form>
			{/if}
		</div>

		<aside class="asideCol">
			<div class="card infoCard">
				<h2 class="cardTitle">Prefer email?</h2>
				<p>
					Go straight to the source:
					<a href="mailto:{site.email}" rel="external">{site.email}</a>
				</p>
			</div>

			<div class="card infoCard">
				<h2 class="cardTitle">What happens next</h2>
				<ol class="steps" role="list">
					<li>I read your message and reply, usually within a day or two.</li>
					<li>We get on a call or trade emails so I understand the job properly.</li>
					<li>You get a straight answer on scope, timeline and cost — no surprises later.</li>
				</ol>
			</div>

			<div class="card infoCard">
				<h2 class="cardTitle">Good to know</h2>
				<p>
					I'm one developer in {site.location}, taking a handful of projects at a time. That means
					honest timelines and you always talking to the person building the thing.
				</p>
			</div>
		</aside>
	</div>
</section>

<style>
	.pageHead {
		padding-block: clamp(3rem, 1.5rem + 5vw, 5.5rem) 0;
	}

	.pageHead h1 {
		font-size: var(--step4);
		margin-bottom: 1.25rem;
	}

	.formSection {
		padding-top: clamp(2.5rem, 1.5rem + 3vw, 4rem);
	}

	.contactGrid {
		display: grid;
		gap: clamp(1.5rem, 1rem + 2vw, 2.5rem);
		align-items: start;
	}

	/* --- form ------------------------------------------------------------- */
	.contactForm {
		display: flex;
		flex-direction: column;
		gap: 1.35rem;
		padding: clamp(1.5rem, 1rem + 2vw, 2.5rem);
	}

	.fieldRow {
		display: grid;
		gap: 1.35rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	label {
		font-size: var(--stepSm);
		font-weight: 500;
		color: var(--text);
	}

	label span[aria-hidden='true'] {
		color: var(--accent);
	}

	.optional {
		font-weight: 400;
		font-size: var(--stepXs);
		color: var(--textFaint);
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 0.75rem 0.9rem;
		background: color-mix(in oklab, var(--base900) 70%, transparent);
		border: 1px solid var(--border);
		border-radius: var(--radiusSm);
		color: var(--text);
		font-size: var(--step0);
		transition:
			border-color 0.2s var(--ease),
			background-color 0.2s var(--ease);
	}

	textarea {
		resize: vertical;
		min-height: 9rem;
		line-height: 1.6;
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--textFaint);
	}

	input:hover,
	select:hover,
	textarea:hover {
		border-color: var(--borderStrong);
	}

	input:focus-visible,
	select:focus-visible,
	textarea:focus-visible {
		outline: 2px solid var(--focusRing);
		outline-offset: 1px;
		border-color: var(--accent);
	}

	[aria-invalid='true'] {
		border-color: var(--copper400);
	}

	.fieldError {
		font-size: var(--stepXs);
		color: var(--copper300);
	}

	.honeypot {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.formFoot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	.formNote {
		font-size: var(--stepXs);
		color: var(--textFaint);
	}

	.formNote span {
		color: var(--accent);
	}

	button[disabled] {
		opacity: 0.6;
		cursor: progress;
		transform: none;
	}

	/* --- notices ---------------------------------------------------------- */
	.notice {
		padding: clamp(1.5rem, 1rem + 1.5vw, 2.25rem);
	}

	.notice h2 {
		margin-bottom: 0.75rem;
	}

	.notice p {
		color: var(--textMuted);
	}

	.noticeGood {
		border-color: color-mix(in oklab, var(--accent) 45%, transparent);
		background:
			radial-gradient(
				120% 140% at 0% 0%,
				color-mix(in oklab, var(--blue700) 45%, transparent),
				transparent 60%
			),
			var(--surface);
	}

	.noticeBad {
		border-color: color-mix(in oklab, var(--copper400) 55%, transparent);
		margin-bottom: 1.25rem;
	}

	/* --- aside ------------------------------------------------------------ */
	.asideCol {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.infoCard {
		padding: 1.5rem;
	}

	.cardTitle {
		font-family: var(--fontMono);
		font-size: var(--stepXs);
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--border);
	}

	.infoCard p {
		font-size: var(--stepSm);
		color: var(--textMuted);
	}

	.infoCard a {
		color: var(--accentStrong);
		overflow-wrap: anywhere;
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: 0;
		padding: 0;
		counter-reset: step;
	}

	.steps li {
		position: relative;
		padding-left: 2rem;
		font-size: var(--stepSm);
		color: var(--textMuted);
		counter-increment: step;
	}

	.steps li::before {
		content: counter(step);
		position: absolute;
		left: 0;
		top: 0.1em;
		display: grid;
		place-items: center;
		width: 1.35rem;
		height: 1.35rem;
		border-radius: 50%;
		border: 1px solid var(--border);
		font-family: var(--fontMono);
		font-size: 0.6875rem;
		color: var(--accent);
	}

	@media (min-width: 38rem) {
		.fieldRow {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 60rem) {
		.contactGrid {
			grid-template-columns: 1.5fr 0.85fr;
		}
	}
</style>
