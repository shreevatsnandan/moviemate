
import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const to = body.to || 'fallback@example.com';
    const content = body.content || 'No content provided.';
    const subject = body.subject || 'No Subject';
    const attachment = body.attachment;

    const { data, error } = await resend.emails.send({
      from: 'Moviemate <info@shreevatsnandan.pro>',
      to: [to],
      subject,
      react: EmailTemplate({
        emailContent: content,
      }),
      attachments: attachment
        ? [{ filename: 'attachment.pdf', path: attachment }]
        : undefined,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
    });
  }
}
