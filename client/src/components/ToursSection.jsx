import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAutoManualScroll } from '../hooks/useAutoManualScroll';
import ScrollControlBar from './ScrollControlBar';
import { useSiteData } from '../context/SiteDataContext';

const DEFAULT_TOURS = [
  {
    id: 1,
    title: 'Sunset Desert Safari with Barbecue Dinner at bedouin tent',
    location: 'Dubai Desert',
    rating: '5.0',
    hours: '10-Hrs',
    carHours: '10-Hrs',
    guide: 'Driver-guide',
    capacity: '3',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 2,
    title: 'Private Custom Made Full Day tour By 4WD',
    location: 'Dubai & Beyond',
    rating: '5.0',
    hours: '08-Hrs',
    carHours: '08-Hrs',
    guide: 'Driver-guide',
    capacity: '3',
    price: '$450',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 3,
    title: 'East Salalah Mountain Safari & Waterfalls',
    location: 'Salalah / Oman',
    rating: '5.0',
    hours: '08-Hrs',
    carHours: '08-Hrs',
    guide: 'Driver-guide',
    capacity: '3',
    price: '$80',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 4,
    title: 'Coastal Dolphin Watching & Snorkeling Cruise',
    location: 'Dubai Marina',
    rating: '5.0',
    hours: '04-Hrs',
    carHours: '04-Hrs',
    guide: 'Driver-guide',
    capacity: '4',
    price: '$65',
    image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 5,
    title: 'Beach & Blowholes Coastal Exploration Tour',
    location: 'Dubai Coast',
    rating: '5.0',
    hours: '06-Hrs',
    carHours: '06-Hrs',
    guide: 'Driver-guide',
    capacity: '3',
    price: '$95',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80'
  }
];

export default function ToursSection({ onBookTour }) {
  const { siteData } = useSiteData();
  const [tours, setTours] = useState(() => {
    if (siteData?.tours && siteData.tours.length > 0) {
      return siteData.tours;
    }
    return DEFAULT_TOURS;
  });

  const {
    scrollPrev,
    scrollNext,
    hasDragged,
    containerProps
  } = useAutoManualScroll({ speed: 1.0, cardWidth: 336, setsCount: 4 });

  const mapTour = (item, idx) => ({
    id: item.id || item._id || idx,
    title: item.title,
    location: item.location || item.tagline || 'Dubai, UAE',
    rating: item.rating ? `${item.rating}` : '5.0',
    hours: item.duration || '08-Hrs',
    carHours: item.vehicle || item.transport || '4WD Cruiser',
    guide: item.guide || 'Driver-guide',
    capacity: item.capacity || item.groupSize || '4',
    price: item.price
      ? (typeof item.price === 'string' ? item.price : `$${item.price}`)
      : DEFAULT_TOURS[idx % DEFAULT_TOURS.length].price,
    image:
      item.image ||
      item.coverImage ||
      (item.images && item.images[0]) ||
      DEFAULT_TOURS[idx % DEFAULT_TOURS.length].image
  });

  useEffect(() => {
    if (siteData?.tours && siteData.tours.length > 0) {
      setTours(siteData.tours.map(mapTour));
    }
  }, [siteData?.tours]);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e?.detail?.tours && Array.isArray(e.detail.tours)) {
        setTours(e.detail.tours.map(mapTour));
      } else {
        try {
          const stored = localStorage.getItem('air_dream_site_data_v2');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.tours?.length > 0) {
              setTours(parsed.tours.map(mapTour));
              return;
            }
          }
        } catch (err) {}

        api.get('/tours')
          .then((res) => {
            if (res.data?.length > 0) {
              setTours(res.data.map(mapTour));
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

  const renderCard = (tour, keyPrefix) => (
    <div
      key={`${keyPrefix}-${tour.id}`}
      className="tour-trip-card"
      onClick={() => {
        if (!hasDragged()) {
          onBookTour && onBookTour(tour.title, tour.price);
        }
      }}
    >
      <div className="tour-card-img-wrap">
        <img
          src={tour.image}
          alt={tour.title}
          className="tour-card-img"
          loading="lazy"
        />
      </div>
      <div className="tour-card-body">
        <div className="tour-card-header-meta">
          <span className="tour-location-tag">
            <i className="fa-solid fa-location-dot"></i> {tour.location}
          </span>
          <span className="tour-rating-stars">
            {tour.rating} <i className="fa-solid fa-star"></i>
          </span>
        </div>
        <h3 className="tour-card-title">{tour.title}</h3>
        <div className="tour-card-grid-meta">
          <div className="tour-meta-item">
            <i className="fa-regular fa-clock"></i> {tour.hours}
          </div>
          <div className="tour-meta-item">
            <i className="fa-solid fa-car-side"></i> {tour.carHours}
          </div>
          <div className="tour-meta-item">
            <i className="fa-solid fa-user-tie"></i> {tour.guide}
          </div>
          <div className="tour-meta-item">
            <i className="fa-solid fa-users"></i> {tour.capacity}
          </div>
        </div>
        <div className="tour-card-footer">
          <div className="tour-price-box">
            <span className="tour-price-value">{tour.price}</span>
            <span className="tour-price-unit">/Per person</span>
          </div>
          <button
            type="button"
            className="btn-book-tour"
            onClick={(e) => {
              e.stopPropagation();
              if (onBookTour) onBookTour(tour.title, tour.price);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="tours-trips-section" id="tours">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div className="section-badge-center" style={{ margin: 0 }}>
            <span className="pill-badge-outline">Tour - Trips</span>
          </div>
          <ScrollControlBar
            onPrev={scrollPrev}
            onNext={scrollNext}
          />
        </div>
      </div>

      <div className="tours-marquee-container" {...containerProps}>
        <div className="tours-marquee-track">
          {tours.map((t) => renderCard(t, 't1'))}
          {tours.map((t) => renderCard(t, 't2'))}
          {tours.map((t) => renderCard(t, 't3'))}
          {tours.map((t) => renderCard(t, 't4'))}
        </div>
      </div>

      <div className="section-readmore-footer">
        <a href="#contact" className="section-footer-readmore-link">
          READ MORE
        </a>
      </div>
    </section>
  );
}
