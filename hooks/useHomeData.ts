'use client';

import { useState, useEffect } from 'react';
import {
  fetchHome,
  getNavList,
  getSlider,
  getAboutDetails,
  getServices,
  getFaq,
  getPricing,
  getTestimonial
} from '@/components/auth/home';  // अपनी सही api फाइल का path डालें

interface HomeHookState {
  home: any;
  navlist: any[];
  slider: any[];
  about: any;
  services: any[];
  faq: any[];
  pricing: any[];
  testimonials: any[];
}

export function useHomeData() {
  const [data, setData] = useState<HomeHookState>({
    home: {},
    navlist: [],
    slider: [],
    about: {},
    services: [],
    faq: [],
    pricing: [],
    testimonials: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const [
          homeRes,
          navRes,
          sliderRes,
          aboutRes,
          servicesRes,
          faqRes,
          pricingRes,
          testimonialRes
        ] = await Promise.all([
          fetchHome(),
          getNavList(),
          getSlider(),
          getAboutDetails(),
          getServices(),
          getFaq(),
          getPricing(),
          getTestimonial()
        ]);

        if (!isMounted) return;

        setData({
          home: homeRes,
          navlist: navRes,
          slider: sliderRes,
          about: aboutRes,
          services: servicesRes,
          faq: faqRes,
          pricing: pricingRes,
          testimonials: testimonialRes
        });
      } catch (err: any) {
        if (!isMounted) return;
        setError(err.message || 'Unknown error occurred');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const developmentServices = data.services.filter(
    s => s.category_name === 'DEVELOPMENT'
  );

  const digitalMarketingServices = data.services.filter(
    s => s.category_name === 'DIGITAL MARKETING'
  );

  return {
    homeData: data.home,
    navData: data.navlist,
    homeSlider: data.slider,
    homeAbout: data.about,
    developmentServices,
    digitalMarketingServices,
    faq: data.faq,
    pricing: data.pricing,
    testimonials: data.testimonials,
    loading,
    error,
  };
}
