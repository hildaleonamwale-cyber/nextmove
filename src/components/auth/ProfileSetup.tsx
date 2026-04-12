import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Image as ImageIcon, Building2, Phone, MapPin, 
  ArrowRight, Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ProfileSetup() {
  const location = useLocation();
  const navigate = useNavigate();
  // Brand Setup State
  const [displayName, setDisplayName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("No user logged in");
      }

      // Split displayName into first and last name for simplicity
      const nameParts = displayName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');

      const { error } = await supabase
        .from('users')
        .update({
          first_name: firstName,
          last_name: lastName,
          phone: whatsapp,
          address: address,
          about: about,
          // We'll store the preview URLs for now, but in a real app you'd upload to Supabase Storage
          avatar_url: logoPreview,
          cover_url: coverPreview
        })
        .eq('id', user.id);

      if (error) throw error;
      
      navigate('/dashboard');
    } catch (error: any) {
      alert("Error saving profile: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="h-screen bg-white flex font-sans overflow-hidden">
      {/* Left Side: Form */}
      <div className="flex-1 flex flex-col py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 lg:w-1/2 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl my-auto">
          
          {/* Progress Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Build Your Profile
            </h2>
            <p className="text-gray-500">
              Let's set up your public profile so clients can find and trust you.
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key="brand"
              variants={pageVariants} initial="initial" animate="animate" exit="exit"
            >
              <form onSubmit={handleBrandSubmit} className="space-y-8">
                
                {/* Upload Zones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile / Company Logo</label>
                    <div 
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#1FE6D4] hover:bg-[#1FE6D4]/5 transition-colors cursor-pointer group relative overflow-hidden"
                      onClick={() => document.getElementById('logoUpload')?.click()}
                    >
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo Preview" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="space-y-1 text-center">
                          <div className="mx-auto h-12 w-12 text-gray-400 group-hover:text-[#1FE6D4] transition-colors flex items-center justify-center bg-gray-50 rounded-full mb-3">
                            <Upload className="h-6 w-6" />
                          </div>
                          <div className="flex text-sm text-gray-600 justify-center">
                            <span className="relative cursor-pointer rounded-md font-medium text-[#1FE6D4] hover:text-[#15b8a9]">
                              Upload a file
                            </span>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                      <input type="file" id="logoUpload" accept="image/*" style={{ display: 'none' }} onChange={handleLogoChange} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Photo</label>
                    <div 
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#1FE6D4] hover:bg-[#1FE6D4]/5 transition-colors cursor-pointer group relative overflow-hidden"
                      onClick={() => document.getElementById('coverUpload')?.click()}
                    >
                      {coverPreview ? (
                        <img src={coverPreview} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="space-y-1 text-center">
                          <div className="mx-auto h-12 w-12 text-gray-400 group-hover:text-[#1FE6D4] transition-colors flex items-center justify-center bg-gray-50 rounded-full mb-3">
                            <ImageIcon className="h-6 w-6" />
                          </div>
                          <div className="flex text-sm text-gray-600 justify-center">
                            <span className="relative cursor-pointer rounded-md font-medium text-[#1FE6D4] hover:text-[#15b8a9]">
                              Upload a file
                            </span>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">1200x400px recommended</p>
                        </div>
                      )}
                      <input type="file" id="coverUpload" accept="image/*" style={{ display: 'none' }} onChange={handleCoverChange} />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Display Name (Company or Your Name)</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                        className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 bg-gray-50/50 border transition-colors"
                        placeholder="e.g. Pam Golding Properties"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">WhatsApp Contact Number</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                          className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 bg-gray-50/50 border transition-colors"
                          placeholder="+263 77 123 4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Physical Office Address</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text" required value={address} onChange={(e) => setAddress(e.target.value)}
                          className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 bg-gray-50/50 border transition-colors"
                          placeholder="123 Samora Machel Ave, Harare"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">'About' Bio</label>
                      <span className="text-xs text-gray-500">{about.length}/500</span>
                    </div>
                    <textarea
                      required maxLength={500} rows={4} value={about} onChange={(e) => setAbout(e.target.value)}
                      className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full sm:text-sm border-gray-300 rounded-xl p-4 bg-gray-50/50 border transition-colors resize-none"
                      placeholder="Tell potential clients about your experience, values, and the areas you specialize in..."
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button type="submit" disabled={isLoading} className="flex items-center justify-center py-3 px-8 border border-transparent rounded-xl shadow-sm text-sm font-medium text-[#1A1C1E] bg-[#1FE6D4] hover:bg-[#15b8a9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FE6D4] transition-colors disabled:opacity-70">
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                      <>Complete Setup <ArrowRight className="ml-2 h-5 w-5" /></>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img 
          className="absolute inset-0 h-full w-full object-cover" 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Modern office space" 
        />
        <div className="absolute inset-0 bg-[#1A1C1E]/60 mix-blend-multiply" />
        <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
          <h2 className="text-4xl font-bold mb-4">Build Your Brand</h2>
          <p className="text-xl text-gray-200">Showcase your expertise and connect with clients looking for their next move.</p>
        </div>
      </div>
    </div>
  );
}
