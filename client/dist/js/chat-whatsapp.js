/**
 * AIR DREAM TRAVEL & TOURISM - LIVE CHAT & WHATSAPP INTEGRATION
 * Features an intelligent simulated concierge and direct WhatsApp link.
 */

document.addEventListener('DOMContentLoaded', () => {
  initChatAndWhatsApp();
});

function initChatAndWhatsApp() {
  const liveChatBubble = document.getElementById('liveChatBubble');
  const chatModal = document.getElementById('chatWindowModal');
  const chatCloseBtn = document.getElementById('closeChatBtn');
  const chatForm = document.getElementById('chatInputForm');
  const chatInput = document.getElementById('chatMessageInput');
  const messagesContainer = document.getElementById('chatMessagesBody');
  const whatsappFloatingBtn = document.getElementById('whatsappFloatingBtn');

  // WhatsApp click handler
  if (whatsappFloatingBtn) {
    whatsappFloatingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '971588338927'; // Customer service hotline (+971 58 833 8927)
      const text = encodeURIComponent('Hello Air Dream Travel & Tourism! I would like to get a quote and inquire about your flight & tour packages.');
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    });
  }

  // Toggle Live Chat
  if (liveChatBubble && chatModal) {
    liveChatBubble.addEventListener('click', () => {
      chatModal.classList.toggle('open');
      if (chatModal.classList.contains('open') && chatInput) {
        chatInput.focus();
      }
    });
  }

  if (chatCloseBtn && chatModal) {
    chatCloseBtn.addEventListener('click', () => {
      chatModal.classList.remove('open');
    });
  }

  // Handle Quick Chips
  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (!query) return;
      handleUserChatMessage(query);
    });
  });

  // Handle Input Submit
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';
      handleUserChatMessage(text);
    });
  }

  function handleUserChatMessage(text) {
    if (!messagesContainer) return;

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.innerText = text;
    messagesContainer.appendChild(userMsg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Show bot typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-msg bot';
    typingIndicator.innerHTML = '<i class="fa-solid fa-ellipsis fa-fade"></i> Our travel concierge is typing...';
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Generate intelligent response
    setTimeout(() => {
      typingIndicator.remove();
      const botResponse = generateBotAnswer(text);

      const botMsg = document.createElement('div');
      botMsg.className = 'chat-msg bot';
      botMsg.innerHTML = botResponse;
      messagesContainer.appendChild(botMsg);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 800);
  }

  function generateBotAnswer(input) {
    const lower = input.toLowerCase();

    if (lower.includes('flight') || lower.includes('fare') || lower.includes('ticket')) {
      return `✈️ <strong>Best Airfares Guaranteed:</strong> We partner with Emirates, Saudia, Qatar Airways and 150+ airlines to offer exclusive corporate and leisure rates. <br><br>Would you like to <a href="#" class="open-quote-modal-btn" style="color: #1E6FD9; font-weight:700; text-decoration: underline;" onclick="document.getElementById('quoteModal').classList.add('open')">Request a Custom Flight Quote</a>?`;
    }

    if (lower.includes('umrah') || lower.includes('hajj') || lower.includes('makkah')) {
      return `🕋 <strong>Hajj & Umrah Excellence:</strong> We provide comprehensive VIP 5-Star packages with luxury hotels facing the Haram, seamless private transfers, Ziyarat tours, and full visa approval assistance.<br><br>👉 <button class="btn btn-gold btn-sm" style="margin-top:6px;" onclick="window.openBookingModalWithPackage('Deluxe Umrah 10-Days Package', '$1,199')">View Umrah Itinerary</button>`;
    }

    if (lower.includes('tour') || lower.includes('holiday') || lower.includes('package') || lower.includes('bali') || lower.includes('dubai')) {
      return `🌍 <strong>Tailor-Made Holidays:</strong> From the sun-kissed beaches of Bali and the Maldives to Swiss Alps scenic trains and Dubai desert luxury, our trip curators handle every detail.<br><br>Tell us your preferred destination or click below to chat with a trip planner on WhatsApp!`;
    }

    if (lower.includes('visa') || lower.includes('passport')) {
      return `🛂 <strong>Hassle-Free Visa Services:</strong> We process Tourist, Business, and Pilgrimage visas for Schengen, UK, US, Canada, Turkey, KSA, and UAE with a 99.4% approval success rate.`;
    }

    if (lower.includes('agent') || lower.includes('whatsapp') || lower.includes('human') || lower.includes('call')) {
      return `📞 <strong>Direct Human Assistance:</strong> You can connect with our senior travel consultant right away on WhatsApp at <a href="https://wa.me/971588338927" target="_blank" style="color:#25D366; font-weight:700;">+971 58 833 8927</a> or call our 24/7 hotline.`;
    }

    return `Thank you for reaching out to <strong>Air Dream Travel & Tourism</strong>! How may we assist your journey today? You can choose a quick option or connect directly via WhatsApp anytime.`;
  }
}
