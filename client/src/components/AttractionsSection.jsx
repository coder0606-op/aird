import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAutoManualScroll } from '../hooks/useAutoManualScroll';
import ScrollControlBar from './ScrollControlBar';
import { useSiteData } from '../context/SiteDataContext';

const DUBAI_ATTRACTIONS = [
  {
    id: 1,
    name: 'Burj Khalifa',
    activities: '145 activities',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80',
    price: '$95'
  },
  {
    id: 2,
    name: 'Museum of the Future',
    activities: '92 activities',
    image: 'https://images.unsplash.com/photo-1634148545855-32a8427fefb3?auto=format&fit=crop&w=700&q=80',
    price: '$45'
  },
  {
    id: 3,
    name: 'Desert Safari & Dunes',
    activities: '280 activities',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80',
    price: '$55'
  },
  {
    id: 4,
    name: 'The View at The Palm',
    activities: '115 activities',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=700&q=80',
    price: '$38'
  },
  {
    id: 5,
    name: 'Dubai Frame',
    activities: '64 activities',
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=700&q=80',
    price: '$22'
  },
  {
    id: 6,
    name: 'Ain Dubai & Marina',
    activities: '48 activities',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=700&q=80',
    price: '$40'
  },
  {
    id: 7,
    name: 'Atlantis Aquaventure',
    activities: '160 activities',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80',
    price: '$85'
  },
  {
    id: 8,
    name: 'Dubai Miracle Garden',
    activities: '52 activities',
    image: 'https://images.unsplash.com/photo-1561571994-3c3915177263?auto=format&fit=crop&w=700&q=80',
    price: '$28'
  }
];

export default function AttractionsSection({ onBookAttraction }) {
  const { siteData } = useSiteData();
  const [attractions, setAttractions] = useState(() => {
    if (siteData?.attractions && siteData.attractions.length > 0) {
      return siteData.attractions;
    }
    return DUBAI_ATTRACTIONS;
  });

  const {
    scrollPrev,
    scrollNext,
    hasDragged,
    containerProps
  } = useAutoManualScroll({ speed: 1.0, cardWidth: 310, setsCount: 4 });

  const mapAttraction = (item, idx) => ({
    id: item.id || item._id || idx,
    name: item.name || item.title,
    activities: item.activities
      ? (typeof item.activities === 'string' ? item.activities : `${item.activities} activities`)
      : '100+ activities',
    image:
      item.image ||
      item.coverImage ||
      (item.images && item.images[0]) ||
      DUBAI_ATTRACTIONS[idx % DUBAI_ATTRACTIONS.length].image,
    price: item.price
      ? (typeof item.price === 'string' ? item.price : `$${item.price}`)
      : DUBAI_ATTRACTIONS[idx % DUBAI_ATTRACTIONS.length].price
  });

  useEffect(() => {
    if (siteData?.attractions && siteData.attractions.length > 0) {
      setAttractions(siteData.attractions.map(mapAttraction));
    }
  }, [siteData?.attractions]);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e?.detail?.attractions && Array.isArray(e.detail.attractions)) {
        setAttractions(e.detail.attractions.map(mapAttraction));
      } else {
        try {
          const stored = localStorage.getItem('air_dream_site_data_v2');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.attractions?.length > 0) {
              setAttractions(parsed.attractions.map(mapAttraction));
              return;
            }
          }
        } catch (err) {}

        api.get('/activities')
          .then((res) => {
            if (res.data?.length > 0) {
              setAttractions(res.data.map(mapAttraction));
            }
          })
          .catch(() => {});
      }
    };

    window.addEventListener('airdream-data-updated', handleUpdate);
    window.addEventListener('airdream:data_updated', handleUpdate);

    return () => {
      window.removeEventListener('airdream-data-updated', handleUpdate);
      window.removeEventListener('airdream:data_updated', handleUpdate);
    };
  }, []);

  const renderCard = (attraction, keyPrefix) => (
    <div
      key={`${keyPrefix}-${attraction.id}`}
      className="attraction-card"
      onClick={() => {
        if (!hasDragged()) {
          onBookAttraction &&
            onBookAttraction(attraction.name, attraction.price);
        }
      }}
    >
      <div className="attraction-img-wrapper">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="attraction-img"
          loading="lazy"
        />
      </div>
      <div className="attraction-info">
        <h3 className="attraction-name">{attraction.name}</h3>
        <p className="attraction-activities">{attraction.activities}</p>
        <div className="attraction-card-footer">
          <div className="tour-price-box">
            <span className="tour-price-value">{attraction.price}</span>
            <span className="tour-price-unit">/person</span>
          </div>
          <button
            type="button"
            className="btn-book-tour"
            onClick={(e) => {
              e.stopPropagation();
              if (onBookAttraction)
                onBookAttraction(attraction.name, attraction.price);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="section-padding attractions-section" id="attractions">
      <div className="container">
        <div className="attractions-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div
              className="section-tag"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#E0F2FE',
                color: '#0369A1',
                padding: '4px 14px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}
            >
              <i className="fa-solid fa-star text-gold"></i> Must-Visit Landmarks
            </div>
            <h2 className="attractions-title">Top Dubai Attractions</h2>
            <p className="attractions-subtitle">
              Explore iconic landmarks &amp; unforgettable experiences in Dubai
            </p>
          </div>
          <ScrollControlBar
            onPrev={scrollPrev}
            onNext={scrollNext}
          />
        </div>
      </div>

      <div className="attractions-marquee-container" {...containerProps}>
        <div className="attractions-marquee-track">
          {attractions.map((att) => renderCard(att, 'att1'))}
          {attractions.map((att) => renderCard(att, 'att2'))}
          {attractions.map((att) => renderCard(att, 'att3'))}
          {attractions.map((att) => renderCard(att, 'att4'))}
        </div>
      </div>
    </section>
  );
}
