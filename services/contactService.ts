import emailjs from '@emailjs/browser';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

function getRequiredEnv(name: string): string {
  const value = import.meta.env[name];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export async function sendContactMessage(payload: ContactMessage): Promise<void> {
  const serviceId = getRequiredEnv('VITE_EMAILJS_SERVICE_ID');
  const templateId = getRequiredEnv('VITE_EMAILJS_TEMPLATE_ID');
  const publicKey = getRequiredEnv('VITE_EMAILJS_PUBLIC_KEY');

  // Template variables in EmailJS should match these keys.
  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: payload.name,
      reply_to: payload.email,
      message: payload.message,
    },
    { publicKey }
  );
}

