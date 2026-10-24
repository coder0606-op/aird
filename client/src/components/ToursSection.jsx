import React, { useState, useEffect } from 'react';
import api from '../utils/api';

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
  const [tours, setTours] = useState(DEFAULT_TOURS);

  useEffect(() => {
    api.get('/tours')
      .then((res) => {
        if (res.data?.length > 0) {
          const mapped = res.data.map((item, idx) => ({
            id: item._id || idx,
            title: item.title,
            location: item.location || 'Dubai, UAE',
            rating: item.rating ? `${item.rating}.0` : '5.0',
            hours: item.duration ? `${item.duration} Hrs` : '08-Hrs',
            carHours: item.transport || 'A/C Transfer',
            guide: item.guide || 'Driver-guide',
            capacity: item.groupSize || '3',
            price: item.price ? `$${item.price}` : DEFAULT_TOURS[idx % DEFAULT_TOURS.length].price,
            image:
              item.coverImage ||
              item.image ||
              (item.images && item.images[0]) ||
              DEFAULT_TOURS[idx % DEFAULT_TOURS.length].image
          }));
          setTours(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const renderCard = (tour, keyPrefix) => (
    <div
      key={`${keyPrefix}-${tour.id}`}
      className="tour-trip-card"
      onClick={() => onBookTour && onBookTour(tour.title, tour.price)}
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
        <div className="section-badge-center">
          <span className="pill-badge-outline">Tour - Trips</span>
        </div>
      </div>

      <div className="tours-marquee-container">
        <div className="tours-marquee-track">
          {tours.map((t) => renderCard(t, 't1'))}
          {tours.map((t) => renderCard(t, 't2'))}
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
