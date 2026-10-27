import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";

export default function Navbar({ onOpenQuote }) {
  const { siteData } = useSiteData();
  const settings = siteData?.settings || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const phone = settings.phone || "+971 58 833 8927";
  const whatsapp = settings.whatsapp || "971588338927";
  const email = settings.email || "info@airdreamtravel.com";
  const brandName = settings.brandName || "Air Dream";
  const brandTagline = settings.brandTagline || "TRAVEL TOURISM LLC";
  const logoUrl = settings.logoUrl || "/assets/air-dream-badge.svg";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/" + targetId);
      setTimeout(() => {
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Top Bar (Phone, circular email, social icons) */}
      <div className="top-bar air-dream-top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="top-bar-phone-link">
              <i className="fa-solid fa-phone"></i>
              <span>{phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="top-bar-circle-icon-btn"
              title="Email Us"
              aria-label="Email Us"
            >
              <i className="fa-regular fa-envelope"></i>
            </a>
          </div>
          <div className="top-bar-right">
            <div className="top-bar-social-group">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="top-bar-social-btn"
                title="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="top-bar-social-btn"
                title="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="top-bar-social-btn"
                title="TikTok"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="top-bar-social-btn"
                title="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header (Air Dream squircle badge, green WhatsApp, dark hamburger) */}
      <header
        className={`main-header air-dream-header ${isScrolled ? "scrolled" : ""}`}
        id="mainHeader"
      >
        <div className="container header-container">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="brand-logo-link air-dream-brand"
            aria-label="Air Dream Travel Tourism LLC Home"
          >
            <img
              src={logoUrl}
              alt="Air Dream Logo"
              className="air-dream-header-badge"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/air-dream-badge.svg";
              }}
            />
            <div className="air-dream-brand-text">
              <span className="air-dream-brand-name">Air Dream</span>
              <span className="air-dream-brand-sub">TRAVEL TOURISM</span>
              <span className="air-dream-brand-llc">LLC</span>
            </div>
          </Link>

          {/* Desktop Navigation with Elegant Wording and Responsive Spacing */}
          <nav
            className="desktop-nav air-dream-nav"
            aria-label="Main Navigation"
          >
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="nav-link active"
            >
              Home
            </a>
            <a
              href="#about-us"
              onClick={(e) => handleNavClick(e, "#about-us")}
              className="nav-link"
            >
              About
            </a>
            <a
              href="#tours"
              onClick={(e) => handleNavClick(e, "#tours")}
              className="nav-link"
            >
              Tours
            </a>
            <a
              href="#attractions"
              onClick={(e) => handleNavClick(e, "#attractions")}
              className="nav-link"
            >
              Attractions
            </a>
            <a
              href="#transfers"
              onClick={(e) => handleNavClick(e, "#transfers")}
              className="nav-link"
            >
              Transfers
            </a>
            <a
              href="#packages"
              onClick={(e) => handleNavClick(e, "#packages")}
              className="nav-link"
            >
              Packages
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleNavClick(e, "#gallery")}
              className="nav-link"
            >
              Gallery
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleNavClick(e, "#testimonials")}
              className="nav-link"
            >
              Reviews
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="nav-link nav-link-contact"
            >
              <span className="contact-accent-icon">
                <i className="fa-regular fa-paper-plane"></i>
              </span>
              <span>Contact</span>
            </a>
          </nav>

          {/* Right Action Icons (Admin Pill + Green WhatsApp + Dark Hamburger) */}
          <div className="header-actions">
            <Link
              to="/admin"
              className="header-admin-pill-btn"
              title="Admin Control Center"
            >
              <i className="fa-solid fa-sliders"></i>
              <span>Admin</span>
            </Link>

            <a
              href="https://wa.me/971588338927"
              target="_blank"
              rel="noopener noreferrer"
              className="header-green-whatsapp-btn"
              title="Chat on WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>

            <button
              type="button"
              className={`header-dark-hamburger-btn ${isMenuOpen ? "active" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <span className="hamburger-bar"></span>
              <span className="hamburger-bar"></span>
              <span className="hamburger-bar"></span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Backdrop & Menu */}
        <div
          className={`mobile-nav-backdrop ${isMenuOpen ? "open" : ""}`}
          onClick={closeMenu}
        ></div>
        <aside
          className={`borderlink-mobile-menu ${isMenuOpen ? "open" : ""}`}
          aria-label="Mobile Navigation Menu"
        >
          <div className="borderlink-menu-inner">
            <div className="borderlink-menu-links">
              <div className="borderlink-menu-item-home">
                <a
                  href="#hero"
                  onClick={(e) => handleNavClick(e, "#hero")}
                  className="borderlink-nav-item active"
                >
                  Home
                </a>
                <div className="borderlink-home-underline"></div>
              </div>
              <a
                href="#about-us"
                onClick={(e) => handleNavClick(e, "#about-us")}
                className="borderlink-nav-item"
              >
                About Us
              </a>
              <a
                href="#tours"
                onClick={(e) => handleNavClick(e, "#tours")}
                className="borderlink-nav-item"
              >
                Tours &amp; Excursions
              </a>
              <a
                href="#attractions"
                onClick={(e) => handleNavClick(e, "#attractions")}
                className="borderlink-nav-item"
              >
                Dubai Attractions
              </a>
              <a
                href="#transfers"
                onClick={(e) => handleNavClick(e, "#transfers")}
                className="borderlink-nav-item"
              >
                Airport Transfers
              </a>
              <a
                href="#packages"
                onClick={(e) => handleNavClick(e, "#packages")}
                className="borderlink-nav-item"
              >
                Holiday &amp; Umrah Packages
              </a>
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, "#gallery")}
                className="borderlink-nav-item"
              >
                Photo Gallery
              </a>
              <a
                href="#testimonials"
                onClick={(e) => handleNavClick(e, "#testimonials")}
                className="borderlink-nav-item"
              >
                Traveler Reviews
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="borderlink-nav-item borderlink-contact-item"
              >
                <span className="contact-mini-envelope">
                  <i className="fa-regular fa-paper-plane"></i>
                </span>
                <span>Contact Us</span>
              </a>
            </div>
            <div className="borderlink-menu-actions">
              <a
                href="https://wa.me/971588338927"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-borderlink-signup"
                style={{ textAlign: "center", textDecoration: "none" }}
              >
                <i className="fa-brands fa-whatsapp"></i> WhatsApp
              </a>
              <button
                type="button"
                className="btn-borderlink-login"
                onClick={() => {
                  closeMenu();
                  if (onOpenQuote) onOpenQuote("Custom Quote Request");
                }}
              >
                Quote
              </button>
            </div>
          </div>
        </aside>
      </header>
    </>
  );
}
