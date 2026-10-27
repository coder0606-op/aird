import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useAutoManualScroll } from '../hooks/useAutoManualScroll';
import ScrollControlBar from './ScrollControlBar';
import api from '../utils/api';

const DEFAULT_VEHICLES = [
  {
    id: 'tr-1',
    title: 'Toyota Land Cruiser – 4WD SUV',
    passengers: 4,
    luggage: 4,
    price: '$65',
    image: '/assets/vehicles/toyota-land-cruiser.svg'
  },
  {
    id: 'tr-2',
    title: 'Toyota Prado – Premium SUV',
    passengers: 4,
    luggage: 3,
    price: '$55',
    image: '/assets/vehicles/toyota-prado.svg'
  },
  {
    id: 'tr-3',
    title: 'Nissan Altima – Sedan Car',
    passengers: 3,
    luggage: 3,
    price: '$45',
    image: '/assets/vehicles/nissan-altima.svg'
  },
  {
    id: 'tr-4',
    title: 'Toyota Land Cruiser – 4WD SUV',
    passengers: 4,
    luggage: 4,
    price: '$65',
    image: '/assets/vehicles/toyota-land-cruiser.svg'
  },
  {
    id: 'tr-5',
    title: 'Mercedes V-Class – VIP Chauffeur Van',
    passengers: 7,
    luggage: 7,
    price: '$120',
    image: '/assets/vehicles/mercedes-v-class.svg'
  }
];

export default function AirportTransferSection({ onBookTransfer }) {
  const { siteData } = useSiteData();
  const [transfers, setTransfers] = useState(() => {
    if (siteData?.transfers && siteData.transfers.length > 0) {
      return siteData.transfers;
    }
    return DEFAULT_VEHICLES;
  });

  const {
    scrollPrev,
    scrollNext,
    hasDragged,
    containerProps
  } = useAutoManualScroll({ speed: 1.0, cardWidth: 306, setsCount: 4 });

  const mapTransfer = (v, idx) => ({
    id: v.id || v._id || idx,
    title: v.title || 'VIP Transfer Fleet',
    passengers: v.passengers || 4,
    luggage: v.luggage || 3,
    price: v.price
      ? (typeof v.price === 'string' ? (v.price.includes('$') ? v.price : `$${v.price}`) : `$${v.price}`)
      : '$65',
    image: v.image || DEFAULT_VEHICLES[idx % DEFAULT_VEHICLES.length].image
  });

  useEffect(() => {
    if (siteData?.transfers && siteData.transfers.length > 0) {
      setTransfers(siteData.transfers.map(mapTransfer));
    }
  }, [siteData?.transfers]);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e?.detail?.transfers && Array.isArray(e.detail.transfers)) {
        setTransfers(e.detail.transfers.map(mapTransfer));
      } else {
        try {
          const stored = localStorage.getItem('air_dream_site_data_v2');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.transfers?.length > 0) {
              setTransfers(parsed.transfers.map(mapTransfer));
              return;
            }
          }
        } catch (err) {}

        api.get('/transfers')
          .then((res) => {
            if (res.data?.length > 0) {
              setTransfers(res.data.map(mapTransfer));
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

  const renderCard = (v, keyPrefix) => (
    <div
      key={`${keyPrefix}-${v.id}`}
      className="transfer-vehicle-card"
      onClick={() => {
        if (!hasDragged()) {
          onBookTransfer && onBookTransfer(v.title, v.price);
        }
      }}
    >
      <div className="transfer-vehicle-img-wrap">
        <img
          src={v.image}
          alt={v.title}
          className="transfer-vehicle-img"
          loading="lazy"
        />
      </div>
      <h3 className="transfer-vehicle-title">{v.title}</h3>
      <div className="transfer-vehicle-specs">
        <span className="transfer-spec-item">
          <i className="fa-solid fa-users"></i> : {v.passengers} Pax
        </span>
        <span className="transfer-spec-item">
          <i className="fa-solid fa-suitcase"></i> : {v.luggage} Bags
        </span>
      </div>
      <div className="transfer-price-row">
        <span className="transfer-price-val">{v.price}</span>
        <span className="transfer-price-sub">/transfer</span>
      </div>
      <button
        type="button"
        className="btn-book-tour"
        style={{ width: '100%', marginTop: '8px' }}
        onClick={(e) => {
          e.stopPropagation();
          if (onBookTransfer) onBookTransfer(v.title, v.price);
        }}
      >
        Book Now
      </button>
    </div>
  );

  return (
    <section className="airport-transfer-section" id="transfers">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div className="section-badge-center" style={{ margin: 0 }}>
            <span className="pill-badge-outline">Airport transfer</span>
          </div>
          <ScrollControlBar
            onPrev={scrollPrev}
            onNext={scrollNext}
          />
        </div>
      </div>

      <div className="transfers-marquee-container" {...containerProps}>
        <div className="transfers-marquee-track">
          {transfers.map((v) => renderCard(v, 'v1'))}
          {transfers.map((v) => renderCard(v, 'v2'))}
          {transfers.map((v) => renderCard(v, 'v3'))}
          {transfers.map((v) => renderCard(v, 'v4'))}
        </div>
      </div>

      <div className="section-readmore-footer">
        <button
          type="button"
          className="section-footer-readmore-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() =>
            onBookTransfer && onBookTransfer('Airport VIP Transfer', 'from $45')
          }
        >
          BOOK TRANSFER
        </button>
      </div>
    </section>
  );
}
