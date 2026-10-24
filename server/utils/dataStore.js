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
      settings: this.getSettings()
    };
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
    if (content.settings) this.data.settings = content.settings;
    this.saveData();
    return this.getAllContent();
  }
}

const store = new DataStore();
module.exports = store;
