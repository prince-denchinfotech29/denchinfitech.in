"use client";

import React, { useState, useEffect, useRef, ReactNode, MouseEvent } from "react";

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

  const startX = useRef<number>(0);
  const currentTranslate = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const totalItems = children.length;

  // Create extended children for infinite scroll effect
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
        setItemsPerView(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(itemsPerView);
  }, [itemsPerView]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (currentIndex >= totalItems + itemsPerView) {
      setCurrentIndex(itemsPerView);
      resetTransform(itemsPerView);
    } else if (currentIndex < itemsPerView) {
      const newIndex = totalItems + itemsPerView - 1;
      setCurrentIndex(newIndex);
      resetTransform(newIndex);
    }
  };

  const resetTransform = (index: number) => {
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(-${index * (100 / extendedChildren.length)}%)`;
      trackRef.current.offsetHeight; // force reflow
      trackRef.current.style.transition = "";
    }
  };

  const slideWidthPercent = 100 / extendedChildren.length;
  const trackWidthPercent = (extendedChildren.length / itemsPerView) * 100;

  const next = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Auto-scroll
  useEffect(() => {
    autoScrollRef.current = next;
  });

  useEffect(() => {
    const play = () => autoScrollRef.current();
    if (autoScrollInterval > 0) {
      const interval = setInterval(play, autoScrollInterval);
      return () => clearInterval(interval);
    }
  }, [autoScrollInterval]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX;
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;

    const deltaX = e.clientX - startX.current;
    const percentMoved = (deltaX / trackRef.current.offsetWidth) * 100;

    const baseTranslate = -currentIndex * slideWidthPercent;
    currentTranslate.current = baseTranslate + percentMoved;

    trackRef.current.style.transform = `translateX(${currentTranslate.current}%)`;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.5s ease-in-out";
    }

    const moved = currentTranslate.current + currentIndex * slideWidthPercent;

    if (moved < -5) {
      // Swiped left
      setCurrentIndex((prev) => prev + 1);
    } else if (moved > 5) {
      // Swiped right
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Snap back
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${currentIndex * slideWidthPercent}%)`;
      }
    }
  };

  useEffect(() => {
    const handleMouseLeave = () => {
      if (isDragging.current) handleMouseUp();
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentIndex]);

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
          onMouseDown={handleMouseDown}
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
    </div>
  );
};

export default Carousel;
