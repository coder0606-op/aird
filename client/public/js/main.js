/**
 * AIR DREAM TRAVEL & TOURISM - MAIN JAVASCRIPT
 * Handles slider, navigation, search tabs, scroll flight path, package filters, flip cards, FAQ & modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initHeroSlider();
  initSearchTabs();
  initWhyChooseCards();
  initPackagesSlider();
  initFaqAccordion();
  initModalsAndForms();
  initScrollReveals();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER & MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item a, .borderlink-nav-item, .borderlink-mobile-menu a, .borderlink-menu-actions button');

  if (!hamburgerBtn || !mobileDrawer || !mobileBackdrop) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    mobileDrawer.classList.toggle('open', isOpen);
    mobileBackdrop.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburgerBtn.addEventListener('click', () => toggleMenu());
  mobileBackdrop.addEventListener('click', () => toggleMenu(false));

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   2. HERO 3-SLIDE WALLPAPER SLIDER (AUTO-SLIDE 5s, FADE/ZOOM, SWIPE)
   -------------------------------------------------------------------------- */
let currentSlideIndex = 0;
let slideIntervalId = null;

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('sliderDotsContainer');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const heroSlider = document.getElementById('heroSlider');

  if (!slides.length) return;

  // Generate dots dynamically
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlideIndex = index;
  }

  function nextSlide() {
    const nextIdx = (currentSlideIndex + 1) % slides.length;
    goToSlide(nextIdx);
  }

  function prevSlide() {
    const prevIdx = (currentSlideIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIdx);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoSlide();
    });
  }

  function startAutoSlide() {
    if (slideIntervalId) clearInterval(slideIntervalId);
    slideIntervalId = setInterval(nextSlide, 5000); // 5 seconds
  }

  function restartAutoSlide() {
    startAutoSlide();
  }

  startAutoSlide();

  // Pause on hover
  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', () => clearInterval(slideIntervalId));
    heroSlider.addEventListener('mouseleave', () => startAutoSlide());

    // Mobile Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    heroSlider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance < 0) {
          nextSlide(); // Swiped left -> next
        } else {
          prevSlide(); // Swiped right -> prev
        }
        restartAutoSlide();
      }
    }
  }
}

/* --------------------------------------------------------------------------
   3. FLOATING SEARCH BAR & DYNAMIC TABS
   -------------------------------------------------------------------------- */
const searchTabConfig = {
  flights: {
    labelFrom: '<i class="fa-solid fa-plane-departure text-sky"></i> Flying From',
    labelTo: '<i class="fa-solid fa-plane-arrival text-sky"></i> Flying To',
    placeholderFrom: 'Origin City (e.g. Dubai, DXB)',
    placeholderTo: 'Destination (e.g. London, LHR)',
    btnText: '<i class="fa-solid fa-magnifying-glass"></i> Search Flights'
  },
  umrah: {
    labelFrom: '<i class="fa-solid fa-location-dot text-sky"></i> Departure City',
    labelTo: '<i class="fa-solid fa-kaaba text-sky"></i> Sacred Destination',
    placeholderFrom: 'Your City (e.g. Dubai, DXB)',
    placeholderTo: 'Makkah & Madinah (KSA)',
    btnText: '<i class="fa-solid fa-magnifying-glass"></i> Find Umrah Packages'
  },
  tours: {
    labelFrom: '<i class="fa-solid fa-compass text-sky"></i> Starting From',
    labelTo: '<i class="fa-solid fa-umbrella-beach text-sky"></i> Holiday Destination',
    placeholderFrom: 'Departure Point',
    placeholderTo: 'Destination (e.g. Bali, Maldives, Swiss)',
    btnText: '<i class="fa-solid fa-magnifying-glass"></i> Explore Tours'
  },
  visa: {
    labelFrom: '<i class="fa-solid fa-passport text-sky"></i> Your Nationality',
    labelTo: '<i class="fa-solid fa-globe text-sky"></i> Country Travelling To',
    placeholderFrom: 'Your Current Passport / Country',
    placeholderTo: 'Visa Destination (e.g. Schengen, UK, USA)',
    btnText: '<i class="fa-solid fa-file-signature"></i> Check Visa Options'
  }
};

let currentSearchTab = 'flights';

