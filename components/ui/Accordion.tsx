"use client";

import React, { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={`accordion-item ${isOpen ? "open" : ""}`}
          >
            <button
              className="accordion-question"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              aria-controls={`accordion-answer-${index}`}
              id={`accordion-question-${index}`}
              type="button"
            >
              <span>{item.question}</span>
              <span className={`chevron ${isOpen ? "rotate" : ""}`}>&#9660;</span>
            </button>
            {isOpen && (
              <div
                className="accordion-answer"
                id={`accordion-answer-${index}`}
                role="region"
                aria-labelledby={`accordion-question-${index}`}
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
