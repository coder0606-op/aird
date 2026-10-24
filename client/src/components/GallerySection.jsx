import React from 'react';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Coastal Fjords & Azure Waters',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80',
    icon: 'fa-mountain-sun'
  },
  {
    id: 2,
    title: 'Rub Al Khali Red Sand Dunes',
    img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80',
    icon: 'fa-compass'
  },
  {
    id: 3,
    title: 'Wild Dolphin Watching Cruise',
    img: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=700&q=80',
    icon: 'fa-water'
  },
  {
    id: 4,
    title: 'Arabian Sunset Marina Dhow Cruise',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
    icon: 'fa-sailboat'
  }
];

export default function GallerySection({ onOpenPhoto }) {
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
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
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