function initSearchTabs() {
  const tabs = document.querySelectorAll('.search-tab');
  const swapBtn = document.getElementById('swapLocationsBtn');
  const inputFrom = document.getElementById('searchFrom');
  const inputTo = document.getElementById('searchTo');
  const searchForm = document.getElementById('travelSearchForm');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabKey = tab.getAttribute('data-tab');
      setSearchTabMode(tabKey);
    });
  });

  // Swap locations button
  if (swapBtn && inputFrom && inputTo) {
    swapBtn.addEventListener('click', () => {
      const temp = inputFrom.value;
      inputFrom.value = inputTo.value;
      inputTo.value = temp;

      // Quick visual rotation animation
      swapBtn.style.transform = 'translateY(-50%) rotate(180deg)';
      setTimeout(() => {
        swapBtn.style.transform = 'translateY(-50%) rotate(0deg)';
      }, 300);
    });
  }

  // Set default departure date to tomorrow
  const dateInput = document.getElementById('searchDepartDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSearchSubmit();
    });
  }
}

function setSearchTabMode(tabKey) {
  currentSearchTab = tabKey;
  const config = searchTabConfig[tabKey] || searchTabConfig.flights;

  const labelFrom = document.getElementById('labelFrom');
  const labelTo = document.getElementById('labelTo');
  const inputFrom = document.getElementById('searchFrom');
  const inputTo = document.getElementById('searchTo');
  const searchSubmitBtn = document.getElementById('searchSubmitBtn');

  if (labelFrom) labelFrom.innerHTML = config.labelFrom;
  if (labelTo) labelTo.innerHTML = config.labelTo;
  if (inputFrom) inputFrom.placeholder = config.placeholderFrom;
  if (inputTo) inputTo.placeholder = config.placeholderTo;
  if (searchSubmitBtn) searchSubmitBtn.innerHTML = config.btnText;

  // Preset smart defaults for Umrah / Visa
  if (tabKey === 'umrah' && inputTo) {
    inputTo.value = 'Makkah & Madinah (KSA)';
  } else if (tabKey === 'visa' && inputTo) {
    inputTo.value = 'Schengen / Europe';
  }
}

function handleSearchSubmit() {
  const fromVal = document.getElementById('searchFrom')?.value || 'Dubai';
  const toVal = document.getElementById('searchTo')?.value || 'Selected Destination';
  const dateVal = document.getElementById('searchDepartDate')?.value || 'Flexible';
  const guestsVal = document.getElementById('searchGuests')?.value || '1 Adult';

  showToast(`Searching best ${currentSearchTab.toUpperCase()} deals from ${fromVal} to ${toVal}...`, 'info');

  // Open the search results modal with sample options
  setTimeout(() => {
    openSearchResultsModal(currentSearchTab, fromVal, toVal, dateVal, guestsVal);
  }, 400);
}

