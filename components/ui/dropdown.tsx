"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// Define TypeScript interfaces
interface DropdownItem {
  label: string;
  slug: string;
}

interface RadixDropdownProps {
  title: string;
  slug: string;
  items: DropdownItem[];
}

export const RadixDropdown: React.FC<RadixDropdownProps> = ({ title, slug, items }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/${slug}`}
        className="text-[#0f3e49] hover:text-pink-600 font-medium"
      >
        {title}
      </Link>

      {open && (
        <div className="absolute left-0 mt-2 w-64 bg-white border shadow-lg rounded-md py-2 z-50">
          {items.map((item, index) => (
            <Link
              key={index}
              href={`/${slug}/${item.slug}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-600 transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
