import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const DEFAULT_REVIEWS = [
  { id: 1, name: 'Bhavesh S', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80', stars: 5, quote: 'Air Dream made our Dubai trip absolutely unforgettable. The desert safari was perfectly organized and the team was extremely professional.' },
  { id: 2, name: 'Sarah & Thomas M.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', stars: 5, quote: 'The Sunset Desert Safari with barbecue dinner in the bedouin tent was the absolute highlight of our vacation! Professional guide and stunning dunes.' },
  { id: 3, name: 'Ahmed Al-Rashid', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80', stars: 5, quote: 'Airport transfer was waiting promptly with the Toyota Land Cruiser. Clean car, cold water provided, courteous driver. Flawless VIP experience.' },
  { id: 4, name: 'Dr. Ananya Rao', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80', stars: 5, quote: 'Private custom-made full day tour tailored to our pace. Everything was seamlessly arranged by Air Dream Travel. 10/10 recommend!' },
  { id: 5, name: 'Marcus Weber', avatar: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=250&q=80', stars: 5, quote: 'Got my UAE tourist visa within 48 hours as promised. Very professional service. Will definitely book tours through them next time!' }
];

export default function NewReviewsSection() {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);

  useEffect(() => {
    api.get('/testimonials')
      .then(res => {
        if (res.data?.length > 0) {
          const mapped = res.data.map((item, idx) => ({
            id: item._id || idx,
            name: item.name || item.fullName,
            avatar: item.avatar || DEFAULT_REVIEWS[idx % DEFAULT_REVIEWS.length]?.avatar,
            stars: item.rating || 5,
            quote: item.review || item.message || item.text
          }));
          setReviews(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const renderReviewCard = (rev, keyPrefix) => (
    <div key={`${keyPrefix}-${rev.id}`} className="review-item-card">
      <div className="review-avatar-wrap">
        <img src={rev.avatar} alt={rev.name} className="review-avatar-img" loading="lazy" />
      </div>
      <div className="review-content-wrap">
        <h4 className="review-author-name">{rev.name}</h4>
        <div className="review-stars-row">
          {[...Array(rev.stars || 5)].map((_, i) => (
            <i key={i} className="fa-solid fa-star"></i>
          ))}
        </div>
        <p className="review-quote-text">&ldquo;{rev.quote}&rdquo;</p>
      </div>
    </div>
  );

  return (
    <section className="salalah-reviews-section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-star"></i> Traveler Reviews
          </div>
          <h2 className="section-title">
            Loved by Over <span className="script-accent">25,000+</span> Voyagers
          </h2>
          <p className="section-subtitle">
            Authentic guest stories &bull; Auto-scrolling &bull; Hover to pause
          </p>
        </div>
      </div>

      {/* Left-to-Right Infinite Auto-Scrolling Track */}
      <div className="reviews-marquee-container">
        <div className="reviews-marquee-track">
          {reviews.map((rev) => renderReviewCard(rev, 'rev1'))}
          {reviews.map((rev) => renderReviewCard(rev, 'rev2'))}
        </div>
      </div>
    </section>
  );
}
