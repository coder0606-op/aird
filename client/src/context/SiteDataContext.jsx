import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const STORAGE_KEY = 'air_dream_site_data_v2';
const SiteDataContext = createContext();

export function SiteDataProvider({ children }) {
  const [siteData, setSiteData] = useState({
    wallpapers: [],
    attractions: [],
    tours: [],
    transfers: [],
    packages: [],
    gallery: [],
    reviews: [],
    settings: {
      brandName: 'Air Dream',
      brandTagline: 'TRAVEL & TOURISM',
      logoUrl: '/assets/air-dream-badge.svg',
      phone: '+971 58 833 8927',
      whatsapp: '971588338927',
      email: 'info@airdreamtravel.com',
      address: 'Office 402, Al Asmawi Building, Sheikh Zayed Road, Dubai, UAE',
      aboutQuote: 'We, at Air Dream Travel & Tourism, cater to our clients a lifestyle at its best where they can feel the pulse of Dubai and the unseen facets of the world, through our exclusive guided tours and other value-added services.',
      aboutArchImg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      bubble1Img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=400&q=80',
      bubble2Img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=300&q=80',
      bubble3Img: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=300&q=80'
    }
  });

  const [loading, setLoading] = useState(true);

  const fetchSiteData = useCallback(async () => {
    try {
      // 1. Try unified site-content endpoint from backend
      const res = await api.get('/site-content');
      if (res.data && Object.keys(res.data).length > 0) {
        setSiteData((prev) => {
          const merged = { ...prev, ...res.data };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          return merged;
        });
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('[SiteData] /api/site-content not available, fetching individual collections:', err.message);
    }

    // 2. Fallback to individual REST endpoints
    try {
      const [actRes, tourRes, dealRes, testRes] = await Promise.allSettled([
        api.get('/activities'),
        api.get('/tours'),
        api.get('/travel-deals'),
        api.get('/testimonials')
      ]);

      setSiteData((prev) => {
        const updated = { ...prev };

        if (actRes.status === 'fulfilled' && Array.isArray(actRes.value.data) && actRes.value.data.length > 0) {
          updated.attractions = actRes.value.data.map((a) => ({
            id: a.id || a._id,
            name: a.name || a.title,
            activities: typeof a.activities === 'string' ? a.activities : `${a.activities || 50} activities`,
            price: typeof a.price === 'number' ? `$${a.price}` : (a.price || '$95'),
            image: (a.images && a.images[0]) || a.image || ''
          }));
        }

        if (tourRes.status === 'fulfilled' && Array.isArray(tourRes.value.data) && tourRes.value.data.length > 0) {
          updated.tours = tourRes.value.data.map((t) => ({
            id: t.id || t._id,
            title: t.title,
            location: t.location || 'Dubai Desert',
            duration: t.duration || '08-Hrs',
            price: typeof t.price === 'number' ? `$${t.price}` : (t.price || '$120'),
            rating: t.rating || 5.0,
            image: (t.images && t.images[0]) || t.image || ''
          }));
        }

        if (dealRes.status === 'fulfilled' && Array.isArray(dealRes.value.data) && dealRes.value.data.length > 0) {
          updated.packages = dealRes.value.data.map((p) => ({
            id: p.id || p._id,
            title: p.title,
            category: (p.category || 'tours').toLowerCase().includes('umrah') ? 'umrah' : ((p.category || '').toLowerCase().includes('flight') ? 'flights' : 'tours'),
            duration: p.duration || '5 Days / 4 Nights',
            badge: p.discount || p.badge || 'Popular',
            badgeClass: 'gold',
            price: typeof p.price === 'number' ? `$${p.price}` : (p.price || '$649'),
            image: (p.images && p.images[0]) || p.image || ''
          }));
        }

        if (testRes.status === 'fulfilled' && Array.isArray(testRes.value.data) && testRes.value.data.length > 0) {
          updated.reviews = testRes.value.data.map((r) => ({
            id: r.id || r._id,
            name: r.name,
            avatar: r.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
            stars: r.rating || 5,
            quote: r.review || r.quote || 'Outstanding hospitality and flawless arrangements.'
          }));
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.warn('[SiteData] Fallback fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    // Check localStorage cache first for instant rendering
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object') {
          setSiteData((prev) => ({ ...prev, ...parsed }));
        }
      } catch (e) {}
    } else {
      // Or fetch from default-data.json
      fetch('/data/default-data.json')
        .then((res) => res.json())
        .then((defData) => {
          if (defData) {
            setSiteData((prev) => ({ ...prev, ...defData }));
          }
        })
        .catch(() => {});
    }

    // Always fetch fresh data from backend
    fetchSiteData();

    // Listen for cross-tab or cross-component admin updates
    const handleUpdate = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSiteData((prev) => ({ ...prev, ...parsed }));
        } catch (e) {}
      } else {
        fetchSiteData();
      }
    };

    window.addEventListener('airdream-data-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('airdream-data-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [fetchSiteData]);

  return (
    <SiteDataContext.Provider value={{ siteData, loading, refreshData: fetchSiteData }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
