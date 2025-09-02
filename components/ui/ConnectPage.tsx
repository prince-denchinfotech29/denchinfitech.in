// src/components/CTASection.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const bannerImg = "/imges/counter.webp"; // Assuming public/images

const CTASection: React.FC = () => {
  return (
    <section
      className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(24, 29, 56, 0.7), rgba(24, 29, 56, 0.7)), url(${bannerImg})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xl font-bold">
            Do you want to use our quality service for your business?
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-brand-50 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
