import React, { useState, useRef } from 'react';

const CARDS_DATA = [
  {
    id: 1,
    title: 'Worldwide Flights',
    titleFormatted: <>Worldwide <br />Flights</>,
    icon: '✈️',
    price: 'From $299',
    desc: 'Book cheap international flights with top airlines: Emirates, Qatar Airways, Etihad, Saudi, FlyDubai, Air Arabia & more. Best fares guaranteed with flexible cancellation.',
    image: '/assets/cards/card1.png',
    fallback: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 2,
    title: 'VIP Umrah Packages',
    titleFormatted: <>VIP Umrah <br />Packages</>,
    icon: '🕌',
    price: 'From $799',
    desc: 'Complete 5-star Umrah packages including return flights, Haram-view hotel, Ziyarat tours, visa processing, and dedicated group guide — all inclusive.',
    image: '/assets/cards/card2.jpg',
    fallback: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 3,
    title: 'Holiday Tours',
    titleFormatted: <>Holiday <br />Tours</>,
    icon: '🌴',
    price: 'From $599',
    desc: 'Customized family & honeymoon tour packages to Maldives, Bali, Turkey, Europe, Malaysia, Thailand & beyond. Hotel + flights + transfers included.',
    image: '/assets/cards/card3.jpg',
    fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 4,
    title: 'Visa Assistance',
    titleFormatted: <>Visa <br />Assistance</>,
    icon: '🛂',
    price: 'From $49',
    desc: 'Fast visa processing for Schengen, UK, US, UAE, Saudi, Oman & GCC. Document checklist, expert review, and real-time status updates — 95% success rate.',
    image: '/assets/cards/card4.jpg',
    fallback: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 5,
    title: 'Dubai Experiences',
    titleFormatted: <>Dubai <br />Experiences</>,
    icon: '🏙️',
    price: 'From $55',
    desc: 'Desert safari, Burj Khalifa, dhow cruise, Global Village, theme parks and more. Private & group tours available daily. Hotel pickups included.',
    image: '/assets/cards/card5.jpg',
    fallback: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 6,
    title: 'Airport Transfers',
    titleFormatted: <>Airport <br />Transfers</>,
    icon: '🚗',
    price: 'From $45',
    desc: 'VIP airport pick-up and drop-off with Toyota Land Cruiser, Prado, Mercedes V-Class & more. Professional chauffeurs, meet & greet, 24/7 availability.',
    image: '/assets/cards/card6.jpg',
    fallback: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80'
  }
];

export default function NewSingleLineCards({ onBookTrip }) {
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const trackRef = useRef(null);

  const handleCardClick = (index, cardElement, e) => {
    if (e.target.closest('.card-second-opened') && !e.target.closest('.card-close-x')) {
      return;
    }
    if (openCardIndex === index) {
      setOpenCardIndex(null);
    } else {
      setOpenCardIndex(index);
      setTimeout(() => {
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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
            Why Choose <span className="text-sky">Air Dream</span><br />Travel &amp; Tourism?
          </h2>
          <p className="section-subtitle" style={{ marginTop: '10px', fontSize: '0.95rem', color: '#64748B' }}>
            Explore our premium travel services &bull; Click any card to view full details
          </p>
          <div className="mobile-swipe-hint">
            <i className="fa-solid fa-arrow-pointer"></i>
            <span>Tap any card to view full details</span>
          </div>
        </div>

        {/* Cards Container */}
        <div className="single-line-carousel-wrapper">
          <div className="single-line-cards-track" ref={trackRef} id="singleLineCardsTrack">
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
                            onBookTrip && onBookTrip(card.title, card.price);
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
