'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Verifying your email...')
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const email = searchParams.get('email')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!code || !email) {
          throw new Error('Invalid verification link')
        }

        const response = await fetch('/api/usersdb', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, email }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Verification failed')
        }

        setStatus('success')
        setMessage('Email verified successfully! Redirecting to login...')
        setTimeout(() => router.push('/login'), 3000)
      } catch (err: any) {
        setStatus('error')
        setMessage(err.message || 'Verification failed')
      }
    }

    verifyEmail()
  }, [code, email, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        {status === 'success' ? (
          <div className="text-green-600">
            <CheckCircle2 className="mx-auto h-12 w-12 mb-4" />
            <h2 className="text-xl font-bold mb-2">Verification Successful</h2>
            <p>{message}</p>
          </div>
        ) : status === 'error' ? (
          <div className="text-red-600">
            <XCircle className="mx-auto h-12 w-12 mb-4" />
            <h2 className="text-xl font-bold mb-2">Verification Failed</h2>
            <p className="mb-4">{message}</p>
            <button
              onClick={() => router.push('/signup')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Sign Up
            </button>
          </div>
        ) : (
          <div className="text-blue-600">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}