/**
 * AIR DREAM TRAVEL & TOURISM - CENTRALIZED STATE STORE (localStorage + API Sync)
 * Enables complete dynamic editing across Website and Admin Dashboard.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AirDreamStore = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const STORAGE_KEY = 'air_dream_site_data_v2';

  // Master Initial Defaults (Embedded directly so file:// protocol works offline with 0 CORS issues)
  const INITIAL_DEFAULTS = {
    wallpapers: [
      {
        id: 'slide-1',
        badge: 'Premium Flight Booking',
        badgeIcon: 'fa-plane',
        title: 'Fly Anywhere at the',
        highlight: 'Best Fares',
        desc: 'Experience seamless global connections with world-class airlines. Unlock corporate discounts, flexible baggage, and 24/7 personalized travel assistance.',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80',
        primaryBtnText: 'Book Your Flight',
        primaryBtnLink: '#packages',
        secondaryBtnText: 'Request Custom Quote'
      },
      {
        id: 'slide-2',
        badge: 'Sacred Pilgrimage',
        badgeIcon: 'fa-kaaba',
        title: 'Hajj & Umrah',
        highlight: 'Made Easy',
        desc: 'Embark on your spiritual pilgrimage with utter peace of mind. Deluxe 5-star hotels right on the Haram courtyards, luxury VIP transport, and guided Ziyarat.',
        image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=80',
        primaryBtnText: 'View Umrah Packages',
        primaryBtnLink: '#packages',
        secondaryBtnText: 'Inquire Umrah Group'
      },
      {
        id: 'slide-3',
        badge: 'Luxury Holidays',
        badgeIcon: 'fa-umbrella-beach',
        title: 'Unforgettable World',
        highlight: 'Adventures',
        desc: 'Tailor-made itineraries to Europe, Maldives, Japan, and beyond. Handpicked 5-star resorts, private chauffeured excursions, and round-the-clock concierge.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
        primaryBtnText: 'Explore Holiday Deals',
        primaryBtnLink: '#packages',
        secondaryBtnText: 'Plan Your Honeymoon'
      }
    ],
    attractions: [
      {
        id: 'att-1',
        name: 'Burj Khalifa',
        activities: '145 activities',
        price: '$95',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'att-2',
        name: 'Museum of the Future',
        activities: '92 activities',
        price: '$45',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1634148545855-32a8427fefb3?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'att-3',
        name: 'Desert Safari & Dunes',
        activities: '280 activities',
        price: '$55',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'att-4',
        name: 'The View at The Palm',
        activities: '115 activities',
        price: '$38',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'att-5',
        name: 'Dubai Frame',
        activities: '64 activities',
        price: '$22',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'att-6',
        name: 'Ain Dubai & Marina',
        activities: '48 activities',
        price: '$40',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'att-7',
        name: 'Atlantis Aquaventure',
        activities: '160 activities',
        price: '$85',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'att-8',
        name: 'Dubai Miracle Garden',
        activities: '52 activities',
        price: '$28',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1561571994-3c3915177263?auto=format&fit=crop&w=700&q=80'
      }
    ],
    tours: [
      {
        id: 'tour-1',
        title: 'Sunset Desert Safari with Barbecue Dinner at bedouin tent',
        location: 'Salalah',
        rating: 5,
        hours: '10-Hrs',
        carHours: '10-Hrs',
        guide: 'Driver-guide',
        capacity: '3',
        price: '120$',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'tour-2',
        title: 'Private Custom Made Full Day tour By 4WD',
        location: 'Salalah',
        rating: 5,
        hours: '08-Hrs',
        carHours: '08-Hrs',
        guide: 'Driver-guide',
        capacity: '3',
        price: '450$',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'tour-3',
        title: 'East Salalah Mountain Safari',
        location: 'Salalah',
        rating: 5,
        hours: '08-Hrs',
        carHours: '08-Hrs',
        guide: 'Driver-guide',
        capacity: '3',
        price: '80$',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'tour-4',
        title: 'Salalah Coastal Dolphin Watching & Snorkeling',
        location: 'Salalah',
        rating: 5,
        hours: '04-Hrs',
        carHours: '04-Hrs',
        guide: 'Driver-guide',
        capacity: '4',
        price: '65$',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'tour-5',
        title: 'West Salalah Beach & Blowholes Exploration',
        location: 'Salalah',
        rating: 5,
        hours: '06-Hrs',
        carHours: '06-Hrs',
        guide: 'Driver-guide',
        capacity: '3',
        price: '95$',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80'
      }
    ],
    transfers: [
      {
        id: 'tr-1',
        title: 'Toyota Land Cruiser – 4WD SUV',
        passengers: 4,
        luggage: 4,
        price: '65$',
        btnText: 'Book Now',
        image: 'assets/vehicles/toyota-land-cruiser.svg'
      },
      {
        id: 'tr-2',
        title: 'Toyota Prado – Premium SUV',
        passengers: 4,
        luggage: 3,
        price: '55$',
        btnText: 'Book Now',
        image: 'assets/vehicles/toyota-prado.svg'
      },
      {
        id: 'tr-3',
        title: 'Nissan Altima – Sedan Car',
        passengers: 3,
        luggage: 3,
        price: '45$',
        btnText: 'Book Now',
        image: 'assets/vehicles/nissan-altima.svg'
      },
      {
        id: 'tr-4',
        title: 'Toyota Land Cruiser – 4WD SUV',
        passengers: 4,
        luggage: 4,
        price: '65$',
        btnText: 'Book Now',
        image: 'assets/vehicles/toyota-land-cruiser.svg'
      },
      {
        id: 'tr-5',
        title: 'Mercedes V-Class – VIP Chauffeur Van',
        passengers: 7,
        luggage: 7,
        price: '120$',
        btnText: 'Book Now',
        image: 'assets/vehicles/mercedes-v-class.svg'
      }
    ],
    gallery: [
      {
        id: 'gal-1',
        title: 'Coastal Fjords of Salalah',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80',
        icon: 'fa-mountain-sun'
      },
      {
        id: 'gal-2',
        title: 'Rub Al Khali Sand Dunes',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80',
        icon: 'fa-compass'
      },
      {
        id: 'gal-3',
        title: 'Wild Dolphin Marine Sanctuary',
        image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=700&q=80',
        icon: 'fa-water'
      },
      {
        id: 'gal-4',
        title: 'Arabian Sunset Dhow Cruise',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
        icon: 'fa-sailboat'
      }
    ],
    packages: [
      {
        id: 'pkg-1',
        category: 'umrah',
        badge: 'Spiritual Journey',
        title: '5-Star VIP Executive Umrah Package',
        duration: '14 Days / 13 Nights',
        rating: 4.9,
        reviews: 320,
        inclusions: ['5-Star Makkah & Madinah Hotels', 'Direct Flights', 'Private Chauffeur GMC', 'Ziyarat Tours'],
        oldPrice: '$1,499',
        price: '$1,199',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'pkg-2',
        category: 'holidays',
        badge: 'Top Seller',
        title: 'Swiss Alps & Lakes Scenic Getaway',
        duration: '8 Days / 7 Nights',
        rating: 4.95,
        reviews: 185,
        inclusions: ['4-Star Boutique Hotels', 'Swiss Travel Pass', 'Glacier 3000 Excursion', 'Breakfast Included'],
        oldPrice: '$1,850',
        price: '$1,450',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'pkg-3',
        category: 'holidays',
        badge: 'Popular',
        title: 'Tokyo & Kyoto Cherry Blossom Highlights',
        duration: '10 Days / 9 Nights',
        rating: 4.9,
        reviews: 210,
        inclusions: ['Central Tokyo & Kyoto Hotels', 'Shinkansen Bullet Train', 'Private English Guide', 'Tea Ceremony'],
        oldPrice: '$2,200',
        price: '$1,899',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80'
      },
      {
        id: 'pkg-4',
        category: 'holidays',
        badge: 'Honeymoon Special',
        title: 'Bali Private Pool Villa & Island Escape',
        duration: '7 Days / 6 Nights',
        rating: 4.88,
        reviews: 140,
        inclusions: ['Luxury Seminyak & Ubud Villas', 'Flower Bath & Spa', 'Nusa Penida Day Trip', 'Sunset Catamaran'],
        oldPrice: '$1,150',
        price: '$899',
        btnText: 'Book Now',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        name: 'Bhavesh S',
        avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=250&q=80',
        stars: 5,
        quote: 'East Salalah mountain safari is best tour salalah and one must see Ayn aathum, Wadi Darbat, Taqa, Ja...'
      },
      {
        id: 'rev-2',
        name: 'Sarah & Thomas M.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        stars: 5,
        quote: 'The Sunset Desert Safari with barbecue dinner in the bedouin tent was the absolute highlight of our vacation! Professional guide and stunning dunes.'
      },
      {
        id: 'rev-3',
        name: 'Ahmed Al-Rashid',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
        stars: 5,
        quote: 'Airport transfer was waiting promptly with the Toyota Land Cruiser. Clean car, cold water provided, courteous driver. Flawless VIP experience.'
      },
      {
        id: 'rev-4',
        name: 'Dr. Ananya Rao',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
        stars: 5,
        quote: 'Private custom-made full day 4WD tour tailored to our pace. Ayn Athum and Wadi Darbat are sheer paradise on earth. 10/10 recommend Arabian Travel Service.'
      },
      {
        id: 'rev-5',
        name: 'Marcus Weber',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
        stars: 5,
        quote: 'Dolphin watching cruise was unbelievable. We saw pods of 30+ dolphins jumping right beside our boat. Truly unforgettable adventure!'
      }
    ],
    settings: {
      brandName: 'Air Dream Travel & Tourism',
      brandTagline: 'Fly Your Dreams',
      logoUrl: 'assets/air-dream-badge.svg',
      phone: '+971 58 833 8927',
      whatsapp: '971588338927',
      email: 'info@airdreamtravel.com',
      address: 'Suite 408, Al Barsha Horizon Tower, Sheikh Zayed Road, Dubai, UAE',
      aboutQuote: '“We, at Arabian Travel Service, cater to our clients a lifestyle at its best where they can feel the pulse of Salalah, the unseen facet of Oman, through our exclusive guided tours and other value-added services.”',
      aboutArchImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      bubble1Img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=400&q=80',
      bubble2Img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=80',
      bubble3Img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80'
    }
  };

  class Store {
    constructor() {
      this.listeners = [];
      this.initCrossTabListener();
    }

    /**
     * Get the latest data from localStorage or fallback to defaults
     */
    getData() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          // Deep merge with defaults in case of newly introduced schema fields
          return {
            wallpapers: Array.isArray(parsed.wallpapers) ? parsed.wallpapers : INITIAL_DEFAULTS.wallpapers,
            attractions: Array.isArray(parsed.attractions) ? parsed.attractions : INITIAL_DEFAULTS.attractions,
            tours: Array.isArray(parsed.tours) ? parsed.tours : INITIAL_DEFAULTS.tours,
            transfers: Array.isArray(parsed.transfers) ? parsed.transfers : INITIAL_DEFAULTS.transfers,
            gallery: Array.isArray(parsed.gallery) ? parsed.gallery : INITIAL_DEFAULTS.gallery,
            packages: Array.isArray(parsed.packages) ? parsed.packages : INITIAL_DEFAULTS.packages,
            reviews: Array.isArray(parsed.reviews) ? parsed.reviews : INITIAL_DEFAULTS.reviews,
            settings: Object.assign({}, INITIAL_DEFAULTS.settings, parsed.settings || {})
          };
        }
      } catch (e) {
        console.warn('[AirDreamStore] LocalStorage read error:', e);
      }
      return JSON.parse(JSON.stringify(INITIAL_DEFAULTS));
    }

    /**
     * Save all data to localStorage, notify listeners & attempt backend sync
     */
    saveData(data) {
      try {
        const serialized = JSON.stringify(data);
        localStorage.setItem(STORAGE_KEY, serialized);
      } catch (e) {
        console.error('[AirDreamStore] LocalStorage save error:', e);
      }

      this.notify(data);

      // Attempt async background sync to server if running
      if (typeof fetch === 'function') {
        try {
          fetch('/api/site-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          }).catch(() => { /* silent fallback */ });
        } catch (_) {}
      }

      return data;
    }

    /**
     * Reset to clean defaults
     */
    resetToDefaults() {
      localStorage.removeItem(STORAGE_KEY);
      const defaults = JSON.parse(JSON.stringify(INITIAL_DEFAULTS));
      this.saveData(defaults);
      return defaults;
    }

    /**
     * Add a new item to a collection
     */
    addItem(collection, item) {
      const data = this.getData();
      if (!Array.isArray(data[collection])) {
        data[collection] = [];
      }
      if (!item.id) {
        item.id = `${collection.slice(0, 3)}-${Date.now()}`;
      }
      data[collection].push(item);
      return this.saveData(data);
    }

    /**
     * Update an item in a collection
     */
    updateItem(collection, id, updatedFields) {
      const data = this.getData();
      if (!Array.isArray(data[collection])) return data;
      const idx = data[collection].findIndex(i => String(i.id) === String(id));
      if (idx !== -1) {
        data[collection][idx] = Object.assign({}, data[collection][idx], updatedFields);
        return this.saveData(data);
      }
      return data;
    }

    /**
     * Delete an item from a collection
     */
    deleteItem(collection, id) {
      const data = this.getData();
      if (!Array.isArray(data[collection])) return data;
      data[collection] = data[collection].filter(i => String(i.id) !== String(id));
      return this.saveData(data);
    }

    /**
     * Update site settings
     */
    updateSettings(newSettings) {
      const data = this.getData();
      data.settings = Object.assign({}, data.settings, newSettings);
      return this.saveData(data);
    }

    /**
     * Export all data as a downloadable JSON file
     */
    exportJSON() {
      const data = this.getData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `air-dream-website-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    /**
     * Import JSON data
     */
    importJSON(jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (parsed && typeof parsed === 'object') {
          return this.saveData(parsed);
        }
      } catch (err) {
        throw new Error('Invalid JSON format: ' + err.message);
      }
      return null;
    }

    /**
     * Subscribe to data changes (fires when saved in current or other tabs)
     */
    subscribe(callback) {
      this.listeners.push(callback);
      return () => {
        this.listeners = this.listeners.filter(cb => cb !== callback);
      };
    }

    notify(data) {
      this.listeners.forEach(cb => {
        try {
          cb(data);
        } catch (e) {
          console.error('[AirDreamStore] Listener callback error:', e);
        }
      });

      // Dispatch custom DOM event
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('airDreamDataUpdated', { detail: data }));
      }
    }

    initCrossTabListener() {
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('storage', (e) => {
          if (e.key === STORAGE_KEY) {
            this.notify(this.getData());
          }
        });
      }
    }
  }

  return new Store();
}));
