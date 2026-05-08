import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { patientApi } from '../services/api';

export default function Bookings() {
  const [bookings, setBookings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [search, setSearch]       = useState('');
  const [deleting, setDeleting]   = useState(null);
  const [msg, setMsg]             = useState('');

  const load = useCallback(() => {
    setLoading(true);
    patientApi.getAll()
      .then(r => setBookings(r.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCancel = async (id) => {
    try {
      await patientApi.cancel(id);
      setMsg('Booking cancelled.');
      load();
    } catch (e) { setError(e.message); }
  };

  const handleDelete = async (id) => {
    try {
      await patientApi.delete(id);
      setMsg('Booking deleted.');
      setDeleting(null);
      load();
    } catch (e) { setError(e.message); }
  };

  const filtered = bookings.filter(b =>
    !search ||
    b.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.email?.toLowerCase().includes(search.toLowerCase()) ||
    String(b.id).includes(search)
  );

  return (
    <div className="container page">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: 24, flexWrap:'wrap', gap: 12 }}>
        <div className="page-header" style={{ margin: 0 }}>
          <h1 className="page-title">All Bookings</h1>
          <p className="page-sub">{bookings.length} total booking{bookings.length !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/packages" className="btn btn-primary">+ New Booking</Link>
      </div>

      {msg   && <div className="alert alert-success">{msg}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          className="form-input"
          style={{ maxWidth: 320 }}
          placeholder="Search by name, email or ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading && <div className="loading"><div className="spinner"/><div>Loading bookings...</div></div>}

      {!loading && filtered.length === 0 && (
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>No bookings found</div>
          <div className="text-muted text-sm" style={{ marginBottom: 20 }}>
            {search ? 'Try a different search term.' : 'No bookings yet.'}
          </div>
          <Link to="/packages" className="btn btn-primary">Book a Package</Link>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Package</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>Booked On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id}>
                    <td className="mono" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                      #{String(b.id).padStart(4,'0')}
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{b.name}</div>
                      <div className="text-muted text-sm">{b.email} · {b.age}y</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{b.selectedPackage?.packageName}</div>
                      <div className="text-muted text-sm">{b.selectedPackage?.testsIncluded?.length} tests</div>
                    </td>
                    <td className="mono" style={{ fontWeight: 600 }}>
                      ₹{b.selectedPackage?.cost?.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className={`status status-${b.status?.toLowerCase()}`}>{b.status}</span>
                    </td>
                    <td className="text-sm text-muted">
                      {new Date(b.bookedAt).toLocaleDateString('en-IN')}
                    </td>
                    <td>
                      <div className="flex gap-8">
                        {b.status === 'CONFIRMED' && (
                          <button className="btn btn-warning btn-sm"
                            onClick={() => handleCancel(b.id)}>Cancel</button>
                        )}
                        <button className="btn btn-danger btn-sm"
                          onClick={() => setDeleting(b.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleting && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 200, padding: 20,
        }} onClick={() => setDeleting(null)}>
          <div className="card" style={{ padding: 28, maxWidth: 360, width: '100%' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 10 }}>Delete Booking?</div>
            <p className="text-muted text-sm" style={{ marginBottom: 20 }}>
              This will permanently delete booking #{String(deleting).padStart(4,'0')}. This cannot be undone.
            </p>
            <div className="flex gap-8">
              <button className="btn btn-outline" onClick={() => setDeleting(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleting)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
