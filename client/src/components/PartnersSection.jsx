import React from 'react';

const PARTNERS = [
  {
    name: 'Emirates',
    displayName: 'Emirates',
    tag: 'Premier Partner',
    logo: '/assets/partners/emirates.svg'
  },
  {
    name: 'Qatar Airways',
    displayName: 'Qatar Airways',
    tag: '5-Star Airline',
    logo: '/assets/partners/qatar-airways.svg'
  },
  {
    name: 'SAUDIA',
    displayName: 'SAUDIA',
    tag: 'Flag Carrier',
    logo: '/assets/partners/saudia.svg'
  },
  {
    name: 'Etihad Airways',
    displayName: 'Etihad Airways',
    tag: 'Global Partner',
    logo: '/assets/partners/etihad.svg'
  },
  {
    name: 'flydubai',
    displayName: 'flydubai',
    tag: 'Direct Partner',
    logo: '/assets/partners/flydubai.svg'
  },
  {
    name: 'Air Arabia',
    displayName: 'Air Arabia',
    tag: 'Low-Cost Pioneer',
    logo: '/assets/partners/air-arabia.svg'
  },
  {
    name: 'flynas',
    displayName: 'flynas',
    tag: 'Value Airline',
    logo: '/assets/partners/flynas.svg'
  },
  {
    name: 'Gulf Air',
    displayName: 'Gulf Air',
    tag: 'Boutique Carrier',
    logo: '/assets/partners/gulf-air.svg'
  },
  {
    name: 'SereneAir',
    displayName: 'SereneAir',
    tag: 'Domestic & Regional',
    logo: '/assets/partners/serene-air.svg'
  },
  {
    name: 'Kingdom of Saudi Arabia Emblem',
    displayName: 'Saudi Arabia',
    tag: 'Official Destination',
    logo: '/assets/partners/saudi-emblem.svg'
  }
];

export default function PartnersSection() {
  return (
    <section className="partners-section" id="partners" aria-label="Official Airline Partners">
      <div className="partners-marquee-container">
        <div className="partners-carousel-track">
          {/* First set of airline partner boxes */}
          {PARTNERS.map((partner, index) => (
            <div key={`p1-${index}`} className="partner-card">
              <div className="partner-logo-box">
                <img
                  src={partner.logo}
                  alt={`${partner.displayName} logo`}
                  className="partner-logo"
                  loading="lazy"
                />
              </div>
              <div className="partner-text-box">
                <span className="partner-airline-name">{partner.displayName}</span>
                <span className="partner-airline-tag">{partner.tag}</span>
              </div>
            </div>
          ))}

          {/* Duplicate set for seamless continuous marquee loop */}
          {PARTNERS.map((partner, index) => (
            <div key={`p2-${index}`} className="partner-card" aria-hidden="true">
              <div className="partner-logo-box">
                <img
                  src={partner.logo}
                  alt=""
                  className="partner-logo"
                  loading="lazy"
                />
              </div>
              <div className="partner-text-box">
                <span className="partner-airline-name">{partner.displayName}</span>
                <span className="partner-airline-tag">{partner.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
