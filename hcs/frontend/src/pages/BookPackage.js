import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { packageApi, patientApi } from '../services/api';

export default function BookPackage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg]         = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSub]  = useState(false);
  const [error, setError]     = useState('');

  const [form, setForm]     = useState({ name: '', age: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    packageApi.getById(id)
      .then(r => setPkg(r.data))
      .catch(() => setError('Package not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Minimum 2 characters required';
    if (!form.age || form.age < 1 || form.age > 120)      e.age  = 'Enter a valid age (1-120)';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))  e.email = 'Enter a valid email address';
    if (form.phone && !form.phone.match(/^[6-9]\d{9}$/))  e.phone = 'Enter valid 10-digit mobile number';
    return e;
  };

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSub(true);
    try {
      const res = await patientApi.book(id, {
        name: form.name.trim(),
        age: parseInt(form.age),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
      });
      navigate('/confirmation', { state: { booking: res.data } });
    } catch (err) {
      setError(err.message);
    } finally {
      setSub(false);
    }
  };

  if (loading) return <div className="loading"><div className="spinner"/><div>Loading...</div></div>;
  if (!pkg)    return <div className="container page"><div className="alert alert-error">{error}</div></div>;

  const BADGE = { BASIC: 'badge-basic', STANDARD: 'badge-standard', PREMIUM: 'badge-premium' };

  return (
    <div className="container page">
      <div style={{ marginBottom: 20 }}>
        <Link to="/packages" className="text-muted text-sm">← Back to Packages</Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24 }}>

        {/* Package summary */}
        <div className="card" style={{ padding: 24, height: 'fit-content' }}>
          <span className={`pkg-badge ${BADGE[pkg.category]}`}>{pkg.category}</span>
          <div className="pkg-name" style={{ marginTop: 8 }}>{pkg.packageName}</div>
          <div className="pkg-price" style={{ margin: '8px 0' }}>₹{pkg.cost?.toLocaleString('en-IN')}</div>
          <div className="text-muted text-sm" style={{ marginBottom: 16 }}>{pkg.description}</div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '16px 0' }} />

          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
            {pkg.testsIncluded?.length} Tests Included
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {pkg.testsIncluded?.map((t, i) => (
              <li key={i} style={{ fontSize: 13, display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Booking form */}
        <div className="card" style={{ padding: 28 }}>
          <div className="page-header">
            <h2 className="page-title">Patient Details</h2>
            <p className="page-sub">Fill in your information to confirm the booking.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" name="name" value={form.name}
                  onChange={handleChange} placeholder="e.g. Arjun Kumar" />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Age *</label>
                <input className="form-input" name="age" type="number" value={form.age}
                  onChange={handleChange} placeholder="e.g. 35" min="1" max="120" />
                {errors.age && <div className="form-error">{errors.age}</div>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input className="form-input" name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="e.g. arjun@email.com" />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number <span className="text-muted">(optional)</span></label>
              <input className="form-input" name="phone" type="tel" value={form.phone}
                onChange={handleChange} placeholder="10-digit number" />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>

            {/* Summary row */}
            <div style={{
              background: '#f9fafb', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              padding: '14px 16px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>{pkg.packageName} Package</div>
                <div className="text-muted text-sm">{pkg.testsIncluded?.length} tests included</div>
              </div>
              <div className="mono" style={{ fontSize: 20, fontWeight: 600, color: 'var(--primary)' }}>
                ₹{pkg.cost?.toLocaleString('en-IN')}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
              {submitting ? 'Confirming...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
