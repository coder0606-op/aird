import React, { useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function NewBookingModal({ isOpen, title, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    guests: '2 Persons',
    date: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/enquiries', {
        fullName: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: `${formData.message || ''} | Guests: ${formData.guests} | Date: ${formData.date || 'Flexible'}`.trim(),
        serviceRequired: title || 'General Enquiry'
      });
      setSubmitted(true);
      toast.success('Enquiry submitted! We\'ll contact you within 15 minutes.');
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', phone: '', email: '', message: '', guests: '2 Persons', date: '' });
        onClose();
      }, 2500);
    } catch (error) {
      toast.error('Failed to submit. Please try WhatsApp or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-backdrop-fade"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(10,31,68,0.7)',
        zIndex: 9999, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)'
      }}
    >
      <div
        className="modal-dialog-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '20px', padding: '32px',
          maxWidth: '520px', width: '100%', maxHeight: '90vh',
          overflowY: 'auto', position: 'relative',
          boxShadow: '0 24px 60px rgba(10,31,68,0.25)'
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: '#f1f5f9', border: 'none', borderRadius: '50%',
            width: '36px', height: '36px', fontSize: '1.2rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#0A1F44'
          }}
        >
          &times;
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>✅</div>
            <h3 style={{ fontSize: '1.5rem', color: '#0A1F44', marginBottom: '8px', fontWeight: 800 }}>
              Thank You!
            </h3>
            <p style={{ color: '#556987', fontSize: '0.95rem' }}>
              Your request for <strong>{title}</strong> has been received.<br />
              Our concierge will contact you within 15 minutes!
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '2rem' }}>✈️</span>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: '#0A1F44', margin: 0, fontWeight: 800 }}>
                  {title || 'Request a Quote'}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '2px 0 0' }}>
                  Fill your details — we'll find you the best rates!
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="As on Passport"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 58 833 8927"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem' }}
                >
                  <option>1 Person</option>
                  <option>2 Persons</option>
                  <option>3 Persons</option>
                  <option>4 Persons</option>
                  <option>5+ Persons (Group)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                  Special Requests / Notes
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Preferred airlines, hotel type, special requirements..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '13px', marginTop: '4px',
                  background: loading ? '#94a3b8' : 'linear-gradient(135deg, #F5B301 0%, #e09f00 100%)',
                  color: '#0A1F44', fontWeight: 700, fontSize: '1rem',
                  borderRadius: '12px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 24px rgba(245,179,1,0.4)'
                }}
              >
                {loading ? 'Submitting...' : '✈️ Submit Enquiry'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94A3B8' }}>
                Or call us directly:{' '}
                <a href="tel:+971588338927" style={{ color: '#1E6FD9', fontWeight: 600 }}>+971 58 833 8927</a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
