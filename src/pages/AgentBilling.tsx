import React from 'react';
import { CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTier } from '../contexts/TierContext';

export const AgentBilling: React.FC = () => {
  const { tier } = useTier();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">Billing & Subscription</h1>
        <p className="text-sm text-gray-500">Manage your plan, payment methods, and invoices.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Current Plan</h2>
            {tier === 'team' && (
              <span className="px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Trial Active
              </span>
            )}
            {tier === 'agency' && (
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active
              </span>
            )}
            {tier === 'solo' && (
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active
              </span>
            )}
          </div>

          <div className="mb-6">
            <div className="text-3xl font-display font-bold text-gray-900 mb-1">
              {tier === 'agency' ? '$250' : tier === 'team' ? '$19.99' : '$9.99'}
              <span className="text-sm text-gray-500 font-normal">/mo</span>
            </div>
            <p className="text-sm text-gray-500">
              {tier === 'agency' ? 'Agency Plan (Unlimited Seats)' : tier === 'team' ? 'Team Plan (+ $4.99/seat)' : 'Solo Pro Plan'}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-[#1fe6d4]" />
              <span>Unlimited Listings</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-[#1fe6d4]" />
              <span>Direct Viewing Requests</span>
            </div>
            {tier === 'agency' && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#1fe6d4]" />
                <span>Website Widget</span>
              </div>
            )}
          </div>

          <button className="w-full bg-gray-900 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">Change Plan</button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Payment Method</h2>
          <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl mb-6 bg-gray-50/50">
            <div className="w-10 h-7 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-grow">
              <div className="text-sm font-bold text-gray-900">•••• •••• •••• 4242</div>
              <div className="text-xs text-gray-500">Expires 12/28</div>
            </div>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Edit</button>
          </div>

          <h3 className="text-sm font-bold text-gray-900 mb-4">Recent Invoices</h3>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between text-sm py-3 border-b border-gray-100 last:border-0">
                <div className="text-gray-500 text-xs">Mar 1, 2026</div>
                <div className="font-bold text-gray-900 text-sm">{tier === 'agency' ? '$250.00' : tier === 'team' ? '$19.99' : '$9.99'}</div>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Download</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
