import React from 'react';

export default function NewAboutSection({ onOpenQuote }) {
  return (
    <section className="about-us-section" id="about-us">
      <div className="container about-us-container">
        <h2 className="about-us-title">About Us</h2>
        <p className="about-us-quote">
          &ldquo;We, at Air Dream Travel &amp; Tourism, cater to our clients a lifestyle at its best where they can feel the pulse of Dubai, the unseen facet of the UAE, through our exclusive guided tours and other value-added services.&rdquo;
        </p>
        <div>
          <button
            type="button"
            className="btn-about-readmore"
            onClick={() => onOpenQuote && onOpenQuote('About Air Dream Travel & Tourism')}
          >
            Request Consultation
          </button>
        </div>

        {/* Arched Photo Composition with Overlapping Bubble Photo Badges */}
        <div className="about-visual-stage">
          {/* Main Arched Frame */}
          <div className="about-arch-outer">
            <div className="about-arch-inner">
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
                alt="Air Dream Travel Dubai"
                className="about-arch-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* Bubble 1: Top-Left */}
          <div className="about-bubble-1" title="Burj Khalifa">
            <img
              src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=400&q=80"
              alt="Dubai Marina"
              loading="lazy"
            />
          </div>

          {/* Bubble 2: Top-Side */}
          <div className="about-bubble-2" title="Desert Safari">
            <img
              src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=300&q=80"
              alt="Desert Safari"
              loading="lazy"
            />
          </div>

          {/* Bubble 3: Bottom-Left */}
          <div className="about-bubble-3" title="Dubai Coastline">
            <img
              src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=400&q=80"
              alt="Dubai Palm"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
