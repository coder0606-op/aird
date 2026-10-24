import React from 'react';

const GALLERY_ITEMS = [
  { id: 1, title: 'Burj Khalifa at Sunset', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80', icon: 'fa-building' },
  { id: 2, title: 'Desert Safari Adventures', img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80', icon: 'fa-compass' },
  { id: 3, title: 'Dubai Marina Dhow Cruise', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80', icon: 'fa-sailboat' },
  { id: 4, title: 'Palm Jumeirah Luxury', img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=700&q=80', icon: 'fa-mountain-sun' }
];

export default function NewGallerySection({ onOpenPhoto }) {
  return (
    <section className="salalah-gallery-section" id="gallery">
      <div className="container">
        <div className="gallery-header-wrap">
          <h2 className="gallery-main-title">Gallery</h2>
          <p className="gallery-main-subtitle">Have a look at our photo gallery and see what awaits you in Dubai &amp; UAE</p>
        </div>

        <div className="salalah-gallery-grid">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="salalah-gallery-card"
              onClick={() => onOpenPhoto && onOpenPhoto(item.title, 'Photo Gallery Preview')}
            >
              <img src={item.img} alt={item.title} className="salalah-gallery-img" loading="lazy" />
              <div className="gallery-card-hover-overlay">
                <span><i className={`fa-solid ${item.icon}`}></i> {item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
