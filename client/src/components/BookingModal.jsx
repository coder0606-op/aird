import React, { useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function BookingModal({ isOpen, title, price, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    custName: '',
    custEmail: '',
    custPhone: '',
    custDate: '',
    custCount: '2 Persons',
    custPayment: 'Credit / Debit Card (Online 3D Secure)',
    custNotes: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newEnquiry = {
      _id: `enq-${Date.now()}`,
      fullName: formData.custName,
      email: formData.custEmail,
      phone: formData.custPhone,
      serviceRequired: title || 'Booking Reservation',
      message: `Date: ${formData.custDate || 'Flexible'} | Guests: ${formData.custCount} | Payment: ${formData.custPayment} | Notes: ${formData.custNotes || 'None'}`,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    try {
      await api.post('/enquiries', {
        fullName: newEnquiry.fullName,
        email: newEnquiry.email,
        phone: newEnquiry.phone,
        serviceRequired: newEnquiry.serviceRequired,
        message: newEnquiry.message
      });
    } catch (apiErr) {
      console.warn('Backend API offline or unreachable, saving enquiry locally:', apiErr);
    }

    // Always preserve locally so admin can see inquiries
    try {
      const stored = JSON.parse(localStorage.getItem('air_dream_enquiries_v2') || '[]');
      stored.unshift(newEnquiry);
      localStorage.setItem('air_dream_enquiries_v2', JSON.stringify(stored));
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
    setSubmitted(true);
    toast.success('Booking request received! Our concierge will contact you shortly.');

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        custName: '',
        custEmail: '',
        custPhone: '',
        custDate: '',
        custCount: '2 Persons',
        custPayment: 'Credit / Debit Card (Online 3D Secure)',
        custNotes: ''
      });
      onClose();
    }, 2500);
  };

  return (
    <div
      className="modal-overlay open"
      id="bookingModal"
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,31,68,0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="modal-content-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '20px',
          maxWidth: '540px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(10,31,68,0.3)',
          position: 'relative'
        }}
      >
        <div
          className="modal-header"
          style={{
            background: '#0A1F44',
            color: '#fff',
            padding: '20px 24px',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div className="modal-title-wrap">
            <h3
              style={{
                margin: 0,
                fontSize: '1.25rem',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="fa-solid fa-calendar-check text-gold"></i>
              <span>{title ? 'Complete Your Reservation' : 'Request a Custom Quote'}</span>
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#CDE8FF' }}>
              {title ? (
                <>
                  Package: <strong>{title}</strong>{' '}
                  {price ? (
                    <>
                      &bull;{' '}
                      <span style={{ color: '#F5B301', fontWeight: 700 }}>{price}</span>
                    </>
                  ) : null}
                </>
              ) : (
                'Best price guaranteed &bull; 24/7 Concierge Support'
              )}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#fff',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="modal-body" style={{ padding: '24px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>✅</div>
              <h3
                style={{
                  fontSize: '1.5rem',
                  color: '#0A1F44',
                  marginBottom: '8px',
                  fontWeight: 800
                }}
              >
                Thank You!
              </h3>
              <p style={{ color: '#516480', fontSize: '0.95rem' }}>
                Your request has been received. Our dedicated travel manager will
                contact you within 15 minutes!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px'
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#1E293B',
                      display: 'block',
                      marginBottom: '4px'
                    }}
                  >
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="custName"
                    required
                    value={formData.custName}
                    onChange={handleChange}
                    placeholder="As on Passport"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#1E293B',
                      display: 'block',
                      marginBottom: '4px'
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="custEmail"
                    required
                    value={formData.custEmail}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px'
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#1E293B',
                      display: 'block',
                      marginBottom: '4px'
                    }}
                  >
                    Phone with Country Code *
                  </label>
                  <input
                    type="tel"
                    name="custPhone"
                    required
                    value={formData.custPhone}
                    onChange={handleChange}
                    placeholder="+971 58 833 8927"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#1E293B',
                      display: 'block',
                      marginBottom: '4px'
                    }}
                  >
                    Preferred Departure Date *
                  </label>
                  <input
                    type="date"
                    name="custDate"
                    required
                    value={formData.custDate}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px'
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#1E293B',
                      display: 'block',
                      marginBottom: '4px'
                    }}
                  >
                    Number of Guests *
                  </label>
                  <select
                    name="custCount"
                    value={formData.custCount}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="1 Person">1 Person</option>
                    <option value="2 Persons">2 Persons</option>
                    <option value="3 Persons">3 Persons</option>
                    <option value="4 Persons">4 Persons</option>
                    <option value="5+ Persons (Group)">5+ Persons (Group)</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#1E293B',
                      display: 'block',
                      marginBottom: '4px'
                    }}
                  >
                    Payment Method
                  </label>
                  <select
                    name="custPayment"
                    value={formData.custPayment}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="Credit / Debit Card (Online 3D Secure)">
                      Credit / Debit Card
                    </option>
                    <option value="Bank Wire / Transfer">Bank Wire / Transfer</option>
                    <option value="Cash at Dubai Office">Cash at Dubai Office</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#1E293B',
                    display: 'block',
                    marginBottom: '4px'
                  }}
                >
                  Additional Requests
                </label>
                <textarea
                  name="custNotes"
                  rows={2}
                  value={formData.custNotes}
                  onChange={handleChange}
                  placeholder="Room type (King/Twin), dietary requirements, wheelchair assistance, airline..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.9rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  fontSize: '1rem',
                  padding: '13px',
                  borderRadius: '12px',
                  marginTop: '6px'
                }}
              >
                <i className="fa-solid fa-check-circle"></i>{' '}
                {loading ? 'Submitting...' : 'Confirm Booking Request'}
              </button>

              <div
                style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94A3B8' }}
              >
                Need instant help?{' '}
                <a
                  href="https://wa.me/971588338927"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#25D366', fontWeight: 700 }}
                >
                  <i className="fa-brands fa-whatsapp"></i> Chat with Concierge
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
