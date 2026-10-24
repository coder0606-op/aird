import React from 'react';

const PARTNERS = [
  {
    name: 'SereneAir',
    displayName: 'SereneAir',
    logo: '/assets/partners/serene-air.svg',
    className: 'partner-logo-serene'
  },
  {
    name: 'Kingdom of Saudi Arabia Emblem',
    displayName: 'Saudi Arabia',
    logo: '/assets/partners/saudi-emblem.svg',
    className: 'partner-logo-saudi'
  },
  {
    name: 'flynas',
    displayName: 'flynas',
    logo: '/assets/partners/flynas.svg',
    className: 'partner-logo-flynas'
  },
  {
    name: 'SAUDIA',
    displayName: 'SAUDIA',
    logo: '/assets/partners/saudia.svg',
    className: 'partner-logo-saudia'
  },
  {
    name: 'Emirates',
    displayName: 'Emirates',
    logo: '/assets/partners/emirates.svg',
    className: 'partner-logo-emirates'
  },
  {
    name: 'Qatar Airways',
    displayName: 'Qatar Airways',
    logo: '/assets/partners/qatar-airways.svg',
    className: 'partner-logo-qatar'
  },
  {
    name: 'Etihad Airways',
    displayName: 'Etihad Airways',
    logo: '/assets/partners/etihad.svg',
    className: 'partner-logo-etihad'
  },
  {
    name: 'flydubai',
    displayName: 'flydubai',
    logo: '/assets/partners/flydubai.svg',
    className: 'partner-logo-flydubai'
  },
  {
    name: 'Air Arabia',
    displayName: 'Air Arabia',
    logo: '/assets/partners/air-arabia.svg',
    className: 'partner-logo-airarabia'
  },
  {
    name: 'Gulf Air',
    displayName: 'Gulf Air',
    logo: '/assets/partners/gulf-air.svg',
    className: 'partner-logo-gulfair'
  }
];

export default function PartnersSection() {
  return (
    <section className="partners-section" id="partners">
      <div className="partners-marquee-container">
        <div className="partners-carousel-track">
          {/* First set of airline partners */}
          {PARTNERS.map((partner, index) => (
            <div key={`p1-${index}`} className="partner-card">
              <img
                src={partner.logo}
                alt={partner.name}
                className={`partner-logo ${partner.className || ''}`}
              />
              <span className="partner-airline-name">{partner.displayName}</span>
            </div>
          ))}

          {/* Duplicate set for seamless left-to-right infinite loop */}
          {PARTNERS.map((partner, index) => (
            <div key={`p2-${index}`} className="partner-card" aria-hidden="true">
              <img
                src={partner.logo}
                alt={partner.name}
                className={`partner-logo ${partner.className || ''}`}
              />
              <span className="partner-airline-name">{partner.displayName}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
