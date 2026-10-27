import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useSiteData } from '../context/SiteDataContext';

const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: 'Bhavesh S',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    stars: 5,
    quote: 'East Salalah mountain safari is best tour salalah and one must see Ayn aathum, Wadi Darbat, Taqa, Ja... Flawless arrangement by Air Dream.'
  },
  {
    id: 2,
    name: 'Sarah & Thomas M.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    stars: 5,
    quote: 'The Sunset Desert Safari with barbecue dinner in the bedouin tent was the absolute highlight of our vacation! Professional guide and stunning dunes.'
  },
  {
    id: 3,
    name: 'Ahmed Al-Rashid',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    stars: 5,
    quote: 'Airport transfer was waiting promptly with the Toyota Land Cruiser. Clean car, cold water provided, courteous driver. Flawless VIP experience.'
  },
  {
    id: 4,
    name: 'Dr. Ananya Rao',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    stars: 5,
    quote: 'Private custom-made full day 4WD tour tailored to our pace. Ayn Athum and Wadi Darbat are sheer paradise on earth. 10/10 recommend Air Dream!'
  },
  {
    id: 5,
    name: 'Marcus Weber',
    avatar: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=250&q=80',
    stars: 5,
    quote: 'Dolphin watching cruise was unbelievable. We saw pods of 30+ dolphins jumping right beside our boat. Truly unforgettable adventure!'
  }
];

export default function ReviewsSection() {
  const { siteData } = useSiteData();
  const [reviews, setReviews] = useState(() => {
    if (siteData?.reviews && siteData.reviews.length > 0) {
      return siteData.reviews;
    }
    return DEFAULT_REVIEWS;
  });

  const mapReview = (item, idx) => ({
    id: item.id || item._id || idx,
    name: item.name || 'Happy Traveler',
    avatar:
      item.avatar ||
      item.image ||
      DEFAULT_REVIEWS[idx % DEFAULT_REVIEWS.length].avatar,
    stars: item.stars || item.rating || 5,
    quote: item.quote || item.review || item.title || 'Exceptional service and unforgettable experience.'
  });

  useEffect(() => {
    if (siteData?.reviews && siteData.reviews.length > 0) {
      setReviews(siteData.reviews.map(mapReview));
    }
  }, [siteData?.reviews]);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e?.detail?.reviews && Array.isArray(e.detail.reviews)) {
        setReviews(e.detail.reviews.map(mapReview));
      } else {
        try {
          const stored = localStorage.getItem('air_dream_site_data_v2');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.reviews?.length > 0) {
              setReviews(parsed.reviews.map(mapReview));
              return;
            }
          }
        } catch (err) {}

        api.get('/testimonials')
          .then((res) => {
            if (res.data?.length > 0) {
              setReviews(res.data.map(mapReview));
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

  const renderCard = (rev, keyPrefix) => (
    <div key={`${keyPrefix}-${rev.id}`} className="review-item-card">
      <div className="review-avatar-wrap">
        <img
          src={rev.avatar}
          alt={rev.name}
          className="review-avatar-img"
          loading="lazy"
        />
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
            Authentic guest stories &bull; Auto-scrolling left to right &bull; Hover to pause
          </p>
        </div>
      </div>

      <div className="reviews-marquee-container">
        <div className="reviews-marquee-track">
          {reviews.map((rev) => renderCard(rev, 'rev1'))}
          {reviews.map((rev) => renderCard(rev, 'rev2'))}
        </div>
      </div>
    </section>
  );
}
