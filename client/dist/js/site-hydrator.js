/**
 * AIR DREAM TRAVEL & TOURISM - LIVE SITE HYDRATOR
 * Reads data from AirDreamStore and dynamically hydrates all editable sections
 * (Wallpapers, Dubai Attractions, Tour-Trips, Airport Transfers, Gallery, Reviews, Settings)
 * and listens for cross-tab updates from admin.html.
 */

(function () {
  function hydrateSite() {
    if (typeof AirDreamStore === 'undefined') return;
    const data = AirDreamStore.getData();

    // 1. Hydrate Wallpapers / Hero Slides
    hydrateWallpapers(data.wallpapers || []);

    // 2. Hydrate Top Dubai Attractions
    hydrateAttractions(data.attractions || []);

    // 3. Hydrate Tour - Trips (Salalah)
    hydrateTours(data.tours || []);

    // 4. Hydrate Airport Transfers
    hydrateTransfers(data.transfers || []);

    // 5. Hydrate Featured & Umrah Packages
    hydratePackages(data.packages || []);

    // 6. Hydrate Photo Gallery
    hydrateGallery(data.gallery || []);

    // 7. Hydrate Traveler Reviews
    hydrateReviews(data.reviews || []);

    // 8. Hydrate Site Settings & Contact Info
    hydrateSettings(data.settings || {});
  }

  // 1. Hero Wallpapers
  function hydrateWallpapers(wallpapers) {
    const track = document.querySelector('#heroSlider .hero-slider-track');
    if (!track || !wallpapers.length) return;

    track.innerHTML = wallpapers.map((w, idx) => `
      <div class="hero-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <div class="hero-slide-bg" style="background-image: url('${w.image}');"></div>
        <div class="hero-overlay"></div>
        <div class="container">
          <div class="hero-content">
            <div class="hero-badge">
              <i class="fa-solid ${w.badgeIcon || 'fa-plane'}"></i> ${escapeHtml(w.badge || 'Premium Travel')}
            </div>
            <h1 class="hero-title">
              ${escapeHtml(w.title || '')} <span class="highlight-text">${escapeHtml(w.highlight || '')}</span>
            </h1>
            <p class="hero-desc">
              ${escapeHtml(w.desc || '')}
            </p>
            <div class="hero-btns">
              <a href="${escapeHtml(w.primaryBtnLink || '#packages')}" class="btn btn-gold">
                <i class="fa-solid fa-ticket"></i> ${escapeHtml(w.primaryBtnText || 'Book Now')}
              </a>
              <button type="button" class="btn btn-outline-white open-quote-modal-btn">
                <i class="fa-solid fa-file-invoice"></i> ${escapeHtml(w.secondaryBtnText || 'Request Custom Quote')}
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Re-bind quote modal triggers if created dynamically
    bindQuoteModalBtns();

    // Re-initialize dots if initHeroSlider exists
    if (typeof window.initHeroSlider === 'function') {
      window.initHeroSlider();
    }
  }

  // 2. Top Dubai Attractions Marquee (Set 1 + Set 2 for seamless left-to-right loop)
  function hydrateAttractions(attractions) {
    const track = document.querySelector('#attractions .attractions-marquee-track');
    if (!track || !attractions.length) return;

    const renderCard = (a, isDuplicate = false) => `
      <div class="attraction-card" ${isDuplicate ? 'aria-hidden="true"' : ''} onclick="openBookingModalWithPackage('${escapeJs(a.name)}', '${escapeJs(a.price || '$45')}')">
        <div class="attraction-img-wrapper">
          <img src="${a.image}" alt="${escapeHtml(a.name)}" class="attraction-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80'">
        </div>
        <div class="attraction-info">
          <h3 class="attraction-name">${escapeHtml(a.name)}</h3>
          <p class="attraction-activities">${escapeHtml(a.activities || 'Activities available')}</p>
          <div class="attraction-card-footer">
            <div class="tour-price-box">
              <span class="tour-price-value">${escapeHtml(a.price || '$45')}</span>
              <span class="tour-price-unit">/person</span>
            </div>
            <button type="button" class="btn-book-tour">${escapeHtml(a.btnText || 'Book Now')}</button>
          </div>
        </div>
      </div>
    `;

    // Render Set 1 followed by Set 2
    const set1 = attractions.map(a => renderCard(a, false)).join('');
    const set2 = attractions.map(a => renderCard(a, true)).join('');
    track.innerHTML = set1 + set2;
  }

  // 3. Tour - Trips Marquee
  function hydrateTours(tours) {
    const track = document.querySelector('#tours .tours-marquee-track');
    if (!track || !tours.length) return;

    const renderCard = (t, isDuplicate = false) => `
      <div class="tour-trip-card" ${isDuplicate ? 'aria-hidden="true"' : ''} onclick="openBookingModalWithPackage('${escapeJs(t.title)}', '${escapeJs(t.price || '120$')}')">
        <div class="tour-card-img-wrap">
          <img src="${t.image}" alt="${escapeHtml(t.title)}" class="tour-card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80'">
        </div>
        <div class="tour-card-body">
          <div class="tour-card-header-meta">
            <span class="tour-location-tag"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(t.location || 'Salalah')}</span>
            <span class="tour-rating-stars">${t.rating || 5} <i class="fa-solid fa-star"></i></span>
          </div>
          <h3 class="tour-card-title">${escapeHtml(t.title)}</h3>
          <div class="tour-card-grid-meta">
            <div class="tour-meta-item"><i class="fa-regular fa-clock"></i> ${escapeHtml(t.duration || '08-Hrs')}</div>
            <div class="tour-meta-item"><i class="fa-solid fa-car-side"></i> ${escapeHtml(t.duration || '08-Hrs')}</div>
            <div class="tour-meta-item"><i class="fa-solid fa-user-tie"></i> ${escapeHtml(t.driver || 'Driver-guide')}</div>
            <div class="tour-meta-item"><i class="fa-solid fa-users"></i> ${t.passengers || 3}</div>
          </div>
          <div class="tour-card-footer">
            <div class="tour-price-box">
              <span class="tour-price-value">${escapeHtml(t.price || '120$')}</span>
              <span class="tour-price-unit">/Per person</span>
            </div>
            <button type="button" class="btn-book-tour">${escapeHtml(t.btnText || 'Book Now')}</button>
          </div>
        </div>
      </div>
    `;

    const set1 = tours.map(t => renderCard(t, false)).join('');
    const set2 = tours.map(t => renderCard(t, true)).join('');
    track.innerHTML = set1 + set2;
  }

  // 4. Airport Transfers Marquee
  function hydrateTransfers(transfers) {
    const track = document.querySelector('#transfers .transfers-marquee-track');
    if (!track || !transfers.length) return;

    const renderCard = (tr, isDuplicate = false) => `
      <div class="transfer-vehicle-card" ${isDuplicate ? 'aria-hidden="true"' : ''} onclick="openBookingModalWithPackage('Airport Transfer - ${escapeJs(tr.title)}', '${escapeJs(tr.price || '55$')}')">
        <div class="transfer-vehicle-img-wrap">
          <img src="${tr.image}" alt="${escapeHtml(tr.title)}" class="transfer-vehicle-img" loading="lazy" onerror="this.src='assets/vehicles/toyota-land-cruiser.svg'">
        </div>
        <h3 class="transfer-vehicle-title">${escapeHtml(tr.title)}</h3>
        <div class="transfer-vehicle-specs">
          <span class="transfer-spec-item"><i class="fa-solid fa-users"></i> : ${tr.passengers || 4}</span>
          <span class="transfer-spec-item"><i class="fa-solid fa-suitcase"></i> : ${tr.luggage || 3}</span>
        </div>
        <div class="transfer-price-row">
          <span class="transfer-price-val">${escapeHtml(tr.price || '55$')}</span>
          <span class="transfer-price-sub">/Per person</span>
        </div>
        <button type="button" class="btn-book-tour" style="width:100%;">${escapeHtml(tr.btnText || 'Book Now')}</button>
      </div>
    `;

    const set1 = transfers.map(tr => renderCard(tr, false)).join('');
    const set2 = transfers.map(tr => renderCard(tr, true)).join('');
    track.innerHTML = set1 + set2;
  }

  // 5. Featured & Umrah Packages Slider
  function hydratePackages(packages) {
    const track = document.getElementById('packagesTrack');
    if (!track || !packages.length) return;

    track.innerHTML = packages.map(pkg => `
      <article class="package-card" data-category="${escapeHtml(pkg.category || 'tours')}">
        <div class="package-image-holder">
          <img src="${pkg.image}" alt="${escapeHtml(pkg.title)}" class="package-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=700&q=80'">
          <span class="package-badge-tag ${pkg.badge && pkg.badge.toLowerCase().includes('seller') ? 'gold' : ''}">${escapeHtml(pkg.badge || 'Featured')}</span>
          <span class="package-duration-tag"><i class="fa-regular fa-clock"></i> ${escapeHtml(pkg.duration || '7 Days')}</span>
        </div>
        <div class="package-body">
          <div>
            <div class="package-rating-row">
              <span class="package-category">${escapeHtml(pkg.category === 'umrah' ? 'Hajj & Umrah' : 'Holiday Tour')}</span>
              <div class="package-stars">
                ${'<i class="fa-solid fa-star"></i>'.repeat(Math.min(5, Math.max(1, Math.round(pkg.rating || 5))))}
                <span class="package-score">${pkg.rating || '5.0'} (${pkg.reviews || 120})</span>
              </div>
            </div>
            <h3 class="package-title">${escapeHtml(pkg.title)}</h3>
            <div class="package-inclusions">
              ${(pkg.inclusions || []).map(inc => `<span class="inclusion-pill"><i class="fa-solid fa-check"></i> ${escapeHtml(inc)}</span>`).join('')}
            </div>
          </div>
          <div class="package-footer">
            <div class="package-price-wrap">
              <span class="price-sub">Starting from</span>
              <span class="price-val">${escapeHtml(pkg.price || '$999')} <span>/ person</span></span>
            </div>
            <button type="button" class="btn-book-tour" onclick="openBookingModalWithPackage('${escapeJs(pkg.title)}', '${escapeJs(pkg.price || '$999')}')">
              ${escapeHtml(pkg.btnText || 'Book Now')}
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Re-bind package slider controls
    if (typeof window.initPackagesSlider === 'function') {
      window.initPackagesSlider();
    }
  }

  // 6. Photo Gallery Grid
  function hydrateGallery(gallery) {
    const grid = document.querySelector('#gallery .salalah-gallery-grid');
    if (!grid || !gallery.length) return;

    grid.innerHTML = gallery.map(g => `
      <div class="salalah-gallery-card" onclick="openBookingModalWithPackage('${escapeJs(g.title)}', 'Inquire')">
        <img src="${g.image}" alt="${escapeHtml(g.title)}" class="salalah-gallery-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80'">
        <div class="gallery-card-hover-overlay">
          <i class="fa-solid ${g.icon || 'fa-camera'} gallery-hover-icon"></i>
          <span class="gallery-hover-text">${escapeHtml(g.title)}</span>
        </div>
      </div>
    `).join('');
  }

  // 6. Traveler Reviews Marquee
  function hydrateReviews(reviews) {
    const track = document.querySelector('#testimonials .reviews-marquee-track');
    if (!track || !reviews.length) return;

    const renderCard = (rev, isDuplicate = false) => `
      <div class="review-item-card" ${isDuplicate ? 'aria-hidden="true"' : ''}>
        <div class="review-avatar-wrap">
          <img src="${rev.avatar}" alt="${escapeHtml(rev.name)}" class="review-avatar-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=250&q=80'">
        </div>
        <div class="review-content-wrap">
          <h4 class="review-author-name">${escapeHtml(rev.name)}</h4>
          <div class="review-stars-row">
            ${'<i class="fa-solid fa-star"></i>'.repeat(rev.stars || 5)}
          </div>
          <p class="review-quote-text">
            &ldquo;${escapeHtml(rev.quote || '')}&rdquo;
          </p>
        </div>
      </div>
    `;

    const set1 = reviews.map(r => renderCard(r, false)).join('');
    const set2 = reviews.map(r => renderCard(r, true)).join('');
    track.innerHTML = set1 + set2;
  }

  // 7. Site Settings & Contact Info
  function hydrateSettings(settings) {
    // Phone
    if (settings.phone) {
      document.querySelectorAll('.top-bar-phone-link span, a[href^="tel:"]').forEach(el => {
        if (el.tagName === 'A') el.href = `tel:${settings.phone.replace(/\s+/g, '')}`;
        if (el.querySelector('span')) el.querySelector('span').textContent = settings.phone;
        else if (el.tagName === 'SPAN') el.textContent = settings.phone;
      });
    }

    // WhatsApp
    if (settings.whatsapp) {
      const cleanWa = settings.whatsapp.replace(/[^0-9]/g, '');
      document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
        el.href = `https://wa.me/${cleanWa}`;
      });
    }

    // Email
    if (settings.email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
        el.href = `mailto:${settings.email}`;
      });
    }

    // About quote
    if (settings.aboutQuote) {
      const quoteEl = document.querySelector('.about-us-quote');
      if (quoteEl) quoteEl.textContent = settings.aboutQuote;
    }

    // About main arch image
    if (settings.aboutArchImg) {
      const archImg = document.querySelector('.about-arch-img');
      if (archImg) archImg.src = settings.aboutArchImg;
    }

    // Navbar Brand Logo image
    if (settings.logoUrl) {
      document.querySelectorAll('.air-dream-header-badge, .air-dream-brand img, .admin-navbar-logo').forEach(el => {
        el.src = settings.logoUrl;
      });
    }

    // About Us Bubbles
    if (settings.bubble1Img) {
      const b1 = document.querySelector('.about-bubble-1 img');
      if (b1) b1.src = settings.bubble1Img;
    }
    if (settings.bubble2Img) {
      const b2 = document.querySelector('.about-bubble-2 img');
      if (b2) b2.src = settings.bubble2Img;
    }
    if (settings.bubble3Img) {
      const b3 = document.querySelector('.about-bubble-3 img');
      if (b3) b3.src = settings.bubble3Img;
    }
  }

  // Helper function to rebind quote modal triggers
  function bindQuoteModalBtns() {
    document.querySelectorAll('.open-quote-modal-btn').forEach(btn => {
      btn.onclick = () => {
        const modal = document.getElementById('quoteModal');
        if (modal) modal.classList.add('open');
      };
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeJs(str) {
    if (!str) return '';
    return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrateSite);
  } else {
    hydrateSite();
  }

  // Listen for real-time store updates
  if (typeof AirDreamStore !== 'undefined') {
    AirDreamStore.subscribe(hydrateSite);
  }
  window.addEventListener('airDreamDataUpdated', hydrateSite);

  // Expose global refresh function
  window.refreshAirDreamSite = hydrateSite;
})();
