import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, ExternalLink, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { MOCK_PROPERTIES } from '../mockData';
import { useTier } from '../contexts/TierContext';

export const AgentListings: React.FC = () => {
  const { tier } = useTier();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const isCompanyWide = tier === 'agency' || tier === 'team';
  const title = isCompanyWide ? 'All Listings' : 'My Listings';
  const description = isCompanyWide 
    ? 'Manage all property listings across your company.' 
    : 'Manage and update your property listings.';

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-display font-bold text-gray-900">{title}</h1>
            {tier === 'basic' && (
              <span className="px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> 3 Listings Max
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Listing
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Property</th>
              {isCompanyWide && <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Agent</th>}
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Price</th>
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Views</th>
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_PROPERTIES.filter(p => isCompanyWide || p.agentId === 'agent-1').map((property, index) => (
              <tr key={property.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={property.images[0]} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{property.title}</p>
                      <p className="text-[10px] text-gray-500">{property.location.suburb}</p>
                    </div>
                  </div>
                </td>
                {isCompanyWide && (
                  <td className="px-5 py-3">
                    <p className="text-xs font-medium text-gray-500">{index % 2 === 0 ? 'Sarah Jenkins' : 'Mike Ross'}</p>
                  </td>
                )}
                <td className="px-5 py-3 font-medium text-xs text-gray-900">
                  ${property.price.toLocaleString()}
                </td>
                <td className="px-5 py-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#1fe6d4]/10 text-[#15b3a5] text-[9px] font-bold uppercase tracking-wider">
                    {property.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs text-gray-500">
                  {Math.floor(Math.random() * 500) + 100}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link to={`/property/${property.id}`} className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Listing Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Listing"
        className="max-w-2xl"
      >
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Property Title</label>
              <input type="text" className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1fe6d4] focus:ring-1 focus:ring-[#1fe6d4] outline-none transition-all" placeholder="e.g. Modern Villa" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Price ($)</label>
              <input type="number" className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1fe6d4] focus:ring-1 focus:ring-[#1fe6d4] outline-none transition-all" placeholder="1250000" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Suburb</label>
              <input type="text" className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1fe6d4] focus:ring-1 focus:ring-[#1fe6d4] outline-none transition-all" placeholder="Borrowdale" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">City</label>
              <select className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1fe6d4] focus:ring-1 focus:ring-[#1fe6d4] outline-none transition-all bg-white">
                <option>Harare</option>
                <option>Bulawayo</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Images</label>
            <div className="grid grid-cols-4 gap-3">
              <button type="button" className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-[#1fe6d4] hover:text-[#1fe6d4] transition-all bg-gray-50 hover:bg-[#1fe6d4]/5">
                <Plus className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-bold uppercase">Add</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Description</label>
            <textarea className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1fe6d4] focus:ring-1 focus:ring-[#1fe6d4] outline-none transition-all h-24 resize-none" placeholder="Describe the property..."></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-[#1fe6d4] text-gray-900 text-sm font-bold rounded-xl hover:bg-[#15b3a5] transition-colors">Create Listing</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
