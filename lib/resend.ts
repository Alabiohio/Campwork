import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
    console.warn('RESEND_API_KEY is missing. Please add it to your .env.local file.');
}

export const resend = new Resend(resendApiKey);
