"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: ReactNode[];
  className?: string;
  autoScrollInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  className = "",
  autoScrollInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(3);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef<() => void>(() => {});

  const totalItems = children.length;

  const extendedChildren = [
    ...children.slice(totalItems - itemsPerView),
    ...children,
    ...children.slice(0, itemsPerView),
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(itemsPerView);
  }, [itemsPerView]);

  const handleTransitionEnd = (): void => {
    setIsTransitioning(false);

    if (!trackRef.current) return;

    if (currentIndex >= totalItems + itemsPerView) {
      setCurrentIndex(itemsPerView);
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(-${
        itemsPerView * (100 / extendedChildren.length)
      }%)`;
      // Force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      trackRef.current.offsetHeight;
      trackRef.current.style.transition = "";
    } else if (currentIndex < itemsPerView) {
      setCurrentIndex(totalItems + itemsPerView - 1);
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(-${
        (totalItems + itemsPerView - 1) * (100 / extendedChildren.length)
      }%)`;
      // Force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      trackRef.current.offsetHeight;
      trackRef.current.style.transition = "";
    }
  };

  const next = (): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prev = (): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Auto scroll logic
  useEffect(() => {
    autoScrollRef.current = next;
  });

  useEffect(() => {
    if (autoScrollInterval <= 0) return;

    const play = () => {
      autoScrollRef.current();
    };

    const interval = setInterval(play, autoScrollInterval);
    return () => clearInterval(interval);
  }, [autoScrollInterval]);

  const slideWidthPercent = 100 / extendedChildren.length;
  const trackWidthPercent = (extendedChildren.length / itemsPerView) * 100;

  return (
    <div className={`carousel relative overflow-hidden ${className}`}>
      <div className="carousel-container overflow-hidden">
        <div
          className="carousel-track flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${trackWidthPercent}%`,
            transform: `translateX(-${currentIndex * slideWidthPercent}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
          ref={trackRef}
        >
          {extendedChildren.map((child, index) => (
            <div
              key={index}
              className="carousel-item flex-shrink-0"
              style={{ width: `${100 / extendedChildren.length}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          className="w-10 h-10 bg-[#003b4d] text-white flex items-center justify-center hover:bg-[#005d73] transition"
          onClick={prev}
          aria-label="Previous slide"
          style={{ backgroundColor: "#0d404e" }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="w-10 h-10 bg-[#003b4d] text-white flex items-center justify-center hover:bg-[#005d73] transition"
          onClick={next}
          aria-label="Next slide"
          style={{ backgroundColor: "#0d404e" }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
