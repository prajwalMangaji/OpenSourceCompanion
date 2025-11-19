import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const currentUser = 'you';
  const mockRank = 12; // mock current user rank

  useEffect(() => {
    const timer = setTimeout(() => {
      setData([
        { username: 'devAlice', points: 240 },
        { username: 'coderBob', points: 190 },
        { username: 'you', points: 120 },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          See who’s contributing the most. Climb the ranks by earning points!
        </p>
      </header>

      <div className="mb-4 rounded-md bg-blue-50 border border-blue-100 p-3 text-sm text-blue-700">
        Your current rank: <span className="font-semibold">{mockRank}</span>
      </div>

      {loading ? (
        <div className="rounded-lg border border-gray-200 bg-white p-4 animate-pulse">
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="mt-3 h-4 w-2/3 bg-gray-200 rounded" />
          <div className="mt-3 h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      ) : (
        <>
          {/* Desktop/table view */}
          <div className="hidden md:block">
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((row, idx) => {
                    const isYou = row.username === currentUser;
                    return (
                      <tr key={row.username} className={isYou ? 'bg-blue-50' : ''}>
                        <td className="px-4 py-2 text-sm text-gray-900">{idx + 1}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {row.username}
                          {isYou && <span className="ml-2 text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">You</span>}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">{row.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/card view */}
          <div className="md:hidden grid grid-cols-1 gap-3">
            {data.map((row, idx) => {
              const isYou = row.username === currentUser;
              return (
                <div
                  key={row.username}
                  className={`rounded-lg border border-gray-200 bg-white p-4 ${isYou ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Rank</div>
                    <div className="text-sm font-semibold text-gray-900">{idx + 1}</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm text-gray-500">Username</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {row.username}
                      {isYou && <span className="ml-2 text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">You</span>}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm text-gray-500">Points</div>
                    <div className="text-sm font-semibold text-gray-900">{row.points}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}