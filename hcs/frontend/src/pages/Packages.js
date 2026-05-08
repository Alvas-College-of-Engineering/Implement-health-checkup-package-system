import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { packageApi } from '../services/api';

const BADGE = { BASIC: 'badge-basic', STANDARD: 'badge-standard', PREMIUM: 'badge-premium' };

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    packageApi.getAll()
      .then(r => setPackages(r.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      <div>Loading packages...</div>
    </div>
  );

  return (
    <div className="container page">
      <div className="page-header">
        <h1 className="page-title">Available Packages</h1>
        <p className="page-sub">Choose the plan that fits your health needs and budget.</p>
      </div>

      {error && (
        <div className="alert alert-error">
          ⚠ {error} — Make sure the Spring Boot backend is running on port 8080.
        </div>
      )}

      <div className="pkg-grid">
        {packages.map(pkg => (
          <div className="pkg-card" key={pkg.id}>
            <div className="pkg-card-header">
              <span className={`pkg-badge ${BADGE[pkg.category]}`}>{pkg.category}</span>
              <div className="pkg-name">{pkg.packageName}</div>
              <div className="pkg-price">₹{pkg.cost?.toLocaleString('en-IN')}</div>
              <div className="pkg-desc">{pkg.description}</div>
            </div>

            <hr className="pkg-divider" />

            <div className="pkg-tests">
              <h4>{pkg.testsIncluded?.length} Tests Included</h4>
              <ul>
                {pkg.testsIncluded?.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>

            <div className="pkg-card-footer">
              <button
                className="btn btn-primary btn-full"
                onClick={() => navigate(`/book/${pkg.id}`)}
              >
                Book This Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
