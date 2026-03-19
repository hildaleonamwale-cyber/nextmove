import React, { useState } from 'react';
import { Camera, Save, Plus, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MOCK_AGENTS } from '../mockData';
import { useTier } from '../contexts/TierContext';

export const AgentProfileEditor: React.FC = () => {
  const { tier } = useTier();
  const agent = MOCK_AGENTS[0];
  const [formData, setFormData] = useState({
    name: agent.name,
    tagline: agent.tagline,
    location: agent.location,
    bio: agent.bio,
  });

  const isCompany = tier === 'agency' || tier === 'team';
  const isContactCard = tier === 'basic' || tier === 'worker';

  const title = isCompany ? 'Company Profile Editor' : isContactCard ? 'Contact Card Editor' : 'Profile Editor';
  const description = isCompany 
    ? 'Customize how your agency appears to potential clients.' 
    : isContactCard 
      ? 'Update your basic contact information.' 
      : 'Customize how you appear to potential clients.';

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Photo Upload */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{isCompany ? 'Company Logo' : 'Profile Photo'}</h3>
          <div className="relative group w-32 h-32 mx-auto md:mx-0">
            <img 
              src={agent.photo} 
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
              referrerPolicy="no-referrer"
            />
            <button className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Camera className="w-6 h-6" />
            </button>
          </div>
          <p className="text-[10px] text-gray-500 text-center md:text-left">Recommended: Square image, min 400x400px.</p>
        </div>

        {/* Basic Info */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Basic Information</h3>
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{isCompany ? 'Company Name' : 'Full Name'}</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1fe6d4] focus:ring-1 focus:ring-[#1fe6d4] outline-none transition-all" 
              />
            </div>
            {!isContactCard && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Tagline</label>
                <input 
                  type="text" 
                  value={formData.tagline}
                  onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1fe6d4] focus:ring-1 focus:ring-[#1fe6d4] outline-none transition-all" 
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Location</label>
              <input 
                type="text" 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1fe6d4] focus:ring-1 focus:ring-[#1fe6d4] outline-none transition-all" 
              />
            </div>
            {!isContactCard && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{isCompany ? 'Company Description' : 'Biography'}</label>
                <textarea 
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1fe6d4] focus:ring-1 focus:ring-[#1fe6d4] outline-none transition-all h-24 resize-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {!isContactCard && (
        <>
          <hr className="border-gray-100" />

          {/* Stories & Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Story Slides</h3>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Add Slide</button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {agent.stories?.map((story) => (
                  <div key={story.id} className="relative min-w-[80px] aspect-[9/16] rounded-xl overflow-hidden group shadow-sm">
                    <img src={story.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <button className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button className="min-w-[80px] aspect-[9/16] rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-[#1fe6d4] hover:text-[#1fe6d4] transition-all bg-gray-50 hover:bg-[#1fe6d4]/5">
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-bold uppercase">Upload</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Latest Updates</h3>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">New Post</button>
              </div>
              <div className="space-y-3">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      <img src={`https://images.unsplash.com/photo-${1600585154340 + i}-be6161a56a0c?auto=format&fit=crop&w=100&q=80`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-bold text-gray-900 line-clamp-1">New listing in Borrowdale...</p>
                      <p className="text-[10px] text-gray-500">Posted 2 days ago</p>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="pt-6 flex justify-end border-t border-gray-100">
        <button className="flex items-center gap-2 bg-[#1fe6d4] text-gray-900 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#15b3a5] transition-colors">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </div>
  );
};

const Trash2: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);
