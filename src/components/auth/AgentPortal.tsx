import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, Mail, Lock, User, ArrowRight, ShieldCheck, 
  CheckCircle2, Loader2, Building2, Home
} from 'lucide-react';

type Step = 
  | 'LOGIN' 
  | 'SIGNUP_DETAILS' 
  | 'VERIFY_EMAIL' 
  | 'ROLE_SELECTION'
  | 'PRO_INVITE';

type Role = 'OWNER' | 'AGENT' | null;

export default function AgentPortal() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('LOGIN');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Role State
  const [role, setRole] = useState<Role>(null);
  const [agentFee, setAgentFee] = useState('');

  // Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleSignupDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('VERIFY_EMAIL');
    }, 1000);
  };

  const handleSimulateVerification = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('ROLE_SELECTION');
    }, 1000);
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-[#1A1C1E] rounded-xl flex items-center justify-center shadow-lg">
            <ShieldCheck className="h-7 w-7 text-[#1FE6D4]" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          {step === 'LOGIN' && 'Sign In'}
          {step === 'SIGNUP_DETAILS' && 'Create Free Account'}
          {step === 'VERIFY_EMAIL' && 'Verify Your Email'}
          {step === 'ROLE_SELECTION' && 'Choose Your Role'}
        </h2>
        
        {(step === 'LOGIN' || step === 'SIGNUP_DETAILS') && (
          <p className="mt-2 text-center text-sm text-gray-600">
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

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <AnimatePresence mode="wait">
          
          {/* LOGIN STEP */}
          {step === 'LOGIN' && (
            <motion.div 
              key="login"
              variants={pageVariants} initial="initial" animate="animate" exit="exit"
              className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100"
            >
              <form className="space-y-6" onSubmit={handleLoginSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email address</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email" required
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
                      type={showPassword ? "text" : "password"} required
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
                    <span className="px-2 bg-white text-gray-500">Developer Access</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => navigate('/glade')}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors group"
                  >
                    <ShieldCheck className="h-5 w-5 text-gray-400 mr-2 group-hover:text-[#1FE6D4] transition-colors" />
                    Super Admin Panel (The Glade)
                    <ArrowRight className="h-4 w-4 ml-2 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors group"
                  >
                    <User className="h-5 w-5 text-gray-400 mr-2 group-hover:text-[#1FE6D4] transition-colors" />
                    Skip Login (Go to Dashboard)
                    <ArrowRight className="h-4 w-4 ml-2 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setStep('PRO_INVITE')}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors group"
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
              className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100"
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

          {/* VERIFY EMAIL STEP */}
          {step === 'VERIFY_EMAIL' && (
            <motion.div 
              key="verify-email"
              variants={pageVariants} initial="initial" animate="animate" exit="exit"
              className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100 text-center"
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#1FE6D4]/10 mb-6">
                <Mail className="h-8 w-8 text-[#15b8a9]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Check your email</h3>
              <p className="text-sm text-gray-500 mb-6">
                We've sent a verification link to <br/><span className="font-medium text-gray-900">{email || 'your email'}</span>. You must click the link to continue.
              </p>
              
              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl mb-6">
                <p className="text-xs text-yellow-800 font-medium">
                  Developer Simulation: Click the button below to simulate clicking the email verification link.
                </p>
              </div>

              <button 
                onClick={handleSimulateVerification}
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#1A1C1E] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Simulate Email Verification'}
              </button>
            </motion.div>
          )}

          {/* ROLE SELECTION STEP */}
          {step === 'ROLE_SELECTION' && (
            <motion.div 
              key="role-selection"
              variants={pageVariants} initial="initial" animate="animate" exit="exit"
              className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100"
            >
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">How will you use Nextmove?</h3>
                <p className="text-sm text-gray-500 mt-2">Select your role to continue setting up your profile.</p>
              </div>

              <form onSubmit={handleRoleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div 
                    onClick={() => setRole('OWNER')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${role === 'OWNER' ? 'border-[#1FE6D4] bg-[#1FE6D4]/5' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className={`mt-1 h-5 w-5 rounded-full border flex items-center justify-center ${role === 'OWNER' ? 'border-[#1FE6D4]' : 'border-gray-300'}`}>
                      {role === 'OWNER' && <div className="h-2.5 w-2.5 rounded-full bg-[#1FE6D4]" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2"><Home className="h-4 w-4 text-gray-500" /> Property Owner</h4>
                      <p className="text-sm text-gray-500 mt-1">I want to list my own properties for sale or rent.</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setRole('AGENT')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${role === 'AGENT' ? 'border-[#1FE6D4] bg-[#1FE6D4]/5' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className={`mt-1 h-5 w-5 rounded-full border flex items-center justify-center ${role === 'AGENT' ? 'border-[#1FE6D4]' : 'border-gray-300'}`}>
                      {role === 'AGENT' && <div className="h-2.5 w-2.5 rounded-full bg-[#1FE6D4]" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2"><Building2 className="h-4 w-4 text-gray-500" /> Real Estate Agent</h4>
                      <p className="text-sm text-gray-500 mt-1">I am a professional agent listing properties for clients.</p>
                      
                      <AnimatePresence>
                        {role === 'AGENT' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                          >
                            <label className="block text-sm font-medium text-gray-700 mb-1">Standard Agent Fee (%) <span className="text-red-500">*</span></label>
                            <p className="text-xs text-gray-500 mb-2">This fee will be displayed publicly on all your listings for transparency.</p>
                            <div className="relative rounded-md shadow-sm">
                              <input
                                type="number" min="0" max="100" step="0.1" required
                                value={agentFee} onChange={(e) => setAgentFee(e.target.value)}
                                className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full pr-8 sm:text-sm border-gray-300 rounded-lg py-2 bg-white border transition-colors"
                                placeholder="e.g. 5"
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">%</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={!role || isLoading || (role === 'AGENT' && !agentFee)} 
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#1A1C1E] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-70"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue to Profile Setup'}
                </button>
              </form>
            </motion.div>
          )}

          {/* PRO INVITE STEP */}
          {step === 'PRO_INVITE' && (
            <motion.div 
              key="pro-invite"
              variants={pageVariants} initial="initial" animate="animate" exit="exit"
              className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100"
            >
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#1FE6D4]/10 mb-4">
                  <Building2 className="h-8 w-8 text-[#15b8a9]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Accept Pro Invite</h3>
                <p className="text-sm text-gray-500 mt-2">Welcome to Nextmove Pro. Set your password to get started.</p>
              </div>

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
                      className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 bg-gray-50/50 border transition-colors"
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
                      className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 bg-gray-100 text-gray-500 border transition-colors cursor-not-allowed"
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
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Complete Setup'}
                </button>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
