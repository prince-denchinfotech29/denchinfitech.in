'use client';

import React, { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/pages/header/Header";
import Carousel from "@/components/pages/homePage/Hero";
import { useHomeData } from "@/hooks/useHomeData";
import LoadingSpinner from '@/components/ui/loading-spinner';

// Lazy-loaded components
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

const preloadComponents = async () => {
  await Promise.all([
    import("@/components/pages/homePage/AboutSection"),
    import("@/components/pages/homePage/WhyChooseUsSection"),
    import("@/components/pages/homePage/CounterSection"),
    import("@/components/pages/homePage/DevelopmentServicesSection"),
    import("@/components/pages/homePage/DigitalMarketingSection"),
    import("@/components/pages/homePage/ContactSection"),
    import("@/components/pages/homePage/PricingSection"),
    import("@/components/pages/homePage/TestimonialsSection"),
    import("@/components/pages/homePage/BrandLogosSection"),
    import("@/components/pages/header/footer/Footer"),
  ]);
};

const HomePage: React.FC = () => {
  const [componentsReady, setComponentsReady] = useState(false);

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

  useEffect(() => {
    if (!loading && !error) {
      preloadComponents().then(() => {
        setComponentsReady(true);
      });
    }
  }, [loading, error]);

  if (loading || !componentsReady) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <>
     
      <main className="min-h-screen bg-gray-50">
        <Suspense fallback={<LoadingSpinner />}>
          <Navbar homeData={homeData} navData={navData} />
          <Carousel homeSlider={homeSlider} />
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
