"use client";

import React, { useState, useEffect, useRef, useCallback, MouseEvent, TouchEvent } from "react";

interface Slide {
  photo: string;
  heading?: string;
}

interface CarouselProps {
  homeSlider?: Slide[];
}

export default function Carousel({ homeSlider = [] }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayTimeout = 1000;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPaused || isDragging || homeSlider.length === 0) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % homeSlider.length);
    }, autoplayTimeout);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isPaused, isDragging, homeSlider.length]);

  const startDrag = useCallback((clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setIsPaused(true);
  }, []);

  const onDragMove = useCallback(
    (clientX: number) => {
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

  // Mouse event handlers
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => startDrag(e.clientX);
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => onDragMove(e.clientX);
  const handleMouseUp = () => endDrag();
  const handleMouseLeave = () => {
    if (isDragging) endDrag();
    setIsPaused(false);
  };

  // Touch event handlers
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => startDrag(e.touches[0].clientX);
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => onDragMove(e.touches[0].clientX);
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
