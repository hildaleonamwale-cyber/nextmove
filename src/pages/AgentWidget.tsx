import React from 'react';
import { Globe, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AgentWidget: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('<script src="https://nextmove.com/widget/agency-id.js"></script>');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">Website Widget</h1>
        <p className="text-sm text-gray-500">Embed your listings directly on your external website.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-[#1fe6d4]/10 rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#1fe6d4]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Sync Code</h2>
            <p className="text-sm text-gray-500">Copy and paste this code into the &lt;head&gt; of your website.</p>
          </div>
        </div>

        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs font-mono">
            <code>&lt;script src="https://nextmove.com/widget/agency-id.js"&gt;&lt;/script&gt;</code>
          </pre>
          <button 
            onClick={handleCopy}
            className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#1fe6d4]" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-2">How it works</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
            <li>The widget automatically syncs your active listings.</li>
            <li>It inherits your agency branding and colors.</li>
            <li>Leads generated from the widget appear in your Viewing Requests.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
