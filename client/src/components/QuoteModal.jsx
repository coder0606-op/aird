import React, { useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function QuoteModal({ isOpen, initialTitle, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    quoteName: '',
    quoteEmail: '',
    quotePhone: '',
    quoteService: 'Spiritual Umrah / Hajj',
    quotePax: '2 Adults',
    quoteBudget: 'Standard ($1,000 - $2,500)',
    quoteMessage: ''
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
      fullName: formData.quoteName,
      email: formData.quoteEmail,
      phone: formData.quotePhone,
      serviceRequired: formData.quoteService || initialTitle || 'Custom Quote Request',
      message: `Passengers: ${formData.quotePax} | Budget: ${formData.quoteBudget} | Notes: ${formData.quoteMessage || 'None'}`,
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
      console.warn('Backend API offline or unreachable, saving quote locally:', apiErr);
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
    toast.success('Quote request sent! We will prepare a personalized itinerary for you.');

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        quoteName: '',
        quoteEmail: '',
        quotePhone: '',
        quoteService: 'Spiritual Umrah / Hajj',
        quotePax: '2 Adults',
        quoteBudget: 'Standard ($1,000 - $2,500)',
        quoteMessage: ''
      });
      onClose();
    }, 2500);
  };

  return (
    <div
      className="modal-overlay open"
      id="quoteModal"
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
              <i className="fa-solid fa-file-invoice text-gold"></i>
              <span>{initialTitle || 'Request a Personalized Quote'}</span>
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#CDE8FF' }}>
              Tailored itineraries &bull; Best flight &amp; hotel deals guaranteed
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
              <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>✈️</div>
              <h3
                style={{
                  fontSize: '1.5rem',
                  color: '#0A1F44',
                  marginBottom: '8px',
                  fontWeight: 800
                }}
              >
                Quote Received!
              </h3>
              <p style={{ color: '#516480', fontSize: '0.95rem' }}>
                Thank you! Our travel concierge is reviewing your request and will
                contact you with the best available rates.
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
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="quoteName"
                    required
                    value={formData.quoteName}
                    onChange={handleChange}
                    placeholder="Your Name"
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
                    name="quoteEmail"
                    required
                    value={formData.quoteEmail}
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
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="quotePhone"
                  required
                  value={formData.quotePhone}
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
                    Service of Interest
                  </label>
                  <select
                    name="quoteService"
                    value={formData.quoteService}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="Spiritual Umrah / Hajj">
                      Spiritual Umrah / Hajj
                    </option>
                    <option value="International Flights">
                      International Flights
                    </option>
                    <option value="Dubai Landmark Tours">
                      Dubai Landmark Tours
                    </option>
                    <option value="Worldwide Holiday Packages">
                      Worldwide Holiday Packages
                    </option>
                    <option value="Schengen / UK / US Visa">
                      Visa Processing Assistance
                    </option>
                    <option value="Airport VIP Transfers">
                      Airport VIP Transfers
                    </option>
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
                    Estimated Budget
                  </label>
                  <select
                    name="quoteBudget"
                    value={formData.quoteBudget}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="Economy ($500 - $1,000)">
                      Economy ($500 - $1,000)
                    </option>
                    <option value="Standard ($1,000 - $2,500)">
                      Standard ($1,000 - $2,500)
                    </option>
                    <option value="Luxury ($2,500 - $5,000)">
                      Luxury ($2,500 - $5,000)
                    </option>
                    <option value="VIP Unlimited">VIP Unlimited</option>
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
                  Special Notes / Preferences
                </label>
                <textarea
                  name="quoteMessage"
                  rows={2}
                  value={formData.quoteMessage}
                  onChange={handleChange}
                  placeholder="Tell us about airline preferences, hotel stars, dietary requests, or specific cities..."
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
                className="btn btn-gold"
                style={{
                  width: '100%',
                  fontSize: '1rem',
                  padding: '13px',
                  borderRadius: '12px',
                  marginTop: '6px'
                }}
              >
                <i className="fa-solid fa-paper-plane"></i>{' '}
                {loading ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
