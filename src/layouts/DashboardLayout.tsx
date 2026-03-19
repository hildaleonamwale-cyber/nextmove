import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Home, Calendar, User, 
  Settings, LogOut, Bell, Search, PlusCircle,
  Users, Globe, CreditCard, ChevronDown, Star, Menu, X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { useTier } from '../contexts/TierContext';
import { TierSwitcher } from '../components/TierSwitcher';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  badge?: React.ReactNode;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, path, isActive, badge, onClick }) => (
  <Link
    to={path}
    onClick={onClick}
    className={cn(
      "flex items-center justify-between px-4 py-2.5 rounded-xl transition-all font-medium text-sm",
      isActive 
        ? "bg-[#1fe6d4]/10 text-[#1fe6d4] shadow-sm" 
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    )}
  >
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
    {badge && <div>{badge}</div>}
  </Link>
);

export const DashboardLayout: React.FC<{ type: 'agent' | 'admin' }> = ({ type }) => {
  const location = useLocation();
  const { tier } = useTier();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const getAgentLinks = (): { icon: React.ElementType; label: string; path: string; badge?: React.ReactNode }[] => {
    const links: { icon: React.ElementType; label: string; path: string; badge?: React.ReactNode }[] = [
      { icon: LayoutDashboard, label: 'Overview', path: '/agent/dashboard' },
    ];

    if (tier === 'agency' || tier === 'team') {
      links.push({ icon: Home, label: 'All Listings', path: '/agent/listings' });
    } else {
      links.push({ 
        icon: Home, 
        label: 'My Listings', 
        path: '/agent/listings',
        badge: tier === 'basic' ? <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">3 Max</span> : undefined
      });
    }

    links.push({ icon: Calendar, label: 'Viewing Requests', path: '/agent/requests' });

    if (tier === 'agency' || tier === 'team') {
      links.push({ icon: User, label: 'Company Profile Editor', path: '/agent/profile-edit' });
      links.push({ icon: Users, label: 'Manage Staff', path: '/agent/staff' });
    } else if (tier === 'solo') {
      links.push({ icon: User, label: 'Profile Editor', path: '/agent/profile-edit' });
    } else if (tier === 'basic' || tier === 'worker') {
      links.push({ icon: User, label: 'Contact Card Editor', path: '/agent/profile-edit' });
    }

    if (tier === 'agency') {
      links.push({ icon: Globe, label: 'Website Widget', path: '/agent/widget' });
    }

    if (tier === 'agency' || tier === 'solo') {
      links.push({ icon: CreditCard, label: 'Billing & Subscription', path: '/agent/billing' });
    } else if (tier === 'team') {
      links.push({ 
        icon: CreditCard, 
        label: 'Billing', 
        path: '/agent/billing',
        badge: <span className="text-[10px] bg-[#1fe6d4]/20 text-[#1fe6d4] px-2 py-0.5 rounded-full">Trial Active</span>
      });
    }

    return links;
  };

  const adminLinks: { icon: React.ElementType; label: string; path: string; badge?: React.ReactNode }[] = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
    { icon: Home, label: 'Listings Moderation', path: '/admin/listings' },
    { icon: User, label: 'Agent Management', path: '/admin/agents' },
    { icon: Settings, label: 'Homepage Manager', path: '/admin/homepage' },
    { icon: Settings, label: 'Platform Settings', path: '/admin/settings' },
  ];

  const links = type === 'agent' ? getAgentLinks() : adminLinks;

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "w-64 border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1fe6d4] rounded-xl flex items-center justify-center shadow-sm">
              <span className="font-display font-bold text-white text-lg">N</span>
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-gray-900">
              NextMove
            </span>
          </Link>
          <button className="lg:hidden text-gray-500 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-grow px-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 mb-3 mt-2">
            {type === 'agent' ? 'Agent Dashboard' : 'Super Admin'}
          </div>
          {links.map((link) => (
            <SidebarItem
              key={link.path}
              icon={link.icon}
              label={link.label}
              path={link.path}
              isActive={location.pathname === link.path}
              badge={link.badge}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          ))}
        </nav>

        {type === 'agent' && tier === 'basic' && (
          <div className="px-4 pb-4">
            <Button className="w-full gap-2 bg-gray-900 text-white hover:bg-black rounded-xl text-sm py-2 shadow-md">
              <Star className="w-4 h-4 text-[#1fe6d4] fill-[#1fe6d4]" /> Upgrade Now
            </Button>
          </div>
        )}

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium text-sm">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 w-full min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-[#1fe6d4]/10 flex items-center justify-between px-4 lg:px-8 bg-white/90 backdrop-blur-[15px] z-30 shrink-0">
          <div className="flex items-center gap-3 lg:gap-4">
            <button className="lg:hidden text-gray-500 hover:text-gray-900 p-1" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            {type === 'agent' && <div className="hidden sm:block"><TierSwitcher /></div>}
            <div className="hidden md:flex items-center gap-3 bg-gray-50/80 border border-gray-100 px-3 py-2 rounded-xl w-48 lg:w-72 transition-all focus-within:bg-white focus-within:border-[#1fe6d4]/30 focus-within:shadow-sm">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-xs w-full font-medium placeholder:font-normal"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-5">
            <button className="relative p-2 text-gray-500 hover:text-[#1fe6d4] transition-colors bg-gray-50 hover:bg-[#1fe6d4]/10 rounded-full">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1fe6d4] rounded-full border-2 border-white" />
            </button>
            {type === 'agent' && (
              <div className="relative group hidden sm:block">
                <Button size="sm" className="gap-1.5 bg-[#1fe6d4] text-white hover:bg-[#15b3a5] rounded-xl shadow-[0_4px_12px_rgba(31,230,212,0.3)] border-none text-xs py-1.5 px-3">
                  <PlusCircle className="w-3.5 h-3.5" /> New Listing
                  {tier === 'agency' && <ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
                </Button>
                {tier === 'agency' && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                    <div className="p-2">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-2 mb-1">Assign To</div>
                      <button className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-gray-50 hover:text-[#1fe6d4] rounded-xl transition-colors">Unassigned</button>
                      <button className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-gray-50 hover:text-[#1fe6d4] rounded-xl transition-colors">Sarah Jenkins</button>
                      <button className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-gray-50 hover:text-[#1fe6d4] rounded-xl transition-colors">Mike Ross</button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center gap-3 pl-3 lg:pl-5 border-l border-gray-100">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-gray-900">Sarah Jenkins</p>
                <p className="text-[10px] font-medium text-gray-500">
                  {tier === 'agency' ? 'Agency Admin' : tier === 'team' ? 'Team Admin' : tier === 'solo' ? 'Pro Agent' : tier === 'worker' ? 'Staff Agent' : 'Independent'}
                </p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" 
                className="w-8 h-8 rounded-full object-cover border-2 border-[#1fe6d4]/20"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
