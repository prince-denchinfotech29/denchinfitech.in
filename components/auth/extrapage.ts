// src/api/index.js
import axios from 'axios'

const BASE_URL = 'https://denchinfotech.in/admin/api'


export async function getExtraPageBySlug(slug) {
  try {
    const response = await axios.get(`${BASE_URL}/extra-page/${slug}`, {
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch extra page data");
  }
}