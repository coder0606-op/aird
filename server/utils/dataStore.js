const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data-store.json');

class DataStore {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('[DataStore] Warning loading data-store.json:', err.message);
    }
    return {
      wallpapers: [],
      activities: [],
      tours: [],
      transfers: [],
      travelDeals: [],
      gallery: [],
      testimonials: [],
      visas: [],
      popups: [],
      enquiries: [],
      settings: {}
    };
  }

  saveData() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('[DataStore] Error persisting to data-store.json:', err.message);
    }
  }

  get(collection) {
    if (!this.data[collection]) {
      this.data[collection] = [];
    }
    return this.data[collection];
  }

  getById(collection, id) {
    const list = this.get(collection);
    return list.find(item => String(item._id || item.id) === String(id)) || null;
  }

  add(collection, item) {
    if (!this.data[collection]) {
      this.data[collection] = [];
    }
    const id = item._id || item.id || `item_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newItem = {
      _id: id,
      id: id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...item
    };
    this.data[collection].unshift(newItem);
    this.saveData();
    return newItem;
  }

  update(collection, id, updates) {
    const list = this.get(collection);
    const index = list.findIndex(item => String(item._id || item.id) === String(id));
    if (index === -1) {
      return this.add(collection, { _id: id, ...updates });
    }
    const updated = {
      ...list[index],
      ...updates,
      _id: list[index]._id || id,
      id: list[index].id || id,
      updatedAt: new Date().toISOString()
    };
    list[index] = updated;
    this.saveData();
    return updated;
  }

  delete(collection, id) {
    if (!this.data[collection]) return false;
    const initialLen = this.data[collection].length;
    this.data[collection] = this.data[collection].filter(
      item => String(item._id || item.id) !== String(id)
    );
    const deleted = this.data[collection].length < initialLen;
    if (deleted) this.saveData();
    return deleted;
  }

  getSettings() {
    return this.data.settings || {};
  }

  updateSettings(newSettings) {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.saveData();
    return this.data.settings;
  }

  getAllContent() {
    return {
      wallpapers: this.get('wallpapers'),
      attractions: this.get('activities'),
      tours: this.get('tours'),
      transfers: this.get('transfers'),
      packages: this.get('travelDeals'),
      gallery: this.get('gallery'),
      reviews: this.get('testimonials'),
      visas: this.get('visas'),
      popups: this.get('popups'),
      whyChooseUs: this.getWhyChooseUs(),
      settings: this.getSettings()
    };
  }

  getWhyChooseUs() {
    const list = this.get('whyChooseUs');
    if (!list || list.length === 0 || list[0]?.title === 'Global Reach') {
      this.data.whyChooseUs = [
        {
          id: 'card-1',
          title: 'Worldwide Flights',
          titleFormatted: 'Worldwide Flights',
          icon: '✈️',
          price: 'From $299',
          desc: 'Book cheap international flights with top airlines: Emirates, Qatar Airways, Etihad, Saudi, FlyDubai, Air Arabia & more. Best fares guaranteed with flexible cancellation.',
          description: 'Book cheap international flights with top airlines: Emirates, Qatar Airways, Etihad, Saudi, FlyDubai, Air Arabia & more. Best fares guaranteed with flexible cancellation.',
          image: '/assets/cards/card1.png',
          fallback: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=700&q=80'
        },
        {
          id: 'card-2',
          title: 'VIP Umrah Packages',
          titleFormatted: 'VIP Umrah Packages',
          icon: '🕌',
          price: 'From $799',
          desc: 'Complete 5-star Umrah packages including return flights, Haram-view hotel, Ziyarat tours, visa processing, and dedicated group guide — all inclusive.',
          description: 'Complete 5-star Umrah packages including return flights, Haram-view hotel, Ziyarat tours, visa processing, and dedicated group guide — all inclusive.',
          image: '/assets/cards/card2.jpg',
          fallback: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=700&q=80'
        },
        {
          id: 'card-3',
          title: 'Holiday Tours',
          titleFormatted: 'Holiday Tours',
          icon: '🌴',
          price: 'From $599',
          desc: 'Customized family & honeymoon tour packages to Maldives, Bali, Turkey, Europe, Malaysia, Thailand & beyond. Hotel + flights + transfers included.',
          description: 'Customized family & honeymoon tour packages to Maldives, Bali, Turkey, Europe, Malaysia, Thailand & beyond. Hotel + flights + transfers included.',
          image: '/assets/cards/card3.jpg',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80'
        },
        {
          id: 'card-4',
          title: 'Visa Assistance',
          titleFormatted: 'Visa Assistance',
          icon: '🛂',
          price: 'From $49',
          desc: 'Fast visa processing for Schengen, UK, US, UAE, Saudi, Oman & GCC. Document checklist, expert review, and real-time status updates — 95% success rate.',
          description: 'Fast visa processing for Schengen, UK, US, UAE, Saudi, Oman & GCC. Document checklist, expert review, and real-time status updates — 95% success rate.',
          image: '/assets/cards/card4.jpg',
          fallback: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80'
        },
        {
          id: 'card-5',
          title: 'Dubai Experiences',
          titleFormatted: 'Dubai Experiences',
          icon: '🏙️',
          price: 'From $55',
          desc: 'Desert safari, Burj Khalifa, dhow cruise, Global Village, theme parks and more. Private & group tours available daily. Hotel pickups included.',
          description: 'Desert safari, Burj Khalifa, dhow cruise, Global Village, theme parks and more. Private & group tours available daily. Hotel pickups included.',
          image: '/assets/cards/card5.jpg',
          fallback: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80'
        },
        {
          id: 'card-6',
          title: 'Airport Transfers',
          titleFormatted: 'Airport Transfers',
          icon: '🚗',
          price: 'From $45',
          desc: 'VIP airport pick-up and drop-off with Toyota Land Cruiser, Prado, Mercedes V-Class & more. Professional chauffeurs, meet & greet, 24/7 availability.',
          description: 'VIP airport pick-up and drop-off with Toyota Land Cruiser, Prado, Mercedes V-Class & more. Professional chauffeurs, meet & greet, 24/7 availability.',
          image: '/assets/cards/card6.jpg',
          fallback: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80'
        }
      ];
      this.saveData();
    }
    return this.data.whyChooseUs;
  }

  setFullContent(content) {
    if (content.wallpapers) this.data.wallpapers = content.wallpapers;
    if (content.attractions) this.data.activities = content.attractions;
    if (content.activities) this.data.activities = content.activities;
    if (content.tours) this.data.tours = content.tours;
    if (content.transfers) this.data.transfers = content.transfers;
    if (content.packages) this.data.travelDeals = content.packages;
    if (content.travelDeals) this.data.travelDeals = content.travelDeals;
    if (content.gallery) this.data.gallery = content.gallery;
    if (content.reviews) this.data.testimonials = content.reviews;
    if (content.testimonials) this.data.testimonials = content.testimonials;
    if (content.visas) this.data.visas = content.visas;
    if (content.popups) this.data.popups = content.popups;
    if (content.whyChooseUs) this.data.whyChooseUs = content.whyChooseUs;
    if (content.features) this.data.whyChooseUs = content.features;
    if (content.settings) this.data.settings = content.settings;
    this.saveData();
    return this.getAllContent();
  }
}

const store = new DataStore();
module.exports = store;
