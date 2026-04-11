import React, { useState } from 'react';
import { createDemoUsers, createDemoProperties, createDemoViewingRequests } from '../../lib/seedDemoData';

export default function DemoDataSeeder() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSeedAll = async () => {
    setLoading(true);
    setResults(null);
    try {
      const userResults = await createDemoUsers();
      const propertyResults = await createDemoProperties('demo_premium@example.com');
      const viewingResults = await createDemoViewingRequests();

      setResults({
        users: userResults,
        properties: propertyResults,
        viewingRequests: viewingResults,
      });
    } catch (error) {
      setResults({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Demo Data Seeder</h1>

      <button
        onClick={handleSeedAll}
        disabled={loading}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Creating Demo Data...' : 'Create Demo Users, Properties & Requests'}
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          {results.error ? (
            <div className="p-4 bg-red-100 text-red-800 rounded">
              <p className="font-semibold">Error:</p>
              <p>{results.error}</p>
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-xl font-semibold mb-3">Demo Users Created:</h2>
                <div className="space-y-2">
                  {results.users?.map((user: any, idx: number) => (
                    <div key={idx} className={`p-3 rounded ${user.success ? 'bg-green-100' : 'bg-red-100'}`}>
                      <p className="font-semibold">{user.email}</p>
                      {user.success ? (
                        <p className="text-sm text-green-700">Created successfully</p>
                      ) : (
                        <p className="text-sm text-red-700">Error: {user.error}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded text-sm">
                  <p className="font-semibold">Demo Login Credentials:</p>
                  <ul className="mt-2 space-y-1">
                    <li>Email: demo_basic@example.com | Password: Demo123456!</li>
                    <li>Email: demo_premium@example.com | Password: Demo123456!</li>
                    <li>Email: demo_admin@example.com | Password: Demo123456!</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Demo Properties Created:</h2>
                <div className="space-y-2">
                  {results.properties?.map((prop: any, idx: number) => (
                    <div key={idx} className={`p-3 rounded ${prop.success ? 'bg-green-100' : 'bg-red-100'}`}>
                      <p className="font-semibold">{prop.title}</p>
                      {prop.success ? (
                        <p className="text-sm text-green-700">Created successfully</p>
                      ) : (
                        <p className="text-sm text-red-700">Error: {prop.error}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Viewing Requests Created:</h2>
                <p className="text-sm text-gray-600">
                  {results.viewingRequests?.filter((r: any) => r.success).length || 0} viewing requests created successfully
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
