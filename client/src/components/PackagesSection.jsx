import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const DEFAULT_PACKAGES = [
  {
    id: 1,
    category: 'tours',
    title: 'Dubai Luxury Skyline & Red Dune Desert Safari',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    badgeClass: 'gold',
    duration: '5 Days / 4 Nights',
    ratingCategory: 'Holiday Escape',
    rating: 4.9,
    reviews: 128,
    inclusions: [
      { icon: 'fa-hotel', text: '5-Star Hotel' },
      { icon: 'fa-car', text: 'VIP Transfers' },
      { icon: 'fa-utensils', text: 'Daily Breakfast' }
    ],
    price: '$649'
  },
  {
    id: 2,
    category: 'umrah',
    title: 'Executive 5-Star Umrah Package (Front of Haram)',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    badge: 'Spiritual VIP',
    badgeClass: '',
    duration: '10 Days / 9 Nights',
    ratingCategory: 'Hajj & Umrah',
    rating: 5.0,
    reviews: 340,
    inclusions: [
      { icon: 'fa-plane', text: 'Return Flights' },
      { icon: 'fa-hotel', text: 'Clock Tower Hotel' },
      { icon: 'fa-passport', text: 'Umrah Visa' }
    ],
    price: '$1,199'
  },
  {
    id: 3,
    category: 'tours',
    title: 'Bali Tropical Paradise, Ubud & Nusa Penida Island',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    badge: 'Trending',
    badgeClass: 'gold',
    duration: '7 Days / 6 Nights',
    ratingCategory: 'Tropical Holiday',
    rating: 4.8,
    reviews: 95,
    inclusions: [
      { icon: 'fa-house-chimney-window', text: 'Pool Villa' },
      { icon: 'fa-ship', text: 'Speedboat Cruise' },
      { icon: 'fa-spa', text: 'Balinese Spa' }
    ],
    price: '$899'
  },
  {
    id: 4,
    category: 'flights',
    title: 'Roundtrip Dubai to London Heathrow (Emirates)',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    badge: 'Direct Flight',
    badgeClass: '',
    duration: 'Flexible Return',
    ratingCategory: 'International Air',
    rating: 4.9,
    reviews: 210,
    inclusions: [
      { icon: 'fa-plane-departure', text: 'Direct Emirates' },
      { icon: 'fa-suitcase', text: '2x 23kg Luggage' },
      { icon: 'fa-utensils', text: 'Gourmet Dining' }
    ],
    price: '$580'
  },
  {
    id: 5,
    category: 'tours',
    title: 'Swiss Alps Panoramic Trains, Zurich & Interlaken',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    badge: 'Luxury Alpine',
    badgeClass: '',
    duration: '8 Days / 7 Nights',
    ratingCategory: 'Scenic Escapes',
    rating: 4.9,
    reviews: 112,
    inclusions: [
      { icon: 'fa-train-subway', text: 'Glacier Express' },
      { icon: 'fa-hotel', text: '4-Star Alpine Lodge' },
      { icon: 'fa-cable-car', text: 'Jungfrau Pass' }
    ],
    price: '$1,450'
  },
  {
    id: 6,
    category: 'flights',
    title: 'Roundtrip Dubai to New York JFK (Etihad Airways)',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    badge: 'Special Fare',
    badgeClass: 'gold',
    duration: '1 Stop &bull; Fast Transit',
    ratingCategory: 'International Air',
    rating: 4.8,
    reviews: 84,
    inclusions: [
      { icon: 'fa-plane', text: 'Etihad Airways' },
      { icon: 'fa-tv', text: 'Full Entertainment' },
      { icon: 'fa-clock', text: 'Flexible Dates' }
    ],
    price: '$790'
  }
];

export default function PackagesSection({ onBookPackage }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);

  useEffect(() => {
    api.get('/travel-deals')
      .then((res) => {
        if (res.data?.length > 0) {
          const apiDeals = res.data.map((item, idx) => ({
            id: item._id || idx,
            category: item.category || 'tours',
            title: item.title,
            image: item.image || DEFAULT_PACKAGES[idx % DEFAULT_PACKAGES.length].image,
            badge: item.badge || 'Featured',
            badgeClass: 'gold',
            duration: item.duration
              ? `${item.duration.days || 5} Days / ${item.duration.nights || 4} Nights`
              : '5 Days / 4 Nights',
            ratingCategory: item.tag || 'Special Deal',
            rating: 4.9,
            reviews: 50 + idx * 12,
            inclusions: [
              { icon: 'fa-hotel', text: 'Hotel Included' },
              { icon: 'fa-car', text: 'Transfers' },
              { icon: 'fa-certificate', text: 'Guided Tour' }
            ],
            price: item.price ? (item.price.startsWith('$') ? item.price : `$${item.price}`) : '$699'
          }));
          setPackages(apiDeals);
        }
      })
      .catch(() => {});
  }, []);

  const filtered =
    activeFilter === 'all'
      ? packages
      : packages.filter((p) => p.category === activeFilter);

  return (
    <section className="section-padding packages-section" id="packages">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-suitcase-rolling"></i> Handpicked Getaways
          </div>
          <h2 className="section-title">
            Popular Destinations &amp; <span className="script-accent">Featured Packages</span>
          </h2>
          <p className="section-subtitle">
            Browse our top-rated international flights, sacred Umrah pilgrimages, and tailor-made worldwide holiday escapes.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="package-filter-tabs">
          <button
            type="button"
            className={`filter-pill-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Packages
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${activeFilter === 'umrah' ? 'active' : ''}`}
            onClick={() => setActiveFilter('umrah')}
          >
            Hajj &amp; Umrah
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${activeFilter === 'tours' ? 'active' : ''}`}
            onClick={() => setActiveFilter('tours')}
          >
            Holiday Tours
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${activeFilter === 'flights' ? 'active' : ''}`}
            onClick={() => setActiveFilter('flights')}
          >
            International Flights
          </button>
        </div>

        {/* Packages Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '24px'
          }}
        >
          {filtered.map((pkg) => (
            <article key={pkg.id} className="package-card" style={{ flex: 'unset' }}>
              <div className="package-image-holder">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="package-img"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {pkg.badge && (
                  <span className={`package-badge-tag ${pkg.badgeClass || ''}`}>
                    {pkg.badge}
                  </span>
                )}
                <span className="package-duration-tag">
                  <i className="fa-regular fa-clock"></i> {pkg.duration}
                </span>
              </div>

              <div className="package-body">
                <div>
                  <div className="package-rating-row">
                    <span className="package-category">{pkg.ratingCategory}</span>
                    <div className="package-stars">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <span className="package-score">
                        {pkg.rating} ({pkg.reviews})
                      </span>
                    </div>
                  </div>

                  <h3 className="package-title">{pkg.title}</h3>

                  <div className="package-inclusions">
                    {pkg.inclusions.map((inc, i) => (
                      <span key={i} className="inclusion-pill">
                        <i className={`fa-solid ${inc.icon}`}></i> {inc.text}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="package-footer">
                  <div className="package-price-wrap">
                    <span className="price-sub">Starting from</span>
                    <span className="price-val">
                      {pkg.price} <span>/ person</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn-book-tour"
                    onClick={() =>
                      onBookPackage && onBookPackage(pkg.title, pkg.price)
                    }
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
