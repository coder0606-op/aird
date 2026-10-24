import React, { useState } from 'react';

const FAQS_DATA = [
  {
    question: 'How do I book a flight or package with Air Dream Travel?',
    answer:
      'You can book directly via our online website, request a customized quote via our "Request a Quote" modal, or message our dedicated team directly on WhatsApp for live pricing, instant availability, and official booking vouchers.'
  },
  {
    question: 'What is included in your Hajj and Umrah packages?',
    answer:
      'Our Umrah packages include tourist/pilgrimage visa processing, return airline tickets, 4-star and 5-star hotel accommodations near the Grand Mosques in Makkah and Madinah, private luxury transfers, and experienced Ziyarat tour guides.'
  },
  {
    question: 'What happens if my flight gets delayed or cancelled?',
    answer:
      'Because Air Dream is an IATA-certified agency, our 24/7 operations desk immediately receives airline disruption alerts. We step in on your behalf to coordinate complimentary rebooking, hotel vouchers, or full refund processing according to airline fare conditions.'
  },
  {
    question: 'How long does visa processing take for Schengen, UK and US?',
    answer:
      'Standard processing takes between 10 to 15 working days depending on embassy workload. We provide express appointment scheduling, verified document checklists, and full vetting to maximize your first-time approval chances.'
  },
  {
    question: 'Can I customize my holiday itinerary and hotel preferences?',
    answer:
      'Absolutely! Over 70% of our holiday bookings are custom-made. Our travel consultants work one-on-one with you to select your preferred flights, hotel categories, private chauffeurs, dietary preferences, and sightseeing excursions.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="section-padding faq-section" id="faq">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-circle-question"></i> Help &amp; FAQs
          </div>
          <h2 className="section-title">
            Frequently Asked <span className="script-accent">Questions</span>
          </h2>
          <p className="section-subtitle">
            Find fast answers to common questions about flights, Umrah bookings, visa processing, and payment flexibility.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span
                    className="faq-chevron"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </button>

                {isOpen && (
                  <div
                    className="faq-panel"
                    style={{
                      padding: '0 24px 20px',
                      color: '#516480',
                      lineHeight: 1.7,
                      fontSize: '0.96rem'
                    }}
                  >
                    <div className="faq-panel-inner">{faq.answer}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
