import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    badge: 'Premium Flight Booking',
    badgeIcon: 'fa-plane',
    title: <>Fly Anywhere at the <span className="highlight-text">Best Fares</span></>,
    desc: 'Experience seamless global connections with world-class airlines. Unlock corporate discounts, flexible baggage, and 24/7 travel care.',
    bg: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80',
    primaryBtnText: 'Book Your Flight',
    primaryBtnIcon: 'fa-ticket'
  },
  {
    badge: 'Sacred Pilgrimage',
    badgeIcon: 'fa-kaaba',
    title: <>Hajj &amp; Umrah <span className="highlight-text">Made Easy</span></>,
    desc: 'Embark on your spiritual pilgrimage with utter peace of mind. Deluxe 5-star hotels near Haram, VIP transport, and guided Ziyarat.',
    bg: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=80',
    primaryBtnText: 'View Umrah Packages',
    primaryBtnIcon: 'fa-moon'
  },
  {
    badge: 'Curated Vacations',
    badgeIcon: 'fa-compass',
    title: <>Explore the World with <span className="highlight-text">Air Dream</span></>,
    desc: 'From turquoise tropical waters in Maldives to Swiss Alpine peaks and Dubai luxury, create travel memories that last forever.',
    bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    primaryBtnText: 'Plan Your Trip',
    primaryBtnIcon: 'fa-map-location-dot'
  }
];

export default function NewHeroSection({ onOpenQuote }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section" id="hero">
      {/* 3-Slide Wallpaper Slider */}
      <div className="hero-slider-container" id="heroSlider">
        <div className="hero-slider-track">
          {SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
            >
              <div className="hero-slide-bg" style={{ backgroundImage: `url(${slide.bg})` }}></div>
              <div className="hero-overlay"></div>
              <div className="container">
                <div className="hero-content">
                  <div className="hero-badge">
                    <i className={`fa-solid ${slide.badgeIcon}`}></i> {slide.badge}
                  </div>
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-desc">{slide.desc}</p>
                  <div className="hero-btns">
                    <a href="#why-choose" className="btn btn-gold">
                      <i className={`fa-solid ${slide.primaryBtnIcon}`}></i> {slide.primaryBtnText}
                    </a>
                    <button
                      type="button"
                      className="btn btn-outline-white"
                      onClick={() => onOpenQuote && onOpenQuote('Custom Inquiry')}
                    >
                      <i className="fa-solid fa-file-invoice"></i> Request Custom Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Arrows */}
        <button
          type="button"
          className="slider-arrow-btn slider-arrow-prev"
          onClick={() => setCurrentSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length)}
          aria-label="Previous Slide"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          type="button"
          className="slider-arrow-btn slider-arrow-next"
          onClick={() => setCurrentSlide((currentSlide + 1) % SLIDES.length)}
          aria-label="Next Slide"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* Slider Dots */}
        <div className="slider-dots-container">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`slider-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
