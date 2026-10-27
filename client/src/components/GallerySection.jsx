import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import api from '../utils/api';

const DEFAULT_GALLERY = [
  {
    id: 'gal-1',
    title: 'Coastal Fjords & Azure Waters',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80',
    icon: 'fa-mountain-sun'
  },
  {
    id: 'gal-2',
    title: 'Rub Al Khali Red Sand Dunes',
    img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80',
    icon: 'fa-compass'
  },
  {
    id: 'gal-3',
    title: 'Wild Dolphin Watching Cruise',
    img: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=700&q=80',
    icon: 'fa-water'
  },
  {
    id: 'gal-4',
    title: 'Arabian Sunset Marina Dhow Cruise',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
    icon: 'fa-sailboat'
  }
];

export default function GallerySection({ onOpenPhoto }) {
  const { siteData } = useSiteData();
  const [gallery, setGallery] = useState(() => {
    if (siteData?.gallery && siteData.gallery.length > 0) {
      return siteData.gallery;
    }
    return DEFAULT_GALLERY;
  });

  const mapGalleryItem = (item, idx) => ({
    id: item.id || item._id || idx,
    title: item.title || item.name || 'Dubai & Beyond',
    img: item.image || item.img || DEFAULT_GALLERY[idx % DEFAULT_GALLERY.length].img,
    icon: item.icon || 'fa-camera'
  });

  useEffect(() => {
    if (siteData?.gallery && siteData.gallery.length > 0) {
      setGallery(siteData.gallery.map(mapGalleryItem));
    }
  }, [siteData?.gallery]);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e?.detail?.gallery && Array.isArray(e.detail.gallery)) {
        setGallery(e.detail.gallery.map(mapGalleryItem));
      } else {
        try {
          const stored = localStorage.getItem('air_dream_site_data_v2');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.gallery?.length > 0) {
              setGallery(parsed.gallery.map(mapGalleryItem));
              return;
            }
          }
        } catch (err) {}

        api.get('/gallery')
          .then((res) => {
            if (res.data?.length > 0) {
              setGallery(res.data.map(mapGalleryItem));
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

  return (
    <section className="salalah-gallery-section" id="gallery">
      <div className="container">
        <div className="gallery-header-wrap">
          <h2 className="gallery-main-title">Gallery</h2>
          <p className="gallery-main-subtitle">
            Have a look at our photo gallery and see what awaits you in Dubai &amp; beyond
          </p>
        </div>

        <div className="salalah-gallery-grid">
          {gallery.map((item, idx) => (
            <div
              key={item.id || idx}
              className="salalah-gallery-card"
              onClick={() =>
                onOpenPhoto && onOpenPhoto(item.title, 'Photo Gallery Preview')
              }
            >
              <img
                src={item.img}
                alt={item.title}
                className="salalah-gallery-img"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_GALLERY[idx % DEFAULT_GALLERY.length].img;
                }}
              />
              <div className="gallery-card-hover-overlay">
                <span>
                  <i className={`fa-solid ${item.icon}`}></i> {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
