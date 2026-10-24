import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PartnersSection from '../components/PartnersSection';
import SingleLineCards from '../components/SingleLineCards';
import AttractionsSection from '../components/AttractionsSection';
import AboutSection from '../components/AboutSection';
import ToursSection from '../components/ToursSection';
import AirportTransferSection from '../components/AirportTransferSection';
import GallerySection from '../components/GallerySection';
import PackagesSection from '../components/PackagesSection';
import ReviewsSection from '../components/ReviewsSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import FloatingWidgets from '../components/FloatingWidgets';
import BookingModal from '../components/BookingModal';
import QuoteModal from '../components/QuoteModal';

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingTitle, setBookingTitle] = useState('');
  const [bookingPrice, setBookingPrice] = useState('');

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteTitle, setQuoteTitle] = useState('Request a Custom Quote');

  const handleOpenQuote = (title = 'Request a Custom Quote') => {
    setQuoteTitle(title);
    setQuoteModalOpen(true);
  };

  const handleBookItem = (title, price = '') => {
    setBookingTitle(title);
    setBookingPrice(price);
    setBookingModalOpen(true);
  };

  return (
    <div className="airdream-home-page" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 0. Top Bar and Sticky Header Navigation */}
      <Navbar onOpenQuote={handleOpenQuote} />

      <main style={{ flex: 1 }}>
        {/* 1. Hero Wallpaper Slider with Ken Burns & Call-to-Actions */}
        <HeroSection onOpenQuote={handleOpenQuote} />

        {/* 2. Partners & Trusted Airlines Marquee */}
        <PartnersSection />

        {/* 3. Why Choose Air Dream Travel & Tourism? (3D Flip/Open Cards) */}
        <SingleLineCards onBookTrip={handleBookItem} />

        {/* 4. Top Dubai Attractions Marquee */}
        <AttractionsSection onBookAttraction={handleBookItem} />

        {/* 5. About Us (Arched Visual Composition with Overlapping Bubble Badges) */}
        <AboutSection onOpenQuote={handleOpenQuote} />

        {/* 6. Tour - Trips Marquee */}
        <ToursSection onBookTour={handleBookItem} />

        {/* 7. Airport Transfer Marquee */}
        <AirportTransferSection onBookTransfer={handleBookItem} />

        {/* 8. Photo Gallery */}
        <GallerySection onOpenPhoto={handleBookItem} />

        {/* 9. Popular Destinations & Featured Packages (With Category Filter Pills) */}
        <PackagesSection onBookPackage={handleBookItem} />

        {/* 10. Loved by Over 25,000+ Voyagers Traveler Reviews Marquee */}
        <ReviewsSection />

        {/* 11. Frequently Asked Questions Accordion */}
        <FAQSection />
      </main>

      {/* 12. Footer with Links, Office Address, Newsletter */}
      <Footer onOpenQuote={handleOpenQuote} />

      {/* 13. Floating Action Widgets (WhatsApp + Live Chat Concierge) */}
      <FloatingWidgets onOpenQuote={handleOpenQuote} />

      {/* Modal 1: Complete Reservation / Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        title={bookingTitle}
        price={bookingPrice}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Modal 2: Step-by-Step Personalized Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        initialTitle={quoteTitle}
        onClose={() => setQuoteModalOpen(false)}
      />
    </div>
  );
}
