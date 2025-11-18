import React, { useEffect, useState } from 'react';
import Badge from '../components/Badge.jsx';

export default function ProfilePage() {
  const [profile, setProfile] = useState({ username: 'Demo User', points: 230, avatar: '👩‍💻', badges: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/profile');
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        if (isMounted) setProfile(data);
      } catch (err) {
        // Fallback demo data
        if (isMounted) {
          setProfile({
            username: 'Demo User',
            points: 230,
            avatar: '👩‍💻',
            badges: [
              { icon: '🔥', title: '5-Day Streak', description: 'Contributed 5 days in a row', unlocked: true },
              { icon: '🌟', title: 'First PR', description: 'Merged your first pull request', unlocked: true },
              { icon: '⏳', title: 'Onboarding', description: 'Started your first issue', unlocked: false },
            ],
          });
          setError(err.message || 'Error loading profile (showing demo data)');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProfile();
    return () => { isMounted = false; };
  }, []);

  const level = Math.floor((profile?.points || 0) / 100);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Profile</h2>
        <div className="text-muted small">Track your progress and badges</div>
      </div>
      {error && <div className="alert alert-warning" role="alert">{error}</div>}
      {loading ? (
        <div className="text-center py-5">Loading profile…</div>
      ) : (
        <div>
          <div className="d-flex align-items-center mb-4 gap-3">
            <div className="display-5" aria-hidden="true">{profile.avatar}</div>
            <div>
              <div className="h4 mb-1">{profile.username}</div>
              <div className="text-muted">Points: {profile.points} • Level: {level}</div>
            </div>
          </div>
          <h5 className="mb-3">Badges</h5>
          <div className="row g-3">
            {(profile.badges || []).map((b, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-md-4">
                <Badge icon={b.icon} title={b.title} description={b.description} unlocked={b.unlocked} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}