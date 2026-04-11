import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ShieldCheck, CircleCheck as CheckCircle2, Loader as Loader2, Building2, Hop as Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import OtpVerification from './OtpVerification';
import { supabase } from '../../lib/supabase';

type Step =
  | 'LOGIN'
  | 'SIGNUP_DETAILS'
  | 'VERIFY_EMAIL'
  | 'PRO_INVITE';

type Role = 'OWNER' | 'AGENT' | null;

export default function AgentPortal() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [step, setStep] = useState<Step>('LOGIN');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  // Role State
  const [role, setRole] = useState<Role>(null);
  const [agentFee, setAgentFee] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const emailInput = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
      const passwordInput = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
      await signIn(emailInput, passwordInput);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('VERIFY_EMAIL');
    }, 500);
  };

  const handleSignupVerification = async () => {
    setError('');
    setIsLoading(true);
    try {
      const response = await signUp(email, password, name, 'premium');
      if (response?.user?.id) {
        setUserId(response.user.id);

        const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
        const anonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

        const sendOtpResponse = await fetch(`${supabaseUrl}/functions/v1/send-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${anonKey}`,
          },
          body: JSON.stringify({
            email,
            userId: response.user.id,
          }),
        });

        if (!sendOtpResponse.ok) {
          throw new Error('Failed to send verification code');
        }

        setStep('VERIFY_EMAIL');
      }
    } catch (err: any) {
      setError(err.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerificationComplete = () => {
    navigate('/dashboard');
  };

  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'AGENT' && !agentFee) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/setup', { state: { role, agentFee } });
    }, 1000);
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-[#1FE6D4]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-gradient-to-tr from-gray-200/50 to-transparent rounded-full blur-[80px] pointer-events-none" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 relative z-10">
        <div className="mx-auto w-full max-w-sm lg:w-96 backdrop-blur-xl bg-white/40 p-8 rounded-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
          
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {step === 'LOGIN' && 'Sign In'}
              {step === 'SIGNUP_DETAILS' && 'Create Free Account'}
              {step === 'VERIFY_EMAIL' && 'Verify Your Email'}
              {step === 'PRO_INVITE' && 'Accept Pro Invite'}
            </h2>
            
            {(step === 'LOGIN' || step === 'SIGNUP_DETAILS') && (
              <p className="mt-2 text-sm text-gray-600">
                {step === 'LOGIN' ? 'Or ' : 'Already have an account? '}
                <button
                  onClick={() => setStep(step === 'LOGIN' ? 'SIGNUP_DETAILS' : 'LOGIN')}
                  className="font-medium text-[#1FE6D4] hover:text-[#15b8a9] transition-colors"
                >
                  {step === 'LOGIN' ? 'create a new account' : 'sign in instead'}
                </button>
              </p>
            )}
            {step === 'PRO_INVITE' && (
              <p className="mt-2 text-sm text-gray-500">Welcome to Nextmove Pro. Set your password to get started.</p>
            )}
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              
              {/* LOGIN STEP */}
              {step === 'LOGIN' && (
                <motion.div
                  key="login"
                  variants={pageVariants} initial="initial" animate="animate" exit="exit"
                >
                  <form className="space-y-6" onSubmit={handleLoginSubmit}>
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email address</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="email"
                          type="email" required
                          className="focus:ring-gray-400 focus:border-gray-400 block w-full pl-10 sm:text-sm border-gray-200 rounded-xl py-3 bg-gray-50/30 border transition-all"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"} required
                          className="focus:ring-gray-400 focus:border-gray-400 block w-full pl-10 pr-10 sm:text-sm border-gray-200 rounded-xl py-3 bg-gray-50/30 border transition-all"
                          placeholder="••••••••"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-[#1FE6D4] focus:ring-[#1FE6D4] border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-900">Remember me</label>
                      </div>
                      <div className="text-sm">
                        <a href="#" className="font-medium text-[#1FE6D4] hover:text-[#15b8a9]">Forgot password?</a>
                      </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#1A1C1E] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-70">
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign in'}
                    </button>
                  </form>

                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Developer Access</span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button
                        onClick={() => navigate('/glade')}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors group"
                      >
                        <Building2 className="h-5 w-5 text-gray-400 mr-2 group-hover:text-[#1FE6D4] transition-colors" />
                        Super Admin Panel (The Glade)
                        <ArrowRight className="h-4 w-4 ml-2 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors group"
                      >
                        <User className="h-5 w-5 text-gray-400 mr-2 group-hover:text-[#1FE6D4] transition-colors" />
                        Skip Login (Go to Dashboard)
                        <ArrowRight className="h-4 w-4 ml-2 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => setStep('PRO_INVITE')}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors group"
                      >
                        <Mail className="h-5 w-5 text-gray-400 mr-2 group-hover:text-[#1FE6D4] transition-colors" />
                        Demo: Accept Pro Invite Link
                        <ArrowRight className="h-4 w-4 ml-2 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SIGNUP DETAILS STEP */}
              {step === 'SIGNUP_DETAILS' && (
                <motion.div 
                  key="signup-details"
                  variants={pageVariants} initial="initial" animate="animate" exit="exit"
                >
                  <form className="space-y-6" onSubmit={async (e) => {
                    e.preventDefault();
                    setError('');
                    if (!name || !email || !password) {
                      setError('Please fill in all fields');
                      return;
                    }
                    await handleSignupVerification();
                  }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text" required value={name} onChange={(e) => setName(e.target.value)}
                          className="focus:ring-gray-400 focus:border-gray-400 block w-full pl-10 sm:text-sm border-gray-200 rounded-xl py-3 bg-gray-50/30 border transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email address</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                          className="focus:ring-gray-400 focus:border-gray-400 block w-full pl-10 sm:text-sm border-gray-200 rounded-xl py-3 bg-gray-50/30 border transition-all"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                          className="focus:ring-gray-400 focus:border-gray-400 block w-full pl-10 pr-10 sm:text-sm border-gray-200 rounded-xl py-3 bg-gray-50/30 border transition-all"
                          placeholder="••••••••"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#1A1C1E] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-70">
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign Up'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* VERIFY EMAIL STEP */}
              {step === 'VERIFY_EMAIL' && (
                <OtpVerification
                  email={email}
                  userId={userId}
                  onVerificationComplete={handleOtpVerificationComplete}
                />
              )}

              {/* PRO INVITE STEP */}
              {step === 'PRO_INVITE' && (
                <motion.div 
                  key="pro-invite"
                  variants={pageVariants} initial="initial" animate="animate" exit="exit"
                >
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      navigate('/setup', { state: { role: 'AGENT', tier: 'PRO' } });
                    }, 1000);
                  }} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text" required value={name} onChange={(e) => setName(e.target.value)}
                          className="focus:ring-gray-400 focus:border-gray-400 block w-full pl-10 sm:text-sm border-gray-200 rounded-xl py-3 bg-gray-50/30 border transition-all"
                          placeholder="Sarah Jenkins"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email address</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email" disabled value="admin@willowelm.co.zw"
                          className="focus:ring-gray-400 focus:border-gray-400 block w-full pl-10 sm:text-sm border-gray-200 rounded-xl py-3 bg-gray-100 text-gray-500 border transition-all cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Create Password</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                          className="focus:ring-gray-400 focus:border-gray-400 block w-full pl-10 pr-10 sm:text-sm border-gray-200 rounded-xl py-3 bg-gray-50/30 border transition-all"
                          placeholder="••••••••"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#1A1C1E] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-70">
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Complete Setup'}
                    </button>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
