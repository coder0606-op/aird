import React, { useState, useRef } from 'react';

const CARDS_DATA = [
  {
    id: 1,
    title: 'Global Reach',
    titleFormatted: (
      <>
        Global
        <br />
        Reach
      </>
    ),
    icon: '🌍',
    desc: 'Seamless worldwide flights & hotel packages across 150+ countries without compromising quality.',
    image: '/assets/cards/card1.png',
    fallback: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=700&q=80',
    price: '$549'
  },
  {
    id: 2,
    title: 'Seamless Ticketing',
    titleFormatted: (
      <>
        Seamless
        <br />
        Ticketing
      </>
    ),
    icon: '🎫',
    desc: 'Instant flight booking, rapid seat selection & hassle-free re-ticketing guaranteed.',
    image: '/assets/cards/card2.jpg',
    fallback: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=700&q=80',
    price: '$399'
  },
  {
    id: 3,
    title: 'Spiritual Journeys',
    titleFormatted: (
      <>
        Spiritual
        <br />
        Journeys
      </>
    ),
    icon: '🕋',
    desc: 'Certified 5-star Umrah & Hajj packages with guided Ziyarat tours and utter peace of mind.',
    image: '/assets/cards/card3.jpg',
    fallback: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80',
    price: '$1,199'
  },
  {
    id: 4,
    title: 'Visa Assistance',
    titleFormatted: (
      <>
        Visa
        <br />
        Assistance
      </>
    ),
    icon: '🛂',
    desc: 'Hassle-free visa processing with fast embassy submissions and expert support.',
    image: '/assets/cards/card4.jpg',
    fallback: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=700&q=80',
    price: '$199'
  },
  {
    id: 5,
    title: '24/7 Support',
    titleFormatted: (
      <>
        24/7
        <br />
        Support
      </>
    ),
    icon: '⏰',
    desc: 'Round-the-clock dedicated travel care & emergency assistance whenever you need it.',
    image: '/assets/cards/card5.jpg',
    fallback: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    price: '$899'
  },
  {
    id: 6,
    title: 'Competitive Fare',
    titleFormatted: (
      <>
        Competitive
        <br />
        Fare
      </>
    ),
    icon: '💰',
    desc: 'Get the best prices for your travel needs without compromising on premium quality.',
    image: '/assets/cards/card6.jpg',
    fallback: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=700&q=80',
    price: '$449'
  }
];

export default function SingleLineCards({ onBookTrip }) {
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const trackRef = useRef(null);

  const handleCardClick = (index, cardElement, e) => {
    if (
      e.target.closest('.card-second-opened') &&
      !e.target.closest('.card-close-x')
    ) {
      return;
    }

    if (openCardIndex === index) {
      setOpenCardIndex(null);
    } else {
      setOpenCardIndex(index);
      setTimeout(() => {
        if (cardElement) {
          cardElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }, 150);
    }
  };

  const handleCloseCard = (e) => {
    e.stopPropagation();
    setOpenCardIndex(null);
  };

  return (
    <section className="section-padding why-choose-section" id="why-choose">
      {/* Background Shapes */}
      <div className="curved-bg-shapes">
        <div className="bg-slant-left"></div>
        <div className="bg-diagonal-ribbon-grey"></div>
        <div className="bg-diagonal-ribbon-blue"></div>
        <div className="bg-blob-1"></div>
        <div className="bg-blob-2"></div>
      </div>

      <div className="container">
        {/* Section Heading */}
        <div className="section-header why-header-wrap">
          <h2 className="why-choose-heading">
            Why Choose <span className="text-sky">Air Dream</span>
            <br />
            Travel &amp; Tourism?
          </h2>
          <p
            className="section-subtitle"
            style={{ marginTop: '10px', fontSize: '0.95rem', color: '#64748B' }}
          >
            Explore our premium travel services &bull; Click any card to view full details
          </p>
          <div className="mobile-swipe-hint">
            <i className="fa-solid fa-arrow-pointer"></i>
            <span>Tap any card to view full details</span>
          </div>
        </div>

        {/* Cards Container */}
        <div className="single-line-carousel-wrapper">
          <div
            className="single-line-cards-track"
            ref={trackRef}
            id="singleLineCardsTrack"
          >
            {CARDS_DATA.map((card, index) => {
              const isOpen = openCardIndex === index;

              return (
                <div
                  key={card.id}
                  className={`single-line-card-item ${isOpen ? 'is-card-open' : ''}`}
                  onClick={(e) => handleCardClick(index, e.currentTarget, e)}
                  data-title={card.title}
                >
                  <div className="dual-card-stage">
                    {/* Upper / Second White Card */}
                    <div className="card-second-opened">
                      <button
                        type="button"
                        className="card-close-x"
                        onClick={handleCloseCard}
                        aria-label="Close"
                      >
                        &times;
                      </button>

                      <div className="card-second-body">
                        <div className="card-second-icon">{card.icon}</div>
                        <h3 className="card-second-title">{card.titleFormatted}</h3>
                        <p className="card-second-desc">{card.desc}</p>
                        <button
                          type="button"
                          className="btn btn-gold btn-sm card-second-cta"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onBookTrip) onBookTrip(card.title, card.price);
                          }}
                        >
                          <i className="fa-solid fa-plane-departure"></i> Book Trip ({card.price})
                        </button>
                      </div>
                    </div>

                    {/* Front Cover Card */}
                    <div className="card-front-cover">
                      <img
                        src={card.image}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = card.fallback;
                        }}
                        alt={card.title}
                        className="card-photo-img"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
