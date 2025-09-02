import axios from 'axios';

const BASE_URL = 'https://denchinfotech.in/react/admin/api';

// Home Data
export async function fetchHome() {
  try {
    const response = await axios.get(`${BASE_URL}/home`, {
      headers: { Accept: 'application/json' },
    });

    if (response.data.status) {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch home data');
    }
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
}

// Nav List
export async function getNavList() {
  try {
    const response = await axios.get(`${BASE_URL}/nav-list`);
    if (response.data.status || response.data.data) {
      return response.data.data || [];
    } else {
      throw new Error('Failed to fetch nav list');
    }
  } catch (error) {
    console.error('Error fetching nav list:', error);
    throw error;
  }
}


// Slider
export async function getSlider() {
  try {
    const response = await axios.get(`${BASE_URL}/get-slider`);
    if (response.data.status || response.data.data) {
      return response.data.data || [];
    } else {
      throw new Error('Failed to fetch slider data');
    }
  } catch (error) {
    console.error('Error fetching slider:', error);
    throw error;
  }
}

// About Details
export async function getAboutDetails() {
  try {
    const response = await axios.get(`${BASE_URL}/about`);
    if (response.data.status || response.data.data) {
      return response.data.data || {};
    } else {
      throw new Error('Failed to fetch about details');
    }
  } catch (error) {
    console.error('Error fetching about details:', error);
    throw error;
  }
}

// Services
export async function getServices() {
  try {
    const response = await axios.get(`${BASE_URL}/get-service`, {
      headers: { Accept: 'application/json' },
    });

    if (response.data.status) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch services');
    }
  } catch (error) {
    console.error('Error fetching Services:', error);
    throw error;
  }
}

// FAQ
export async function getFaq() {
  try {
    const response = await axios.get(`${BASE_URL}/get-faq`, {
      headers: { Accept: 'application/json' },
    });

    if (response.data.status) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch FAQs');
    }
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    throw error;
  }
}

// Pricing
export async function getPricing() {
  try {
    const response = await axios.get(`${BASE_URL}/pricings`, {
      headers: { Accept: 'application/json' },
    });

    if (response.data.status) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch pricing');
    }
  } catch (error) {
    console.error('Error fetching pricing:', error);
    throw error;
  }
}

// Testimonials
export async function getTestimonial() {
  try {
    const response = await axios.get(`${BASE_URL}/testimonials`, {
      headers: { Accept: 'application/json' },
    });

    if (response.data.status) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch testimonials');
    }
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
}
