import React from 'react';
import { Layout, Image as ImageIcon, Type, Eye, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AdminHomepageManager: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">Homepage Manager</h1>
        <p className="text-sm text-gray-500">Control the content and promotions on the public landing page.</p>
      </div>

      {/* Hero Section Editor */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-[#1fe6d4]/10 rounded-lg">
            <Layout className="w-5 h-5 text-[#1fe6d4]" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Hero Section</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Hero Headline</label>
              <textarea 
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1fe6d4] focus:ring-1 focus:ring-[#1fe6d4] outline-none transition-all h-20 resize-none"
                defaultValue="Your Next Move Starts Here"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Hero Subheadline</label>
              <textarea 
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1fe6d4] focus:ring-1 focus:ring-[#1fe6d4] outline-none transition-all h-20 resize-none"
                defaultValue="Discover the most exclusive properties in Zimbabwe's finest neighborhoods."
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Carousel Images</label>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden group shadow-sm">
                  <img src={`https://images.unsplash.com/photo-${1600585154340 + i}-be6161a56a0c?auto=format&fit=crop&w=400&q=80`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-1.5 bg-white rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"><ImageIcon className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
              <button className="aspect-video rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#1fe6d4] hover:text-[#1fe6d4] transition-all bg-gray-50 hover:bg-[#1fe6d4]/5">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Selection */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#1fe6d4]/10 rounded-lg">
              <Star className="w-5 h-5 text-[#1fe6d4]" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Featured Listings Selection</h2>
          </div>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Manage Selection</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <img src={`https://images.unsplash.com/photo-${1600585154340 + i}-be6161a56a0c?auto=format&fit=crop&w=100&q=80`} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
              <div>
                <p className="text-sm font-bold text-gray-900 line-clamp-1">Modern Villa {i}</p>
                <p className="text-[10px] text-gray-500">Exp: Mar 30, 2026</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotions Manager */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#1fe6d4]/10 rounded-lg">
            <Type className="w-5 h-5 text-[#1fe6d4]" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Banner Promotions</h2>
        </div>
        
        <div className="p-4 bg-[#1fe6d4]/5 rounded-xl border border-[#1fe6d4]/20 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-900">"Sell Your Property" Banner</p>
            <p className="text-[10px] text-gray-500">Active on Homepage • 12,402 views</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Edit Content</button>
            <button className="px-3 py-1.5 text-xs font-medium text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors">Disable</button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Eye className="w-4 h-4" /> Preview Changes
        </button>
        <button className="flex items-center gap-2 bg-[#1fe6d4] text-gray-900 px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#15b3a5] transition-colors">
          <Save className="w-4 h-4" /> Publish Homepage
        </button>
      </div>
    </div>
  );
};

const Plus: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

const Star: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
