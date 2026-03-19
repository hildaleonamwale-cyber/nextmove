import React from 'react';
import { ShieldCheck, ShieldAlert, MoreVertical, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MOCK_AGENTS } from '../mockData';
import { cn } from '../lib/utils';

export const AdminAgentManagement: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">Agent Management</h1>
          <p className="text-sm text-gray-500">Verify, suspend, and manage platform agents.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl shadow-sm focus-within:border-[#1fe6d4] focus-within:ring-1 focus-within:ring-[#1fe6d4] transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search agents..." className="bg-transparent border-none outline-none text-sm w-48" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Agent</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Plan</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Listings</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_AGENTS.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={agent.photo} className="w-10 h-10 rounded-full object-cover border border-gray-100" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">{agent.name}</p>
                        <p className="text-[10px] text-gray-500">{agent.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider inline-flex items-center justify-center",
                      agent.isPro ? "bg-[#1fe6d4]/10 text-[#15b3a5]" : "bg-gray-100 text-gray-600"
                    )}>
                      {agent.isPro ? 'Pro' : 'Free'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {Math.floor(Math.random() * 20) + 5}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {agent.isVerified ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium bg-emerald-50 px-2.5 py-1 rounded-lg">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-600 text-xs font-medium bg-amber-50 px-2.5 py-1 rounded-lg">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>Pending</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
