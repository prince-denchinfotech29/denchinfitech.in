// components/footer/ScrollToTopButton.tsx

"use client";

import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button onClick={scrollToTop} className="scroll-top-button" aria-label="Scroll to top">
      <ChevronUp size={20} />
    </button>
  );
}
