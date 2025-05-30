
'use client' 
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function VerifyNotice() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="mb-4">
          We've sent a verification link to <strong>{email}</strong>.
          Please check your inbox and click the link to verify your account.
        </p>
        <p className="mb-4">
          Didn't receive the email? Check your spam folder or{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            try again
          </Link>.
        </p>
        <Link 
          href="/login" 
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}