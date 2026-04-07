import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Image as ImageIcon, Building2, Phone, MapPin, 
  ArrowRight
} from 'lucide-react';

export default function ProfileSetup() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role || 'OWNER';
  
  // Brand Setup State
  const [displayName, setDisplayName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');

  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress Header */}
        <div className="mb-8 text-center">
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
            className="bg-white shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden border border-gray-100"
          >
            <form onSubmit={handleBrandSubmit} className="p-8 space-y-8">
              
              {/* Upload Zones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile / Company Logo</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#1FE6D4] hover:bg-[#1FE6D4]/5 transition-colors cursor-pointer group">
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
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Photo</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#1FE6D4] hover:bg-[#1FE6D4]/5 transition-colors cursor-pointer group">
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
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Display Name ({role === 'AGENT' ? 'Company or Agent Name' : 'Your Name'})</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                      className="focus:ring-[#1FE6D4] focus:border-[#1FE6D4] block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 bg-gray-50/50 border transition-colors"
                      placeholder={role === 'AGENT' ? "e.g. Pam Golding Properties" : "e.g. John Doe"}
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
                    <label className="block text-sm font-medium text-gray-700">{role === 'AGENT' ? 'Physical Office Address' : 'Location'}</label>
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
                <button type="submit" className="flex items-center justify-center py-3 px-8 border border-transparent rounded-xl shadow-sm text-sm font-medium text-[#1A1C1E] bg-[#1FE6D4] hover:bg-[#15b8a9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FE6D4] transition-colors">
                  Complete Setup <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
