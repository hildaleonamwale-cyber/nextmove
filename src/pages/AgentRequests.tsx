import React from 'react';
import { Mail, Phone, Calendar, Clock, Check, X, MessageSquare, Lock, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTier } from '../contexts/TierContext';

export const AgentRequests: React.FC = () => {
  const { tier } = useTier();
  const isPaywalled = tier === 'basic';

  return (
    <div className="space-y-8 max-w-7xl mx-auto relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">Viewing Requests</h1>
          <p className="text-sm text-gray-500">Track and manage your property viewing appointments.</p>
        </div>
        <div className="flex gap-2">
          <button disabled={isPaywalled} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Filter</button>
          <button disabled={isPaywalled} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export</button>
        </div>
      </div>

      <div className={`grid grid-cols-1 gap-4 ${isPaywalled ? 'filter blur-md select-none pointer-events-none' : ''}`}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1fe6d4]/10 flex items-center justify-center text-[#1fe6d4] font-bold text-lg shrink-0">
                JD
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-gray-900">John Doe</h3>
                  <span className="px-2 py-0.5 rounded-md bg-[#1fe6d4]/10 text-[#15b3a5] text-[9px] font-bold uppercase tracking-wider">New</span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>john@example.com</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>+263 771 000 000</span>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-gray-50 rounded-xl text-xs italic text-gray-600 border border-gray-100">
                  "I'm very interested in the Modern Villa. Can we schedule a viewing for next week?"
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 w-full md:w-auto">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900 mb-1">Modern Villa in Borrowdale</p>
                <div className="flex items-center justify-end gap-3 text-[11px] text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Mar 22, 2026</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>14:30</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-red-600 transition-colors">
                  <X className="w-3.5 h-3.5" /> Decline
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-900 bg-[#1fe6d4] rounded-xl hover:bg-[#15b3a5] transition-colors">
                  <Check className="w-3.5 h-3.5" /> Confirm
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isPaywalled && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md text-center flex flex-col items-center m-4">
            <div className="w-14 h-14 bg-[#1fe6d4]/10 rounded-2xl flex items-center justify-center mb-5">
              <Lock className="w-6 h-6 text-[#1fe6d4]" />
            </div>
            <h2 className="text-xl font-display font-bold text-gray-900 mb-2">Unlock Direct Viewing Requests</h2>
            <p className="text-sm text-gray-500 mb-6">
              Upgrade to a Pro plan to see contact details and manage viewing requests directly from potential buyers.
            </p>
            <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800 py-3 rounded-xl text-sm font-bold transition-colors">
              <Star className="w-4 h-4 fill-current" /> Upgrade to Pro
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
