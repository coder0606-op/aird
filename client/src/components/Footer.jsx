import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenQuote }) {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="main-footer"
      id="contact"
      style={{
        background: '#061226',
        color: '#CDE8FF',
        padding: '70px 0 30px',
        borderTop: '1px solid rgba(205, 232, 255, 0.08)',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}
        >
          {/* Column 1: Brand Info */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '18px'
              }}
            >
              <img
                src="/assets/air-dream-badge.svg"
                alt="Air Dream Logo"
                style={{
                  height: '46px',
                  width: '46px',
                  borderRadius: '12px',
                  background: '#fff',
                  padding: '2px'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    letterSpacing: '-0.3px',
                    lineHeight: 1.1
                  }}
                >
                  Air Dream
                </span>
                <span
                  style={{
                    color: '#F5B301',
                    fontSize: '0.65rem',
                    letterSpacing: '1.5px',
                    fontWeight: 700
                  }}
                >
                  TRAVEL &amp; TOURISM
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: '0.9rem',
                color: '#94A3B8',
                lineHeight: 1.65,
                marginBottom: '22px'
              }}
            >
              Your trusted travel partner in Dubai for cheap international flights,
              5-star VIP Umrah &amp; Hajj packages, bespoke holiday tours, and fast
              visa assistance worldwide.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  transition: 'all 0.2s ease'
                }}
                title="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  transition: 'all 0.2s ease'
                }}
                title="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  transition: 'all 0.2s ease'
                }}
                title="TikTok"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
              <a
                href="https://wa.me/971588338927"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.2)',
                  color: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                title="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '18px'
              }}
            >
              Quick Links
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '11px',
                fontSize: '0.92rem'
              }}
            >
              <li>
                <a
                  href="#hero"
                  onClick={(e) => scrollTo(e, '#hero')}
                  style={{ color: '#94A3B8' }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#why-choose"
                  onClick={(e) => scrollTo(e, '#why-choose')}
                  style={{ color: '#94A3B8' }}
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a
                  href="#packages"
                  onClick={(e) => scrollTo(e, '#packages')}
                  style={{ color: '#94A3B8' }}
                >
                  Umrah &amp; World Packages
                </a>
              </li>
              <li>
                <a
                  href="#attractions"
                  onClick={(e) => scrollTo(e, '#attractions')}
                  style={{ color: '#94A3B8' }}
                >
                  Dubai Attractions
                </a>
              </li>
              <li>
                <a
                  href="#transfers"
                  onClick={(e) => scrollTo(e, '#transfers')}
                  style={{ color: '#94A3B8' }}
                >
                  Airport Transfers
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => scrollTo(e, '#testimonials')}
                  style={{ color: '#94A3B8' }}
                >
                  Traveler Reviews
                </a>
              </li>
              <li>
                <Link to="/admin" style={{ color: '#38BDF8', fontWeight: 600 }}>
                  <i className="fa-solid fa-sliders"></i> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4
              style={{
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '18px'
              }}
            >
              Our Services
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '11px',
                fontSize: '0.92rem'
              }}
            >
              <li>
                <span style={{ color: '#94A3B8' }}>Worldwide Flight Booking</span>
              </li>
              <li>
                <span style={{ color: '#94A3B8' }}>
                  5-Star Executive Umrah Packages
                </span>
              </li>
              <li>
                <span style={{ color: '#94A3B8' }}>
                  Customized Honeymoon &amp; Family Tours
                </span>
              </li>
              <li>
                <span style={{ color: '#94A3B8' }}>
                  Schengen, UK, US &amp; UAE Visas
                </span>
              </li>
              <li>
                <span style={{ color: '#94A3B8' }}>
                  Luxury Desert Safaris &amp; Dhow Cruises
                </span>
              </li>
              <li>
                <span style={{ color: '#94A3B8' }}>
                  24/7 VIP Travel Concierge Support
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div>
            <h4
              style={{
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '18px'
              }}
            >
              Contact &amp; Support
            </h4>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#94A3B8',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <i className="fa-solid fa-phone text-gold"></i>
              <a href="tel:+971588338927" style={{ color: '#CDE8FF' }}>
                +971 58 833 8927
              </a>
            </p>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#94A3B8',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <i className="fa-solid fa-envelope text-gold"></i>
              <a href="mailto:info@airdreamtravel.com" style={{ color: '#CDE8FF' }}>
                info@airdreamtravel.com
              </a>
            </p>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#94A3B8',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <i className="fa-solid fa-location-dot text-gold"></i>
              <span>Dubai, United Arab Emirates</span>
            </p>

            <button
              type="button"
              className="btn btn-gold btn-sm"
              onClick={() => onOpenQuote && onOpenQuote('Free Consultation Request')}
              style={{
                width: '100%',
                padding: '12px',
                fontWeight: 700,
                fontSize: '0.92rem'
              }}
            >
              <i className="fa-solid fa-calendar-check"></i> Get Free Consultation
            </button>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.85rem',
            color: '#64748B'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Air Dream Travel &amp; Tourism. All
            rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ color: '#94A3B8' }}>Privacy Policy</span>
            <span style={{ color: '#94A3B8' }}>Terms of Service</span>
            <span style={{ color: '#F5B301', fontWeight: 600 }}>
              <i className="fa-solid fa-shield-halved"></i> IATA Certified Agency
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
