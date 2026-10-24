import React, { useState, useEffect, useCallback } from "react";
import api from "../utils/api";

const DEFAULT_SLIDES = [
  {
    id: "slide-1",
    badge: "Premium Flight Booking",
    badgeIcon: "fa-plane",
    title: (
      <>
        Fly Anywhere at the <span className="highlight-text">Best Fares</span>
      </>
    ),
    desc: "Experience seamless global connections with world-class airlines. Unlock corporate discounts, flexible baggage, and 24/7 travel care.",
    bg: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80",
    primaryBtnText: "Book Your Flight",
    primaryBtnIcon: "fa-ticket",
    primaryBtnLink: "#packages",
    secondaryBtnText: "Request Custom Quote",
  },
  {
    id: "slide-2",
    badge: "Sacred Pilgrimage",
    badgeIcon: "fa-kaaba",
    title: (
      <>
        Hajj &amp; Umrah <span className="highlight-text">Made Easy</span>
      </>
    ),
    desc: "Embark on your spiritual pilgrimage with utter peace of mind. Deluxe 5-star hotels near Haram, VIP transport, and guided Ziyarat.",
    bg: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=80",
    primaryBtnText: "View Umrah Packages",
    primaryBtnIcon: "fa-moon",
    primaryBtnLink: "#packages",
    secondaryBtnText: "Inquire Umrah Group",
  },
  {
    id: "slide-3",
    badge: "Curated Vacations",
    badgeIcon: "fa-compass",
    title: (
      <>
        Explore the World with <span className="highlight-text">Air Dream</span>
      </>
    ),
    desc: "From turquoise tropical waters in Maldives to Swiss Alpine peaks and Dubai luxury, create travel memories that last forever.",
    bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    primaryBtnText: "Plan Your Trip",
    primaryBtnIcon: "fa-map-location-dot",
    primaryBtnLink: "#packages",
    secondaryBtnText: "Plan Your Honeymoon",
  },
];

const formatSlide = (item, idx) => {
  let titleNode = item.title;
  if (item.highlight) {
    titleNode = (
      <>
        {item.title} <span className="highlight-text">{item.highlight}</span>
      </>
    );
  }

  return {
    id: item.id || item._id || `slide-${idx}`,
    badge: item.badge || "Premium Flight Booking",
    badgeIcon: item.badgeIcon || "fa-plane",
    title: titleNode,
    desc: item.desc || item.description || "",
    bg: item.image || item.bg || DEFAULT_SLIDES[idx % DEFAULT_SLIDES.length].bg,
    primaryBtnText: item.primaryBtnText || "Book Your Flight",
    primaryBtnIcon: item.primaryBtnIcon || "fa-ticket",
    primaryBtnLink: item.primaryBtnLink || "#packages",
    secondaryBtnText: item.secondaryBtnText || "Request Custom Quote",
  };
};

export default function HeroSection({ onOpenQuote }) {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);

  const loadWallpapers = useCallback(async () => {
    // 1. Check cached local storage first for instant response
    try {
      const cached = localStorage.getItem("air_dream_site_data_v2");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.wallpapers && parsed.wallpapers.length > 0) {
          setSlides(parsed.wallpapers.map(formatSlide));
        }
      }
    } catch (e) {}

    // 2. Fetch fresh from backend API
    try {
      const res = await api.get("/wallpapers");
      console.log(res);
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setSlides(res.data.map(formatSlide));
        return;
      }
    } catch (err) {
      // Try unified site-content endpoint as backup
      try {
        const scRes = await api.get("/site-content");
        if (scRes.data?.wallpapers?.length > 0) {
          setSlides(scRes.data.wallpapers.map(formatSlide));
        }
      } catch (e) {}
    }
  }, []);

  // Initial fetch and real-time live sync listeners
  useEffect(() => {
    loadWallpapers();

    const handleUpdate = (e) => {
      if (
        e.detail?.wallpapers &&
        Array.isArray(e.detail.wallpapers) &&
        e.detail.wallpapers.length > 0
      ) {
        setSlides(e.detail.wallpapers.map(formatSlide));
      } else {
        loadWallpapers();
      }
    };

    window.addEventListener("airdream-data-updated", handleUpdate);
    window.addEventListener("airdream:data_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("airdream-data-updated", handleUpdate);
      window.removeEventListener("airdream:data_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [loadWallpapers]);

  // Slideshow auto-advance interval
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToLink = (e, link = "#packages") => {
    e.preventDefault();
    const target = link.startsWith("#") ? link : "#packages";
    const el =
      document.querySelector(target) || document.querySelector("#why-choose");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const activeIndex = currentSlide % (slides.length || 1);

  return (
    <section className="hero-section" id="hero">
      {/* Dynamic Wallpaper Slider */}
      <div className="hero-slider-container" id="heroSlider">
        <div className="hero-slider-track">
          {slides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className={`hero-slide ${idx === activeIndex ? "active" : ""}`}
            >
              <div
                className="hero-slide-bg"
                style={{ backgroundImage: `url(${slide.bg})` }}
              ></div>
              <div className="hero-overlay"></div>
              <div className="container">
                <div className="hero-content">
                  <div className="hero-badge">
                    <i className={`fa-solid ${slide.badgeIcon}`}></i>{" "}
                    {slide.badge}
                  </div>
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-desc">{slide.desc}</p>
                  <div className="hero-btns">
                    <a
                      href={slide.primaryBtnLink || "#packages"}
                      onClick={(e) => scrollToLink(e, slide.primaryBtnLink)}
                      className="btn btn-gold"
                    >
                      <i className={`fa-solid ${slide.primaryBtnIcon}`}></i>{" "}
                      {slide.primaryBtnText}
                    </a>
                    <button
                      type="button"
                      className="btn btn-outline-white"
                      onClick={() =>
                        onOpenQuote &&
                        onOpenQuote(
                          typeof slide.title === "string"
                            ? slide.title
                            : slide.badge,
                        )
                      }
                    >
                      <i className="fa-solid fa-file-invoice"></i>{" "}
                      {slide.secondaryBtnText || "Request Custom Quote"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Navigation Arrows (shown if > 1 slide) */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="slider-arrow-btn slider-arrow-prev"
              onClick={() =>
                setCurrentSlide(
                  (currentSlide - 1 + slides.length) % slides.length,
                )
              }
              aria-label="Previous Slide"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button
              type="button"
              className="slider-arrow-btn slider-arrow-next"
              onClick={() =>
                setCurrentSlide((currentSlide + 1) % slides.length)
              }
              aria-label="Next Slide"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </>
        )}

        {/* Slider Navigation Dots */}
        {slides.length > 1 && (
          <div className="slider-dots-container">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`slider-dot ${idx === activeIndex ? "active" : ""}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
