import React from 'react';

/**
 * Modern manual navigation arrow controls (< and >) for auto-scrolling carousels.
 */
export default function ScrollControlBar({ onPrev, onNext }) {
  return (
    <div className="carousel-scroll-controls" aria-label="Manual scroll controls">
      <div className="scroll-arrow-group">
        <button
          type="button"
          className="scroll-arrow-btn"
          onClick={onPrev}
          title="Scroll Left"
          aria-label="Previous items"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          type="button"
          className="scroll-arrow-btn"
          onClick={onNext}
          title="Scroll Right"
          aria-label="Next items"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
