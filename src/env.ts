import { defineEnvVars } from '@sveltejs/kit/env';

/**
 * Credentials for the Gmail account that sends contact-form notifications.
 * Both are optional so the site builds and runs without them — the contact
 * form then reports that it is not configured instead of failing silently.
 * See .env.example.
 */
export const variables = defineEnvVars({
	GOOGLE_EMAIL: {
		description: 'Gmail address used as the sender for contact-form notifications.',
		schema: (value) => value
	},
	GOOGLE_EMAIL_PASSWORD: {
		description: 'Google App Password for GOOGLE_EMAIL (not the account password).',
		schema: (value) => value
	}
});
