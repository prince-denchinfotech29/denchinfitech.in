// src/api/index.js
import axios from 'axios'

const BASE_URL = 'https://denchinfotech.in/react/admin/api'

export async function contectSubmit(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/contect-submit`, formData, {
      headers: {
        Accept: 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw new Error(error.response?.data?.message || 'Failed to submit form')
  }
}


export async function newsSubmit(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/news-submit`, formData, {
      headers: {
        Accept: 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw new Error(error.response?.data?.message || 'Failed to submit form')
  }
}
