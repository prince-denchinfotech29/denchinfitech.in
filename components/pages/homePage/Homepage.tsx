'use client';

import React, { lazy, Suspense } from "react";
import Navbar from "@/components/pages/header/Header";
import Carousel from "@/components/pages/homePage/Hero";
import { useHomeData } from "@/hooks/useHomeData";
import LoadingSpinner from '@/components/ui/loading-spinner';

// Lazy-loaded sections

const AboutSection = lazy(() => import("@/components/pages/homePage/AboutSection"));
const WhyChooseUsSection = lazy(() => import("@/components/pages/homePage/WhyChooseUsSection"));
const CounterSection = lazy(() => import("@/components/pages/homePage/CounterSection"));
const DevelopmentServicesSection = lazy(() => import("@/components/pages/homePage/DevelopmentServicesSection"));
const DigitalMarketingSection = lazy(() => import("@/components/pages/homePage/DigitalMarketingSection"));
const ContactSection = lazy(() => import("@/components/pages/homePage/ContactSection"));
const PricingSection = lazy(() => import("@/components/pages/homePage/PricingSection"));
const TestimonialsSection = lazy(() => import("@/components/pages/homePage/TestimonialsSection"));
const BrandLogosSection = lazy(() => import("@/components/pages/homePage/BrandLogosSection"));
const Footer = lazy(() => import("@/components/pages/header/footer/Footer"));

const HomePage: React.FC = () => {
  const {
    homeData,
    navData,
    homeSlider,
    homeAbout,
    developmentServices,
    digitalMarketingServices,
    faq,
    pricing,
    testimonials,
    loading,
    error,
  } = useHomeData();

  const meta = homeData?.meta || {};

  // console.log(meta);

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="p-10 text-center text-red-600 font-semibold">
      Error: {error}
    </div>
  );
  return (
    <>
      <Navbar homeData={homeData} navData={navData} />
      <Carousel homeSlider={homeSlider} />

      <main className="min-h-screen bg-gray-50">
        <Suspense fallback={<LoadingSpinner />}>
          <AboutSection homeAbout={homeAbout} />
          <WhyChooseUsSection />
          <CounterSection />
           <DevelopmentServicesSection services={developmentServices} />
          <DigitalMarketingSection services={digitalMarketingServices} />
          <ContactSection faqs={faq} />
          <PricingSection pricings={pricing} />
           <TestimonialsSection testimonials={testimonials} />
          <BrandLogosSection />
          <Footer homeData={homeData} />
        </Suspense>
      </main>
    </>
  );
};

export default HomePage;
