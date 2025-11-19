import React, { useEffect, useMemo, useState } from 'react';
import Badge from '../components/Badge.jsx';

const PAGE_SIZE = 10;

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('points');
  const [filter, setFilter] = useState('all'); // weekly | monthly | all
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/leaderboard');
        if (!res.ok) throw new Error('Failed to load leaderboard');
        const data = await res.json();
        if (isMounted) setUsers(Array.isArray(data) ? data : data?.users || []);
      } catch (err) {
        // Demo data fallback
        const demoUsers = Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          username: `User ${i + 1}`,
          avatar: i < 3 ? ['🥇', '🥈', '🥉'][i] : '👤',
          points: Math.floor(Math.random() * 500),
          badges: [
            { icon: '🔥', title: '5-Day Streak', description: 'Contributed 5 days in a row', unlocked: Math.random() > 0.5 },
            { icon: '🌟', title: 'First PR', description: 'Merged your first pull request', unlocked: Math.random() > 0.2 },
          ],
        }));
        if (isMounted) {
          setUsers(demoUsers);
          setError(err.message || 'Error loading leaderboard (showing demo data)');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchLeaderboard();
    return () => { isMounted = false; };
  }, []);

  const sorted = useMemo(() => {
    const copy = [...users];
    if (sortBy === 'points') copy.sort((a, b) => b.points - a.points);
    if (sortBy === 'username') copy.sort((a, b) => a.username.localeCompare(b.username));
    return copy;
  }, [users, sortBy]);

  const filtered = useMemo(() => {
    // Placeholder: apply filter in UI only unless backend supports
    return sorted; // weekly/monthly filters would subset data
  }, [sorted, filter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const pageUsers = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    // Reset page if filter or sort changes
    setPage(1);
  }, [filter, sortBy]);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Leaderboard</h2>
        <div className="text-muted small">See top contributors</div>
      </div>
      {error && <div className="alert alert-warning" role="alert">{error}</div>}
      <div className="d-flex gap-2 mb-3 align-items-center">
        <label className="form-label mb-0">Sort by:</label>
        <select className="form-select w-auto" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="points">Points</option>
          <option value="username">Username</option>
        </select>
        <label className="form-label mb-0 ms-3">Filter:</label>
        <select className="form-select w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="all">All-time</option>
        </select>
      </div>

      {/* Desktop/table view */}
      <div className="d-none d-md-block">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">User</th>
              <th scope="col">Points</th>
              <th scope="col">Badges</th>
            </tr>
          </thead>
          <tbody>
            {pageUsers.map((u, idx) => {
              const rank = (page - 1) * PAGE_SIZE + idx + 1;
              return (
                <tr key={u.id}>
                  <td>
                    <span className="me-2">{rank}</span>
                    {rank <= 3 && (
                      <span className="medal-icon">{['🥇','🥈','🥉'][rank-1]}</span>
                    )}
                  </td>
                  <td>
                    <span className="me-2" aria-hidden="true">{u.avatar}</span>
                    {u.username}
                  </td>
                  <td>{u.points}</td>
                  <td>
                    <div className="d-flex gap-2 flex-wrap">
                      {(u.badges || []).slice(0, 3).map((b, i) => (
                        <Badge key={i} icon={b.icon} title={b.title} description={b.description} unlocked={b.unlocked} />
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile/card view */}
      <div className="d-md-none">
        <div className="row g-3">
          {pageUsers.map((u, idx) => {
            const rank = (page - 1) * PAGE_SIZE + idx + 1;
            return (
              <div key={u.id} className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-semibold">
                        <span className="me-2" aria-hidden="true">{u.avatar}</span>
                        {u.username}
                        {rank <= 3 && <span className="ms-2 medal-icon">{['🥇','🥈','🥉'][rank-1]}</span>}
                      </div>
                      <div className="text-muted small">Points: {u.points}</div>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                      {(u.badges || []).slice(0, 2).map((b, i) => (
                        <Badge key={i} icon={b.icon} title={b.title} description={b.description} unlocked={b.unlocked} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
        <button className="btn btn-outline-secondary" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
        <span className="mx-2">Page {page} of {totalPages}</span>
        <button className="btn btn-outline-secondary" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
      </div>
    </div>
  );
}