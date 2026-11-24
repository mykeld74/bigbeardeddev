import { defineEnvVars } from '@sveltejs/kit/env';

/**
 * Email delivery for the contact form, via Resend.
 *
 * All three are optional so the site builds and runs without them — the form
 * then validates as usual but tells the visitor to email directly instead of
 * failing silently. See .env.example.
 */
export const variables = defineEnvVars({
	RESEND_API_KEY: {
		description: 'Resend API key. Create one at resend.com/api-keys.',
		schema: (value) => value
	},
	FROM_EMAIL: {
		description:
			'Sender address for contact-form notifications, e.g. "Big Bearded Dev <hello@bigbearded.dev>". Must be on a domain verified in Resend.',
		schema: (value) => value
	},
	CONTACT_TO_EMAIL: {
		description: 'Where contact-form submissions are delivered. Defaults to mike@bigbearded.dev.',
		schema: (value) => value
	}
});
