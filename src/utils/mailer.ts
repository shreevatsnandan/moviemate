import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string | string[];
  subject: string;
  body: React.ReactElement | string;
  attachments?: Array<{
    filename: string;
    content?: string | Buffer;
    path?: string;
  }>;
  from?: string;
}

export async function sendEmail({to, subject, body, attachments, from = 'Your App <no-reply@yourdomain.com>'}: SendEmailParams) 
{
  try {
    const emailContent = typeof body === 'string' 
      ? { text: body } 
      : { react: body };

    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      attachments,
      ...emailContent,
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}