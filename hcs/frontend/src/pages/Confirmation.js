import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

export default function Confirmation() {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) return <Navigate to="/packages" replace />;

  const pkg = booking.selectedPackage;

  return (
    <div className="container page">
      <div className="confirm-box">

        <div className="confirm-header">
          <div className="confirm-icon">✅</div>
          <div className="confirm-title">Booking Confirmed!</div>
          <div className="text-muted text-sm" style={{ marginTop: 4 }}>
            Booking ID: <span className="mono">#{String(booking.id).padStart(5,'0')}</span>
          </div>
        </div>

        <div className="confirm-body">
          <div className="alert alert-info" style={{ marginBottom: 16 }}>
            Your health checkup has been successfully booked. We'll reach out for scheduling.
          </div>

          {[
            { label: 'Patient Name', value: booking.name },
            { label: 'Age',          value: `${booking.age} years` },
            { label: 'Email',        value: booking.email },
            { label: 'Phone',        value: booking.phone || '—' },
            { label: 'Package',      value: pkg?.packageName },
            { label: 'Tests',        value: `${pkg?.testsIncluded?.length} tests` },
            { label: 'Status',       value: booking.status },
            { label: 'Booked On',    value: new Date(booking.bookedAt).toLocaleString('en-IN') },
          ].map(row => (
            <div className="confirm-row" key={row.label}>
              <span className="confirm-label">{row.label}</span>
              <span className="confirm-value">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="confirm-total">
          <span style={{ fontWeight: 500 }}>Total Amount</span>
          <span className="mono" style={{ fontSize: 22, fontWeight: 600, color: 'var(--primary)' }}>
            ₹{pkg?.cost?.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="confirm-footer">
          <Link to="/bookings"  className="btn btn-primary">View All Bookings</Link>
          <Link to="/packages"  className="btn btn-outline">Book Another</Link>
        </div>
      </div>
    </div>
  );
}
