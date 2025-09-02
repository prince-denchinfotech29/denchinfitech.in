// lib/api.ts

const BASE_URL = 'https://denchinfotech.in/admin/api';

async function fetchFromAPI(endpoint: string) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store' // Use 'force-cache' or 'revalidate' as needed
  });

  const data = await res.json();

  if (!data.status) {
    throw new Error(data.message || `Failed to fetch ${endpoint}`);
  }

  return data.data;
}

export const fetchHome = () => fetchFromAPI('home');
export const getNavList = () => fetchFromAPI('nav-list');
export const getSlider = () => fetchFromAPI('get-slider');
export const getAboutDetails = () => fetchFromAPI('about');
export const getServices = () => fetchFromAPI('get-service');
export const getFaq = () => fetchFromAPI('get-faq');
export const getPricing = () => fetchFromAPI('pricings');
export const getTestimonial = () => fetchFromAPI('testimonials');
