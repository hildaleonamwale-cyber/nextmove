import React from 'react';
import { 
  TrendingUp, Home, Calendar, Eye, 
  ArrowUpRight, ArrowDownRight, Clock
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTier } from '../contexts/TierContext';

const StatCard: React.FC<{ 
  label: string; 
  value: string | number; 
  trend?: number; 
  icon: React.ElementType;
  accent?: boolean;
}> = ({ label, value, trend, icon: Icon, accent }) => (
  <div className={cn(
    "p-5 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md",
    accent ? "bg-[#1fe6d4]/5 border-[#1fe6d4]/20" : "bg-white"
  )}>
    <div className="flex items-center justify-between mb-3">
      <div className={cn(
        "p-2.5 rounded-xl",
        accent ? "bg-[#1fe6d4]/10 text-[#1fe6d4]" : "bg-gray-50 text-gray-600"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      {trend !== undefined && (
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          trend > 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
        )}>
          {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <p className={cn("text-[11px] font-bold uppercase tracking-wider mb-1", accent ? "text-[#1fe6d4]" : "text-gray-500")}>
      {label}
    </p>
    <h3 className="text-2xl font-display font-bold text-gray-900">{value}</h3>
  </div>
);

export const AgentDashboard: React.FC = () => {
  const { tier } = useTier();
  const isCompanyWide = tier === 'agency' || tier === 'team';

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">Welcome back, Sarah</h1>
        <p className="text-sm text-gray-500">
          {isCompanyWide 
            ? "Here's what's happening across your entire company today." 
            : "Here's what's happening with your listings today."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          label={isCompanyWide ? "Company Active Listings" : "Active Listings"} 
          value={isCompanyWide ? 142 : 12} 
          icon={Home} 
        />
        <StatCard 
          label={isCompanyWide ? "Total Company Views" : "Total Views"} 
          value={isCompanyWide ? "45.2k" : "2.4k"} 
          trend={12} 
          icon={Eye} 
        />
        <StatCard 
          label={isCompanyWide ? "Company New Requests" : "New Requests"} 
          value={isCompanyWide ? 84 : 8} 
          trend={5} 
          icon={Calendar} 
          accent 
        />
        <StatCard 
          label={isCompanyWide ? "Company Sold Properties" : "Sold Properties"} 
          value={isCompanyWide ? 34 : 4} 
          icon={TrendingUp} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Requests */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-display font-bold text-gray-900">
              {isCompanyWide ? "Recent Company Requests" : "Recent Viewing Requests"}
            </h2>
            <button className="text-[#1fe6d4] font-bold text-xs hover:text-[#15b3a5] transition-colors bg-[#1fe6d4]/10 px-3 py-1.5 rounded-full">View All</button>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Client</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Property</th>
                  {isCompanyWide && <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Agent</th>}
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Date</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1fe6d4]/10 flex items-center justify-center text-[#1fe6d4] font-bold text-xs shrink-0">
                          JD
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">John Doe</p>
                          <p className="text-[10px] text-gray-500">john@example.com</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-xs font-medium text-gray-700">Modern Villa in Borrowdale</p>
                    </td>
                    {isCompanyWide && (
                      <td className="px-5 py-3">
                        <p className="text-xs font-medium text-gray-500">{i % 2 === 0 ? 'Sarah Jenkins' : 'Mike Ross'}</p>
                      </td>
                    )}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 bg-gray-50 w-fit px-2 py-1 rounded-md">
                        <Clock className="w-3 h-3" />
                        <span>Mar 18, 10:00 AM</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-wider border border-emerald-100">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Stats */}
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-gray-900">Platform Activity</h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#1fe6d4] rounded-full shadow-[0_0_8px_rgba(31,230,212,0.5)]" />
                <span className="text-xs font-medium text-gray-600">Profile Views</span>
              </div>
              <span className="font-bold text-sm text-gray-900">{isCompanyWide ? '5,452' : '452'}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span className="text-xs font-medium text-gray-600">Conversion Rate</span>
              </div>
              <span className="font-bold text-sm text-gray-900">3.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                <span className="text-xs font-medium text-gray-600">Avg. Response Time</span>
              </div>
              <span className="font-bold text-sm text-gray-900">1.5h</span>
            </div>
            <hr className="border-gray-100" />
            <div className="pt-1">
              <p className="text-[11px] text-gray-500 mb-3">
                {isCompanyWide ? "Your company is in the top 5% this month!" : "You're in the top 5% of agents this month!"}
              </p>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#1fe6d4] h-full w-[85%] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
