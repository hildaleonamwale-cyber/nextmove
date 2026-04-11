import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface OtpVerificationProps {
  email: string;
  userId: string;
  onVerificationComplete: () => void;
}

export default function OtpVerification({
  email,
  userId,
  onVerificationComplete,
}: OtpVerificationProps) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '').slice(-1);

    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Auto-focus next input
    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
    const digits = pastedData.slice(0, 6).split('');

    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);

    if (digits.length === 6) {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);

    try {
      const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
      const anonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/verify-otp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${anonKey}`,
          },
          body: JSON.stringify({
            userId,
            otp: otpCode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Verification failed');
        setIsLoading(false);
        return;
      }

      onVerificationComplete();
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Verification error:', err);
      setIsLoading(false);
    }
  };

  const handleResendClick = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    setTimeLeft(600);
    inputRefs.current[0]?.focus();
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#FFFFFF',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '32px',
              fontWeight: 700,
              color: '#1A1C1E',
              margin: '0 0 12px 0',
              letterSpacing: '-0.5px',
            }}
          >
            Verify Your Email
          </h1>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#6B7280',
              margin: '0',
              lineHeight: '1.6',
            }}
          >
            We've sent a 6-digit code to{' '}
            <span style={{ fontWeight: 600, color: '#1A1C1E' }}>{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          {error && (
            <div
              style={{
                background: '#FEE2E2',
                border: '1px solid #FCA5A5',
                borderRadius: '8px',
                padding: '12px 14px',
                marginBottom: '20px',
              }}
            >
              <p style={{ fontSize: '13px', color: '#991B1B', margin: 0 }}>
                {error}
              </p>
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '8px',
              marginBottom: '28px',
            }}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '24px',
                  fontWeight: 700,
                  textAlign: 'center',
                  background: '#F9FAFB',
                  border: digit ? '2px solid #1FE6D4' : '1px solid #E5E7EB',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow:
                    document.activeElement === inputRefs.current[index]
                      ? '0 0 0 4px rgba(31,230,212,0.15)'
                      : 'none',
                  fontFamily: 'Monaco, Menlo, monospace',
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 4px rgba(31,230,212,0.15)';
                  e.target.style.borderColor = '#1FE6D4';
                }}
                onBlur={(e) => {
                  if (!otp[index]) {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#E5E7EB';
                  }
                }}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.some((digit) => !digit)}
            style={{
              width: '100%',
              padding: '14px',
              background: '#1A1C1E',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              cursor: isLoading || otp.some((digit) => !digit) ? 'not-allowed' : 'pointer',
              opacity: isLoading || otp.some((digit) => !digit) ? 0.5 : 1,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </button>
        </form>

        <div
          style={{
            textAlign: 'center',
            borderTop: '1px solid #E5E7EB',
            paddingTop: '24px',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              color: '#6B7280',
              marginBottom: '16px',
            }}
          >
            {timeLeft > 0 ? (
              <span>
                Code expires in{' '}
                <span style={{ fontWeight: 600, color: '#1A1C1E' }}>
                  {formatTime(timeLeft)}
                </span>
              </span>
            ) : (
              <span style={{ color: '#EF4444' }}>Code has expired</span>
            )}
          </div>

          <p
            style={{
              fontSize: '13px',
              color: '#6B7280',
              margin: '0 0 12px 0',
            }}
          >
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendClick}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#1FE6D4',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#0dd4b8';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = '#1FE6D4';
            }}
          >
            Request a new code
          </button>
        </div>

        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
