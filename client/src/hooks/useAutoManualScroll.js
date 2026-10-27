import { useRef, useEffect, useCallback } from 'react';

/**
 * High-performance, always-active Auto-Scroll hook with manual arrow navigation
 * and smooth touch/mouse drag support for infinite carousels.
 */
export function useAutoManualScroll({ speed = 1.0, cardWidth = 320, setsCount = 4 } = {}) {
  const containerRef = useRef(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const hasDraggedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId;
    let lastTime = null;

    const step = (time) => {
      if (!lastTime) lastTime = time;
      const delta = Math.min(time - lastTime, 50); // Cap delta to avoid jumps when switching tabs
      lastTime = time;

      if (!isPausedRef.current && !isDraggingRef.current) {
        // Width of one complete set of cards
        const oneSetWidth = container.scrollWidth / setsCount;

        if (oneSetWidth > 50) {
          container.scrollLeft += (speed * delta) / 16.67;

          // When container passes one full set, wrap back smoothly
          if (container.scrollLeft >= oneSetWidth) {
            container.scrollLeft -= oneSetWidth;
          }
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [speed, setsCount]);

  const pauseTemporarily = useCallback((ms = 3500) => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, ms);
  }, []);

  const scrollPrev = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const oneSetWidth = container.scrollWidth / setsCount;
    if (container.scrollLeft < cardWidth && oneSetWidth > 50) {
      container.scrollLeft += oneSetWidth;
    }
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    pauseTemporarily(3500);
  }, [cardWidth, setsCount, pauseTemporarily]);

  const scrollNext = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const oneSetWidth = container.scrollWidth / setsCount;
    if (container.scrollLeft >= oneSetWidth * 2 && oneSetWidth > 50) {
      container.scrollLeft -= oneSetWidth;
    }
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    pauseTemporarily(3500);
  }, [cardWidth, setsCount, pauseTemporarily]);

  // Drag-to-scroll mouse handlers
  const onMouseDown = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartX.current = e.pageX - container.offsetLeft;
    scrollStartX.current = container.scrollLeft;
    isPausedRef.current = true;
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    container.scrollLeft = scrollStartX.current - walk;

    const oneSetWidth = container.scrollWidth / setsCount;
    if (oneSetWidth > 50) {
      if (container.scrollLeft >= oneSetWidth * 2) container.scrollLeft -= oneSetWidth;
      if (container.scrollLeft <= 0) container.scrollLeft += oneSetWidth;
    }
  }, [setsCount]);

  const onMouseUp = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      pauseTemporarily(2500);
    }
  }, [pauseTemporarily]);

  return {
    containerRef,
    scrollPrev,
    scrollNext,
    hasDragged: () => hasDraggedRef.current,
    containerProps: {
      ref: containerRef,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave: onMouseUp,
      onTouchStart: () => {
        isPausedRef.current = true;
      },
      onTouchEnd: () => {
        pauseTemporarily(2500);
      }
    }
  };
}
