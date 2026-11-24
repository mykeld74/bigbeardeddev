import { fail } from '@sveltejs/kit';
import { GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD } from '$app/env/private';
import nodemailer from 'nodemailer';
import type { Actions } from './$types';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = {
	name: string;
	email: string;
	phone: string;
	company: string;
	budget: string;
	message: string;
};

/** FormData values can be `File`; only strings are accepted here. */
function text(data: FormData, key: string) {
	const value = data.get(key);
	return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const fields: Fields = {
			name: text(data, 'name'),
			email: text(data, 'email'),
			phone: text(data, 'phone'),
			company: text(data, 'company'),
			budget: text(data, 'budget'),
			message: text(data, 'message')
		};

		// Honeypot: real people leave this hidden field empty.
		if (text(data, 'website').length > 0) {
			return { success: true };
		}

		const errors: Record<string, string> = {};
		if (fields.name.length < 2) errors.name = 'Please tell me your name.';
		if (!emailPattern.test(fields.email)) errors.email = 'That email address looks off.';
		if (fields.message.length < 20) {
			errors.message = 'A little more detail helps — 20 characters or more.';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values: fields });
		}

		const user = GOOGLE_EMAIL;
		const pass = GOOGLE_EMAIL_PASSWORD;

		if (!user || !pass) {
			console.error('Contact form: GOOGLE_EMAIL / GOOGLE_EMAIL_PASSWORD are not configured.');
			return fail(500, {
				values: fields,
				formError:
					'The contact form is not wired up yet on this environment. Please email mike@bigbearded.dev directly.'
			});
		}

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: { user, pass }
		});

		const rows: [string, string][] = [
			['Name', fields.name],
			['Email', fields.email],
			['Phone', fields.phone || 'Not provided'],
			['Business', fields.company || 'Not provided'],
			['Budget', fields.budget || 'Not provided']
		];

		try {
			await transporter.sendMail({
				from: user,
				to: 'mike@bigbearded.dev',
				replyTo: `${fields.name} <${fields.email}>`,
				subject: `bigbearded.dev — new inquiry from ${fields.name}`,
				text: [
					...rows.map(([label, value]) => `${label}: ${value}`),
					'',
					'Message:',
					fields.message
				].join('\n'),
				html: `
					<h2>New inquiry from bigbearded.dev</h2>
					<table cellpadding="6" style="border-collapse:collapse">
						${rows
							.map(
								([label, value]) =>
									`<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`
							)
							.join('')}
					</table>
					<h3>Message</h3>
					<p>${escapeHtml(fields.message).replace(/\n/g, '<br />')}</p>
				`
			});

			return { success: true };
		} catch (error) {
			console.error('Contact form: failed to send mail', error);
			return fail(500, {
				values: fields,
				formError:
					'Something went wrong sending that. Please try again, or email mike@bigbearded.dev directly.'
			});
		}
	}
} satisfies Actions;
