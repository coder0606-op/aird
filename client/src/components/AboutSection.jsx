import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';

const DEFAULT_ABOUT = {
  aboutQuote: 'We, at Air Dream Travel Tourism LLC, cater to our clients a lifestyle at its best where they can feel the pulse of Dubai and the unseen facets of the world, through our exclusive guided tours and other value-added services.',
  aboutArchImg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  bubble1Img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=400&q=80',
  bubble2Img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=300&q=80',
  bubble3Img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=400&q=80'
};

export default function AboutSection({ onOpenQuote }) {
  const { siteData } = useSiteData();
  const [settings, setSettings] = useState(() => ({
    ...DEFAULT_ABOUT,
    ...(siteData?.settings || {})
  }));

  useEffect(() => {
    if (siteData?.settings) {
      setSettings((prev) => ({ ...prev, ...siteData.settings }));
    }
  }, [siteData?.settings]);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e?.detail?.settings) {
        setSettings((prev) => ({ ...prev, ...e.detail.settings }));
      } else {
        try {
          const stored = localStorage.getItem('air_dream_site_data_v2');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.settings) {
              setSettings((prev) => ({ ...prev, ...parsed.settings }));
            }
          }
        } catch (err) {}
      }
    };

    window.addEventListener('airdream-data-updated', handleUpdate);
    window.addEventListener('airdream:data_updated', handleUpdate);

    return () => {
      window.removeEventListener('airdream-data-updated', handleUpdate);
      window.removeEventListener('airdream:data_updated', handleUpdate);
    };
  }, []);

  const activeArchImg = (settings.aboutArchImg && !settings.aboutArchImg.includes('photo-1507525428034'))
    ? settings.aboutArchImg
    : DEFAULT_ABOUT.aboutArchImg;

  const activeBubble1 = (settings.bubble1Img && !settings.bubble1Img.includes('photo-1432405972618'))
    ? settings.bubble1Img
    : DEFAULT_ABOUT.bubble1Img;

  const activeBubble2 = (settings.bubble2Img && !settings.bubble2Img.includes('photo-1544551763'))
    ? settings.bubble2Img
    : DEFAULT_ABOUT.bubble2Img;

  const activeBubble3 = (settings.bubble3Img && !settings.bubble3Img.includes('photo-1544551763') && !settings.bubble3Img.includes('photo-1507525428034') && !settings.bubble3Img.includes('photo-1432405972618'))
    ? settings.bubble3Img
    : DEFAULT_ABOUT.bubble3Img;

  const activeQuote = (settings.aboutQuote && !settings.aboutQuote.includes('Arabian Travel'))
    ? settings.aboutQuote
    : DEFAULT_ABOUT.aboutQuote;

  return (
    <section className="about-us-section" id="about-us">
      <div className="container about-us-container">
        <h2 className="about-us-title">About US</h2>

        <p className="about-us-quote">
          &ldquo;{activeQuote}&rdquo;
        </p>

        <div>
          <button
            type="button"
            className="btn-about-readmore"
            onClick={() =>
              onOpenQuote && onOpenQuote('About Air Dream Travel Tourism LLC')
            }
          >
            Read More
          </button>
        </div>

        {/* Arched Photo Composition with Overlapping Bubble Badges (DEFAULT_ABOUT pictures) */}
        <div className="about-visual-stage">
          {/* Main Arched Frame */}
          <div className="about-arch-outer">
            <div className="about-arch-inner">
              <img
                src={activeArchImg}
                alt="Air Dream Travel Dubai"
                className="about-arch-img"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_ABOUT.aboutArchImg;
                }}
              />
            </div>
          </div>

          {/* Bubble 1: Top-Left */}
          <div className="about-bubble-1" title="Dubai Marina">
            <img
              src={activeBubble1}
              alt="Dubai Marina"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_ABOUT.bubble1Img;
              }}
            />
          </div>

          {/* Bubble 2: Top-Side */}
          <div className="about-bubble-2" title="Desert Safari">
            <img
              src={activeBubble2}
              alt="Desert Safari"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_ABOUT.bubble2Img;
              }}
            />
          </div>

          {/* Bubble 3: Bottom-Left */}
          <div className="about-bubble-3" title="Coastal Palm">
            <img
              src={activeBubble3}
              alt="Dubai Palm"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_ABOUT.bubble3Img;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