function openSearchResultsModal(type, from, to, date, guests) {
  const modal = document.getElementById('searchResultsModal');
  const container = document.getElementById('searchResultsContent');
  if (!modal || !container) return;

  const typeName = type.charAt(0).toUpperCase() + type.slice(1);
  container.innerHTML = `
    <div style="margin-bottom: 20px; padding: 14px 18px; background: #F0F7FF; border-radius: 12px; border: 1px solid #CDE8FF;">
      <p style="font-size: 0.88rem; color: #0A1F44; margin: 0;">
        <strong>Trip Route:</strong> ${from} ➔ ${to} &nbsp;|&nbsp; <strong>Date:</strong> ${date} &nbsp;|&nbsp; <strong>Travelers:</strong> ${guests}
      </p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 14px;">
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1.5px solid #D8ECFF; border-radius: 12px; background: #fff; flex-wrap: wrap; gap: 12px;">
        <div>
          <span style="font-size: 0.75rem; background: #0A1F44; color: #fff; padding: 2px 8px; border-radius: 100px; font-weight: 700;">RECOMMENDED</span>
          <h4 style="margin: 6px 0 2px; color: #0A1F44; font-size: 1.1rem;">Air Dream VIP ${typeName} Special</h4>
          <p style="font-size: 0.82rem; color: #516480; margin: 0;">Direct flights / 5-star hotel transfers / Full travel insurance</p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.35rem; font-weight: 800; color: #1E6FD9;">$599 <span style="font-size: 0.75rem; color: #64748b;">/person</span></div>
          <button class="btn btn-gold btn-sm" onclick="bookSearchResult('Air Dream VIP ${typeName} Special', '$599')">Select Deal</button>
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1.5px solid #D8ECFF; border-radius: 12px; background: #fff; flex-wrap: wrap; gap: 12px;">
        <div>
          <span style="font-size: 0.75rem; background: #F5B301; color: #0A1F44; padding: 2px 8px; border-radius: 100px; font-weight: 700;">BEST VALUE</span>
          <h4 style="margin: 6px 0 2px; color: #0A1F44; font-size: 1.1rem;">Saver Express ${typeName} Option</h4>
          <p style="font-size: 0.82rem; color: #516480; margin: 0;">Standard baggage / Flexible rebooking / 24/7 dedicated support</p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.35rem; font-weight: 800; color: #1E6FD9;">$449 <span style="font-size: 0.75rem; color: #64748b;">/person</span></div>
          <button class="btn btn-gold btn-sm" onclick="bookSearchResult('Saver Express ${typeName}', '$449')">Select Deal</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

window.bookSearchResult = function(name, price) {
  const modal = document.getElementById('searchResultsModal');
  if (modal) modal.classList.remove('open');
  openBookingModalWithPackage(name, price);
};

/* --------------------------------------------------------------------------
   4. "WHY CHOOSE AIR DREAM" 3D BOOK-STYLE CARDS
   (Tap / click opens card like a book, revealing inside details and Book Offer Trip button)
   -------------------------------------------------------------------------- */
function initWhyChooseCards() {
  const track = document.getElementById('singleLineCardsTrack');
  const prevBtn = document.getElementById('singleLinePrevBtn');
  const nextBtn = document.getElementById('singleLineNextBtn');

  if (!track) return;

  // Arrow navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -320, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // Smooth mouse drag-to-scroll for desktop
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    // If clicking on an open card or button, don't initiate drag
    if (e.target.closest('.card-second-opened') || e.target.closest('button')) return;
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.6;
    track.scrollLeft = scrollLeft - walk;
  });
}

let singleLineCardAutoCloseTimer = null;

window.toggleSingleLineCard = function(cardElement, event) {
  if (!cardElement) return;

  const evt = event || window.event;
  // If the user clicked inside the open white card (reading or clicking CTA), don't close
  if (evt && evt.target && evt.target.closest('.card-second-opened') && !evt.target.closest('.card-close-x')) {
    return;
  }

  const isOpen = cardElement.classList.contains('is-card-open');

  if (singleLineCardAutoCloseTimer) {
    clearTimeout(singleLineCardAutoCloseTimer);
    singleLineCardAutoCloseTimer = null;
  }

  // Close all other open cards
  document.querySelectorAll('.single-line-card-item').forEach(c => {
    c.classList.remove('is-card-open');
  });

  if (!isOpen) {
    cardElement.classList.add('is-card-open');

    // Smoothly scroll the opened card into center view so both cards are fully visible
    setTimeout(() => {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, 150);

    // Optional 12-second auto-close timer
    singleLineCardAutoCloseTimer = setTimeout(() => {
      cardElement.classList.remove('is-card-open');
      singleLineCardAutoCloseTimer = null;
    }, 12000);
  }
};

window.closeSingleLineCard = function(closeBtn) {
  if (!closeBtn) return;
  if (singleLineCardAutoCloseTimer) {
    clearTimeout(singleLineCardAutoCloseTimer);
    singleLineCardAutoCloseTimer = null;
  }
  const card = closeBtn.closest('.single-line-card-item');
  if (card) {
    card.classList.remove('is-card-open');
  }
};

// Aliases for backward compatibility
window.toggleTravelBook = window.toggleSingleLineCard;
window.closeTravelBook = window.closeSingleLineCard;

window.handleBookOfferTrip = function(offerTitle, price) {
  showToast(`Selected Offer: "${offerTitle}" (${price}). Opening reservation...`, 'info');
  setTimeout(() => {
    openBookingModalWithPackage(offerTitle, price);
  }, 300);
};

/* --------------------------------------------------------------------------
   5. POPULAR PACKAGES SLIDER & CATEGORY FILTER
   -------------------------------------------------------------------------- */
let packageCurrentIndex = 0;

function initPackagesSlider() {
  const track = document.getElementById('packagesTrack');
  const prevBtn = document.getElementById('pkgPrevBtn');
  const nextBtn = document.getElementById('pkgNextBtn');
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const cards = document.querySelectorAll('.package-card');

  if (!track) return;

  function updateSlider() {
    const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
    if (!visibleCards.length) return;

    const cardWidth = visibleCards[0].offsetWidth + 24; // width + gap
    const maxIndex = Math.max(0, visibleCards.length - getVisibleCount());
    packageCurrentIndex = Math.min(packageCurrentIndex, maxIndex);

    track.style.transform = `translateX(-${packageCurrentIndex * cardWidth}px)`;
  }

  function getVisibleCount() {
    if (window.innerWidth < 680) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
      const maxIndex = Math.max(0, visibleCards.length - getVisibleCount());
      if (packageCurrentIndex < maxIndex) {
        packageCurrentIndex++;
      } else {
        packageCurrentIndex = 0; // loop back
      }
      updateSlider();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
      const maxIndex = Math.max(0, visibleCards.length - getVisibleCount());
      if (packageCurrentIndex > 0) {
        packageCurrentIndex--;
      } else {
        packageCurrentIndex = maxIndex;
      }
      updateSlider();
    });
  }

  // Filter tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      packageCurrentIndex = 0;
      updateSlider();
    });
  });

  window.addEventListener('resize', updateSlider);
}

/* --------------------------------------------------------------------------
   7. FAQ ACCORDION INTERACTION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other accordions for clean single view
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherPanel = other.querySelector('.faq-panel');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        panel.style.maxHeight = null;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. MODALS, BOOKING, QUOTE FORMS & NEWSLETTER
   -------------------------------------------------------------------------- */
function initModalsAndForms() {
  // Quote Modal triggers
  const quoteModal = document.getElementById('quoteModal');
  const quoteBtns = document.querySelectorAll('.open-quote-modal-btn');
  const quoteCloseBtn = document.getElementById('closeQuoteModalBtn');
  const quoteForm = document.getElementById('quoteRequestForm');

  quoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quoteModal) quoteModal.classList.add('open');
    });
  });

  if (quoteCloseBtn && quoteModal) {
    quoteCloseBtn.addEventListener('click', () => quoteModal.classList.remove('open'));
  }

  // Booking Modal triggers
  const bookingModal = document.getElementById('bookingModal');
  const bookingCloseBtn = document.getElementById('closeBookingModalBtn');
  const bookingForm = document.getElementById('packageBookingForm');

  if (bookingCloseBtn && bookingModal) {
    bookingCloseBtn.addEventListener('click', () => bookingModal.classList.remove('open'));
  }

  // Close modals on overlay backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  // Handle Quote Form Submit
  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

      const formData = {
        name: quoteForm.elements['quoteName']?.value,
        email: quoteForm.elements['quoteEmail']?.value,
        phone: quoteForm.elements['quotePhone']?.value,
        serviceType: quoteForm.elements['quoteService']?.value,
        destination: quoteForm.elements['quoteDestination']?.value,
        travelDate: quoteForm.elements['quoteDate']?.value,
        travelers: quoteForm.elements['quoteTravelers']?.value,
        message: quoteForm.elements['quoteMessage']?.value
      };

      try {
        const response = await fetch('/api/quotes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const res = await response.json();
        if (res.success) {
          showToast(res.message || 'Thank you! Your quote request has been sent.', 'success');
          quoteForm.reset();
          if (quoteModal) quoteModal.classList.remove('open');
        } else {
          showToast(res.message || 'Something went wrong.', 'error');
        }
      } catch (err) {
        // Fallback for static file viewing without server running
        showToast(`Thank you, ${formData.name}! Your quote request for ${formData.serviceType} has been received. Our team will contact you shortly.`, 'success');
        quoteForm.reset();
        if (quoteModal) quoteModal.classList.remove('open');
      } finally {
        if (submitBtn) submitBtn.innerHTML = originalText;
      }
    });
  }

  // Handle Booking Form Submit
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pkgName = document.getElementById('bookingPkgNameDisplay')?.innerText || 'Package';
      const custName = bookingForm.elements['custName']?.value || 'Traveler';
      showToast(`Success! Your booking reservation for "${pkgName}" has been placed. Check your email for confirmation!`, 'success');
      bookingForm.reset();
      if (bookingModal) bookingModal.classList.remove('open');
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput?.value;

      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        showToast(data.message || 'Subscribed successfully to Air Dream VIP deals!', 'success');
      } catch (err) {
        showToast(`Welcome! ${email} has been subscribed to Air Dream VIP travel deals.`, 'success');
      }
      newsletterForm.reset();
    });
  }
}

// Global function to trigger booking modal from package card
window.openBookingModalWithPackage = function(packageName, packagePrice) {
  const modal = document.getElementById('bookingModal');
  const nameDisplay = document.getElementById('bookingPkgNameDisplay');
  const priceDisplay = document.getElementById('bookingPkgPriceDisplay');

  if (nameDisplay) nameDisplay.innerText = packageName;
  if (priceDisplay) priceDisplay.innerText = packagePrice;

  if (modal) modal.classList.add('open');
};

/* --------------------------------------------------------------------------
   9. SCROLL REVEALS & TOAST NOTIFICATION SYSTEM
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item ${type}`;

  const icon = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-circle-exclamation' : 'fa-bell');
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(60px)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

window.showToast = showToast;
