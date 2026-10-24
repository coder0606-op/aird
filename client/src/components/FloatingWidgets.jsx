import React, { useState } from 'react';

export default function FloatingWidgets({ onOpenQuote }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello and welcome to Air Dream Travel & Tourism! ✈️ How can I help you plan your journey today?'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleChipClick = (query) => {
    if (query.includes('WhatsApp')) {
      window.open('https://wa.me/971588338927', '_blank');
      return;
    }
    const newMsgs = [
      ...messages,
      { sender: 'user', text: query },
      {
        sender: 'bot',
        text: `Thanks for asking about "${query}"! Our senior travel consultant will provide you with the best rates. You can also click below to submit your details or chat instantly on WhatsApp.`
      }
    ];
    setMessages(newMsgs);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const userText = inputVal.trim();
    setInputVal('');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      {
        sender: 'bot',
        text: 'Thank you! We have received your query. Our team is available 24/7 on WhatsApp (+971 58 833 8927) for instant assistance.'
      }
    ]);
  };

  return (
    <>
      <div className="floating-widgets-group">
        {/* Live Chat Bubble */}
        <button
          type="button"
          className="live-chat-bubble-btn"
          id="liveChatBubble"
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Open live chat assistant"
        >
          <span className="pulse-indicator"></span>
          <i className="fa-solid fa-comment-dots"></i>
          <span>Live Chat</span>
        </button>

        {/* Pulsing Green Floating WhatsApp Button */}
        <a
          href="https://wa.me/971588338927"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-floating-btn"
          id="whatsappFloatingBtn"
          aria-label="Contact us on WhatsApp"
        >
          <i className="fa-brands fa-whatsapp"></i>
        </a>
      </div>

      {/* Interactive Chat Window */}
      {chatOpen && (
        <div
          className="chat-window-modal"
          id="chatWindowModal"
          role="dialog"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div className="chat-header">
            <div className="chat-header-user">
              <div className="chat-avatar-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Air Dream Travel Concierge"
                  className="chat-agent-avatar"
                />
                <span className="chat-online-badge"></span>
              </div>
              <div className="chat-agent-meta">
                <h5>Layla &bull; Travel Concierge</h5>
                <span>Online &bull; Instant Reply</span>
              </div>
            </div>
            <button
              type="button"
              className="chat-close-btn"
              onClick={() => setChatOpen(false)}
              aria-label="Close chat window"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div
            className="chat-body-messages"
            id="chatMessagesBody"
            style={{ maxHeight: '320px', overflowY: 'auto' }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`chat-msg ${m.sender}`}
                style={{
                  background: m.sender === 'user' ? '#1E6FD9' : '#F0F7FF',
                  color: m.sender === 'user' ? '#fff' : '#0A1F44',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  marginBottom: '10px',
                  fontSize: '0.88rem',
                  maxWidth: '85%'
                }}
              >
                {m.text}
              </div>
            ))}

            <div className="chat-quick-actions" style={{ marginTop: '8px' }}>
              <button
                type="button"
                className="quick-chip"
                onClick={() => handleChipClick('Can you help me book cheap flights?')}
              >
                ✈️ Book Cheap Flights
              </button>
              <button
                type="button"
                className="quick-chip"
                onClick={() => handleChipClick('What Umrah packages are available?')}
              >
                🕋 Hajj &amp; Umrah 2025/2026
              </button>
              <button
                type="button"
                className="quick-chip"
                onClick={() => handleChipClick('I want a customized holiday tour package.')}
              >
                🌍 Custom Holiday Tour
              </button>
              <button
                type="button"
                className="quick-chip"
                onClick={() => handleChipClick('How do I apply for Schengen or UK visa?')}
              >
                🛂 Visa Assistance
              </button>
              <button
                type="button"
                className="quick-chip"
                onClick={() => handleChipClick('Speak to Agent on WhatsApp')}
              >
                💬 Speak on WhatsApp
              </button>
            </div>
          </div>

          <form className="chat-footer-input" onSubmit={handleSend}>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type your travel inquiry..."
              autoComplete="off"
            />
            <button type="submit" className="chat-send-btn" aria-label="Send message">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
