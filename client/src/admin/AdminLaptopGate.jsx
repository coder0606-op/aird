import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * AdminLaptopGate Component
 * Ensures the Admin Panel and Admin Login are ONLY accessible on laptop and desktop screen sizes (>= 1024px).
 * Restricts and blocks phone and mobile viewports (< 1024px) with a dedicated informative screen.
 */
export default function AdminLaptopGate({ children }) {
  const [windowWidth, setWindowWidth] = useState(() => {
    return typeof window !== "undefined" ? window.innerWidth : 1200;
  });

  const isPhoneOrTablet = windowWidth < 1024;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* 1. Phone / Mobile Restriction Screen (Shown when viewport < 1024px) */}
      <div
        className={`admin-phone-block-screen ${isPhoneOrTablet ? "active-gate" : ""}`}
        aria-hidden={!isPhoneOrTablet}
      >
        <div className="admin-phone-block-card">
          {/* Brand Header */}
          <div className="phone-block-brand-top">
            <img
              src="/assets/air-dream-badge.svg"
              alt="Air Dream Logo"
              className="phone-block-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/image/logo.png";
              }}
            />
            <div className="air-dream-brand-text phone-block-brand-text">
              <span className="air-dream-brand-name">Air Dream</span>
              <span className="air-dream-brand-sub">TRAVEL TOURISM</span>
              <span className="air-dream-brand-llc">LLC</span>
            </div>
          </div>

          {/* Animated Laptop Visual */}
          <div className="phone-block-visual-wrap">
            <div className="phone-block-icon-halo">
              <i className="fa-solid fa-laptop"></i>
            </div>
            <div className="phone-block-prohibited-badge">
              <i className="fa-solid fa-mobile-screen"></i>
              <span className="prohibited-cross">&times;</span>
            </div>
          </div>

          {/* Restriction Notice */}
          <div className="phone-block-pill">
            <i className="fa-solid fa-shield-halved"></i>
            <span>Desktop &amp; Laptop Only</span>
          </div>

          <h2 className="phone-block-title">Admin Not Available on Phone Size</h2>

          <p className="phone-block-message">
            The <strong>Air Dream Admin Portal</strong> is exclusively designed for laptop and desktop workstations (1024px screen width or wider). It cannot be opened on mobile phones or small screens.
          </p>

          {/* Screen Width Diagnostics */}
          <div className="phone-block-specs-box">
            <div className="specs-line current">
              <span className="specs-tag">
                <i className="fa-solid fa-mobile-screen"></i> Current Screen:
              </span>
              <span className="specs-value red-text">{windowWidth}px (Phone / Tablet)</span>
            </div>
            <div className="specs-line required">
              <span className="specs-tag">
                <i className="fa-solid fa-laptop"></i> Required Size:
              </span>
              <span className="specs-value green-text">1024px or wider (Laptop / Desktop)</span>
            </div>
          </div>

          <p className="phone-block-instructions">
            Please open this link on your <strong>laptop or PC</strong> to access the control center, manage flight bookings, upload photos, and update site content.
          </p>

          {/* Return Home Button */}
          <Link to="/" className="btn-phone-block-return">
            <i className="fa-solid fa-arrow-left"></i>
            <span>Return to Air Dream Website</span>
          </Link>
        </div>
      </div>

      {/* 2. Laptop / Desktop Admin View (Only visible on screen width >= 1024px) */}
      <div className="admin-laptop-view-wrapper">
        {children}
      </div>
    </>
  );
}
