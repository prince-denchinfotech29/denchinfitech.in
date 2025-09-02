"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function Carousel({ homeSlider = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const timeoutRef = useRef(null);
  const autoplayTimeout = 1000;

  // Screen size check - optimized with debounce to avoid rapid setState
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay effect with cleanup
  useEffect(() => {
    if (isPaused || isDragging || homeSlider.length === 0) {
      clearTimeout(timeoutRef.current);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % homeSlider.length);
    }, autoplayTimeout);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isPaused, isDragging, homeSlider.length]);

  // Drag handlers
  const startDrag = useCallback((clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setIsPaused(true);
  }, []);

  const onDragMove = useCallback(
    (clientX) => {
      if (!isDragging) return;
      setDragOffset(startX - clientX);
    },
    [isDragging, startX]
  );

  const endDrag = useCallback(() => {
    if (!isDragging) return;
    const threshold = 100;

    if (Math.abs(dragOffset) > threshold) {
      setCurrentIndex((prev) =>
        dragOffset > 0
          ? (prev + 1) % homeSlider.length
          : (prev - 1 + homeSlider.length) % homeSlider.length
      );
    }

    setIsDragging(false);
    setDragOffset(0);
    setIsPaused(false);
  }, [dragOffset, homeSlider.length, isDragging]);

  // Mouse events
  const handleMouseDown = (e) => startDrag(e.clientX);
  const handleMouseMove = (e) => onDragMove(e.clientX);
  const handleMouseUp = () => endDrag();
  const handleMouseLeave = () => {
    if (isDragging) endDrag();
    setIsPaused(false);
  };

  // Touch events
  const handleTouchStart = (e) => startDrag(e.touches[0].clientX);
  const handleTouchMove = (e) => onDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => endDrag();

  const heightClass = isMobile ? "h-[25vh]" : "h-[100vh]";

  return (
    <div
      className={`relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none ${heightClass}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      draggable={false}
    >
      {homeSlider.map((slide, idx) => (
        <img
          key={idx}
          src={slide.photo}
          alt={slide.heading || `Slide ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            transitionProperty: isDragging ? "none" : "opacity",
            transform:
              isDragging && idx === currentIndex
                ? `translateX(${-dragOffset}px)`
                : "translateX(0)",
          }}
          loading="lazy"
          draggable={false}
        />
      ))}
    </div>
  );
}
