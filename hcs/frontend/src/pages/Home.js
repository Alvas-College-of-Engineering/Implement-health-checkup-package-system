import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="hero">
        <h1>Health Checkup Packages</h1>
        <p>Book affordable health screenings online. Choose a plan, fill your details, and you're done.</p>
        <div className="hero-actions">
          <Link to="/packages" className="btn btn-primary">View Packages</Link>
          <Link to="/bookings" className="btn btn-outline">My Bookings</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="container">
        <div className="stats">
          {[
            { value: '3',       label: 'Health Packages'     },
            { value: '₹999',    label: 'Starting Price'      },
            { value: '26+',     label: 'Tests Available'     },
            { value: '24/7',    label: 'Support'             },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="card mt-24" style={{ padding: '24px' }}>
          <p className="page-title" style={{ fontSize: '16px', marginBottom: '20px' }}>How It Works</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            {[
              { step: '1', title: 'Choose a Package', desc: 'Pick Basic, Standard, or Premium based on your needs.' },
              { step: '2', title: 'Fill Your Details', desc: 'Enter your name, age, email and phone number.' },
              { step: '3', title: 'Confirm Booking',   desc: 'Review and confirm. Get instant booking confirmation.' },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: '#eff6ff', color: 'var(--primary)', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                }}>{s.step}</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{s.title}</div>
                  <div className="text-muted text-sm">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
