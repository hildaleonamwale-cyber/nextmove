import React from 'react';
import { useTier, Tier } from '../contexts/TierContext';

export const TierSwitcher: React.FC = () => {
  const { tier, setTier } = useTier();

  const tiers: { value: Tier; label: string }[] = [
    { value: 'agency', label: 'Agency ($250/mo)' },
    { value: 'team', label: 'Team ($19.99/mo)' },
    { value: 'solo', label: 'Solo Pro ($9.99/mo)' },
    { value: 'basic', label: 'Basic (Free)' },
    { value: 'worker', label: 'Worker (Staff)' },
  ];

  return (
    <div className="flex items-center gap-2 bg-border-subtle/50 px-3 py-1.5 rounded-lg border border-border-subtle">
      <span className="text-xs font-medium text-muted uppercase tracking-wider">View As:</span>
      <select
        value={tier}
        onChange={(e) => setTier(e.target.value as Tier)}
        className="bg-transparent border-none text-sm font-medium text-primary outline-none cursor-pointer"
      >
        {tiers.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
};
