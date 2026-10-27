import React from 'react';
import { useSiteData } from '../context/SiteDataContext';

export default function FloatingWidgets() {
  const { siteData } = useSiteData();
  const whatsapp = siteData?.settings?.whatsapp || '971588338927';

  return (
    <div className="floating-widgets-group">
      {/* Pulsing Green Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating-btn"
        id="whatsappFloatingBtn"
        aria-label="Contact us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  );
}
