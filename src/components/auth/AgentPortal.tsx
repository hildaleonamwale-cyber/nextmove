import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, Mail, Lock, User, ArrowRight, ShieldCheck, 
  CheckCircle2, Loader2, Building2, Home
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Step = 
  | 'LOGIN' 
  | 'SIGNUP_DETAILS';

export default function AgentPortal() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('LOGIN');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handlers
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: name.split(' ')[0],
            last_name: name.split(' ').slice(1).join(' ')
          }
        }
      });
      if (error) throw error;
      navigate('/setup');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'sarah@nextmove.com',
        password: 'password123',
      });
      if (error) throw error;
      navigate('/dashboard');
    } catch (error: any) {
      alert("Demo login failed. Make sure you ran the seed SQL script! Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="h-screen bg-white flex font-sans overflow-hidden">
      {/* Left Side: Form */}
      <div className="flex-1 flex flex-col py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 lg:w-1/2 overflow-y-auto">
        <div className="mx-auto w-full max-w-sm lg:w-96 my-auto">
          
          <div className="mb-8">
            <div className="h-12 w-12 bg-[#1A1C1E] rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="h-7 w-7 text-[#1FE6D4]" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
              {step === 'LOGIN' && 'Sign In'}
              {step === 'SIGNUP_DETAILS' && 'Create Free Account'}
              {step === 'VERIFY_EMAIL' && 'Verify Your Email'}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email address</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                          className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 bg-gray-50/50 border transition-colors"
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
                          className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-xl py-3 bg-gray-50/50 border transition-colors"
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
                        <span className="px-2 bg-white text-gray-500">Demo Access</span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button
                        onClick={handleDemoLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors group disabled:opacity-70"
                      >
                        <User className="h-5 w-5 text-gray-400 mr-2 group-hover:text-[#1FE6D4] transition-colors" />
                        Continue as Demo User (Sarah Jenkins)
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
                  <form className="space-y-6" onSubmit={handleSignupDetailsSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text" required value={name} onChange={(e) => setName(e.target.value)}
                          className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 bg-gray-50/50 border transition-colors"
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
                          className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 bg-gray-50/50 border transition-colors"
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
                          className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-xl py-3 bg-gray-50/50 border transition-colors"
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

            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img 
          className="absolute inset-0 h-full w-full object-cover" 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Beautiful home" 
        />
        <div className="absolute inset-0 bg-[#1A1C1E]/60 mix-blend-multiply" />
        <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to Nextmove</h2>
          <p className="text-xl text-gray-200">The modern platform for real estate professionals and property owners.</p>
        </div>
      </div>
    </div>
  );
}
