import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, XCircle, Clock, Search, RefreshCw } from 'lucide-react';

interface PendingPayment {
  id: string;
  agentName: string;
  tier: string;
  phone: string;
  ref: string;
  amount: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export const SuperAdminPanel = () => {
  const [payments, setPayments] = useState<PendingPayment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadPayments = () => {
    const paymentData = localStorage.getItem('pending_payment');
    if (paymentData) {
      const parsed = JSON.parse(paymentData);
      // We only store one pending payment in localStorage for this prototype,
      // but let's display it in a list format.
      setPayments([parsed]);
    } else {
      setPayments([]);
    }
  };

  useEffect(() => {
    loadPayments();
    // Poll for new payments
    const interval = setInterval(loadPayments, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = (id: string) => {
    const paymentData = localStorage.getItem('pending_payment');
    if (paymentData) {
      const parsed = JSON.parse(paymentData);
      if (parsed.id === id) {
        parsed.status = 'approved';
        localStorage.setItem('pending_payment', JSON.stringify(parsed));
        loadPayments();
      }
    }
  };

  const handleReject = (id: string) => {
    const paymentData = localStorage.getItem('pending_payment');
    if (paymentData) {
      const parsed = JSON.parse(paymentData);
      if (parsed.id === id) {
        parsed.status = 'rejected';
        localStorage.setItem('pending_payment', JSON.stringify(parsed));
        loadPayments();
      }
    }
  };

  const filteredPayments = payments.filter(p => 
    p.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gray-900 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-[#1FE6D4]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">The Glade</h1>
            </div>
            <p className="text-gray-500">Super Admin Control Panel</p>
          </div>
          
          <button 
            onClick={loadPayments}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-900">EcoCash Approvals</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search ref, phone, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full sm:w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#1FE6D4] focus:border-[#1FE6D4] sm:text-sm transition-colors"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent / Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tier / Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EcoCash Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Shield className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium text-gray-900">No pending payments</p>
                        <p className="text-sm">All caught up! Waiting for new agents to subscribe.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <motion.tr 
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                            {payment.agentName.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{payment.agentName}</div>
                            <div className="text-sm text-gray-500">{new Date(payment.date).toLocaleString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">
                          {payment.tier === 'SOLO_PRO' ? 'Solo Pro' : 'Team'}
                        </div>
                        <div className="text-sm text-gray-500">{payment.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded inline-block mb-1">
                          {payment.ref}
                        </div>
                        <div className="text-sm text-gray-500">{payment.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {payment.status === 'pending' && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 items-center gap-1">
                            <Clock className="h-3 w-3" /> Pending
                          </span>
                        )}
                        {payment.status === 'approved' && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Approved
                          </span>
                        )}
                        {payment.status === 'rejected' && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 items-center gap-1">
                            <XCircle className="h-3 w-3" /> Rejected
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {payment.status === 'pending' && (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleReject(payment.id)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleApprove(payment.id)}
                              className="text-white bg-gray-900 hover:bg-gray-800 px-3 py-1.5 rounded-md transition-colors"
                            >
                              Approve
                            </button>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
