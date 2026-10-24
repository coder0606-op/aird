import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const DEFAULT_TOURS = [
  { id: 1, title: 'Desert Safari & Bedouin Dinner', location: 'Dubai, UAE', rating: '4.9', hours: '7 Hours', carHours: 'Private 4WD', guide: 'English Guide', capacity: '2–12 Guests', price: '$65', image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80' },
  { id: 2, title: 'Dhow Cruise — Marina by Night', location: 'Dubai Marina', rating: '4.8', hours: '2 Hours', carHours: 'Pick-up Included', guide: 'On-board Guide', capacity: '4–30 Guests', price: '$40', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80' },
  { id: 3, title: 'Burj Khalifa — Top of the World', location: 'Downtown Dubai', rating: '4.9', hours: '2.5 Hours', carHours: 'Shared Transfer', guide: 'Audio Guide', capacity: '1–10 Guests', price: '$95', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80' },
  { id: 4, title: 'Quad Biking — Red Dune Bash', location: 'Dubai Desert', rating: '5.0', hours: '4 Hours', carHours: 'Private 4WD', guide: 'Safety Instructor', capacity: '2–8 Guests', price: '$80', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=700&q=80' },
  { id: 5, title: 'Full-Day City Tour — Old & New Dubai', location: 'Dubai', rating: '4.7', hours: '8 Hours', carHours: 'A/C Coach', guide: 'Expert Guide', capacity: '2–20 Guests', price: '$55', image: 'https://images.unsplash.com/photo-1561571994-3c3915177263?auto=format&fit=crop&w=700&q=80' },
  { id: 6, title: 'Abu Dhabi — Grand Mosque & Corniche', location: 'Abu Dhabi', rating: '4.8', hours: '10 Hours', carHours: 'A/C Coach', guide: 'English Guide', capacity: '2–20 Guests', price: '$75', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80' }
];

export default function NewToursSection({ onBookTour }) {
  const [tours, setTours] = useState(DEFAULT_TOURS);

  useEffect(() => {
    api.get('/tours')
      .then(res => {
        if (res.data?.length > 0) {
          const mapped = res.data.map((item, idx) => ({
            id: item._id || idx,
            title: item.title || item.name,
            location: item.location || 'Dubai, UAE',
            rating: item.rating || '4.9',
            hours: item.duration ? `${item.duration} Hours` : '8 Hours',
            carHours: item.transport || 'Private Transfer',
            guide: item.guide || 'Expert Guide',
            capacity: item.groupSize || '2–12 Guests',
            price: item.price ? `$${item.price}` : DEFAULT_TOURS[idx % DEFAULT_TOURS.length]?.price,
            image: item.coverImage || item.image || DEFAULT_TOURS[idx % DEFAULT_TOURS.length]?.image
          }));
          setTours(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const renderTourCard = (tour, keyPrefix) => (
    <div
      key={`${keyPrefix}-${tour.id}`}
      className="tour-trip-card"
      onClick={() => onBookTour && onBookTour(tour.title, tour.price)}
    >
      <div className="tour-card-img-wrap">
        <img src={tour.image} alt={tour.title} className="tour-card-img" loading="lazy" />
      </div>
      <div className="tour-card-body">
        <div className="tour-card-header-meta">
          <span className="tour-location-tag"><i className="fa-solid fa-location-dot"></i> {tour.location}</span>
          <span className="tour-rating-stars">{tour.rating} <i className="fa-solid fa-star"></i></span>
        </div>
        <h3 className="tour-card-title">{tour.title}</h3>
        <div className="tour-card-grid-meta">
          <div className="tour-meta-item"><i className="fa-regular fa-clock"></i> {tour.hours}</div>
          <div className="tour-meta-item"><i className="fa-solid fa-car-side"></i> {tour.carHours}</div>
          <div className="tour-meta-item"><i className="fa-solid fa-user-tie"></i> {tour.guide}</div>
          <div className="tour-meta-item"><i className="fa-solid fa-users"></i> {tour.capacity}</div>
        </div>
        <div className="tour-card-footer">
          <div className="tour-price-box">
            <span className="tour-price-value">{tour.price}</span>
            <span className="tour-price-unit">/Per person</span>
          </div>
          <button
            type="button"
            className="btn-book-tour"
            onClick={(e) => { e.stopPropagation(); onBookTour && onBookTour(tour.title, tour.price); }}
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

      {/* Left-to-Right Auto-Scrolling Marquee Track */}
      <div className="tours-marquee-container">
        <div className="tours-marquee-track">
          {tours.map((tour) => renderTourCard(tour, 't1'))}
          {tours.map((tour) => renderTourCard(tour, 't2'))}
        </div>
      </div>

      <div className="section-readmore-footer">
        <a href="/tours" className="section-footer-readmore-link">VIEW ALL TOURS</a>
      </div>
    </section>
  );
}
