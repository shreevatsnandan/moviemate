import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

interface AuthEmailOptions {
  email: string;
  type: 'verification' | 'password-reset';
  code: string;
}

export async function sendAuthEmail({ email, type, code }: AuthEmailOptions) {
  const subject = type === 'verification' 
    ? 'Verify Your Email Address' 
    : 'Reset Your Password';
  
  const action = type === 'verification' ? 'verify-email' : 'reset';
  const url = `${process.env.NEXTAUTH_URL}/${action}?code=${code}&email=${encodeURIComponent(email)}`;

  const content = type === 'verification'
    ? `Please verify your email by clicking this link: ${url}`
    : `Please reset your password by clicking this link: ${url}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'MovieMate <info@shreevatsnandan.pro>',
      to: [email],
      subject,
      react: EmailTemplate({ emailContent: content }),
    });

    if (error) {
      console.error('Auth email error:', error);
      throw new Error('Failed to send authentication email');
    }

    return data;
  } catch (error) {
    console.error('Auth email failed:', error);
    throw error;
  }
}