import React, { useEffect, useState } from 'react';
import Badge from '../components/Badge';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('New Contributor');
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    // Simulate API call for profile and badges
    const timer = setTimeout(() => {
      setPoints(120);
      setBadges([
        { id: 1, title: 'First Issue', icon: '🥉', requirement: 'Start 1 issue', earned: true },
        { id: 2, title: 'Rising Contributor', icon: '🥈', requirement: 'Open 3 PRs', earned: false },
        { id: 3, title: 'Consistent Helper', icon: '⭐', requirement: 'Comment on 5 issues', earned: false },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-600">
          Track your points and badges as you contribute to open source.
        </p>
      </header>

      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        {loading ? (
          <div className="animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div className="h-5 w-40 bg-gray-200 rounded" />
            </div>
            <div className="mt-4 h-4 w-24 bg-gray-200 rounded" />
          </div>
        ) : (
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xl">
                👩‍💻
              </div>
              <div>
                <div className="text-sm text-gray-500">Username</div>
                <div className="font-semibold text-gray-900">{username}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Current Points</div>
              <div className="text-xl font-bold text-gray-900">{points}</div>
            </div>
          </div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900">Badges</h2>
        {loading ? (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-4 animate-pulse">
                <div className="h-6 w-6 bg-gray-200 rounded" />
                <div className="mt-2 h-4 w-24 bg-gray-200 rounded" />
                <div className="mt-1 h-3 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((b) => (
              <Badge
                key={b.id}
                title={b.title}
                icon={b.icon}
                requirement={b.requirement}
                earned={b.earned}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}