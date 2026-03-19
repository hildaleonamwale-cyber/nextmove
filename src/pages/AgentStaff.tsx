import React from 'react';
import { Users, Plus, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTier } from '../contexts/TierContext';

export const AgentStaff: React.FC = () => {
  const { tier } = useTier();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">Manage Staff</h1>
          <p className="text-sm text-gray-500">
            {tier === 'agency' 
              ? 'Manage your unlimited agency seats.' 
              : 'Invite agents to your team for $4.99/mo per seat.'}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" /> Invite Agent
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Agent</th>
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Role</th>
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1fe6d4]/10 flex items-center justify-center text-[#1fe6d4] font-bold text-xs shrink-0">
                    SJ
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">Sarah Jenkins</div>
                    <div className="text-[10px] text-gray-500">sarah@example.com</div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3 text-xs text-gray-700">Admin</td>
              <td className="px-5 py-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-wider border border-emerald-100">Active</span>
              </td>
              <td className="px-5 py-3 text-right">
                <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Edit</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs shrink-0">
                    MR
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">Mike Ross</div>
                    <div className="text-[10px] text-gray-500">mike@example.com</div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3 text-xs text-gray-700">Agent</td>
              <td className="px-5 py-3">
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[9px] font-bold uppercase tracking-wider border border-amber-100">Pending</span>
              </td>
              <td className="px-5 py-3 text-right">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><Mail className="w-3.5 h-3.5" /> Resend</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
