import React from 'react';
import { 
  Users, Home, ShieldCheck, Flag, 
  BarChart3, Globe, Settings
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const AdminStatCard: React.FC<{ 
  label: string; 
  value: string | number; 
  icon: React.ElementType;
  color?: string;
}> = ({ label, value, icon: Icon, color = "bg-[#1fe6d4]/10 text-[#1fe6d4]" }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex items-center gap-4">
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
        <h3 className="text-2xl font-display font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  </div>
);

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">Platform Overview</h1>
          <p className="text-sm text-gray-500">Monitoring NextMove platform activity and moderation.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Export Report
          </button>
          <Link to="/admin/settings">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
              Platform Settings
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/admin/agents" className="block hover:-translate-y-1 transition-transform">
          <AdminStatCard label="Total Agents" value={142} icon={Users} />
        </Link>
        <Link to="/admin/listings" className="block hover:-translate-y-1 transition-transform">
          <AdminStatCard label="Total Listings" value={856} icon={Home} color="bg-blue-50 text-blue-500" />
        </Link>
        <div className="block">
          <AdminStatCard label="Verified Agents" value={98} icon={ShieldCheck} color="bg-emerald-50 text-emerald-500" />
        </div>
        <div className="block">
          <AdminStatCard label="Flagged Items" value={3} icon={Flag} color="bg-red-50 text-red-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Approvals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Pending Approvals</h2>
            <Link to="/admin/listings" className="text-sm font-medium text-[#1fe6d4] hover:text-[#15b3a5]">Review All</Link>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">5 New Listings</span>
            </div>
            <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={`https://images.unsplash.com/photo-${1600585154340 + i}-be6161a56a0c?auto=format&fit=crop&w=100&q=80`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Modern Loft in Bulawayo</p>
                      <p className="text-[10px] text-gray-500">by David Moyo • 2h ago</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-xs font-medium transition-colors">Approve</button>
                    <button className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-medium transition-colors">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Activity */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Homepage Management</h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#1fe6d4]/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Globe className="w-4 h-4 text-[#1fe6d4]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Featured Listings</p>
                  <p className="text-[10px] text-gray-500">12 active campaigns</p>
                </div>
              </div>
              <Link to="/admin/homepage" className="text-xs font-medium text-[#1fe6d4] opacity-0 group-hover:opacity-100 transition-opacity">Manage</Link>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Banner Promotions</p>
                  <p className="text-[10px] text-gray-500">2 active banners</p>
                </div>
              </div>
              <Link to="/admin/homepage" className="text-xs font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">Manage</Link>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-purple-200 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Settings className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Hero Content</p>
                  <p className="text-[10px] text-gray-500">Last updated 3 days ago</p>
                </div>
              </div>
              <Link to="/admin/homepage" className="text-xs font-medium text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">Edit</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
