// services.ts
import axios, { AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = "https://denchinfotech.in/admin/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json" },
});

export interface Service {
  id: number;
  heading: string;
  slug: string;
  image_url: string;
  short_content?: string;
  service_content?: string;
  meta_slug?: string;
  page_banner?: string;
}

export interface Meta {
  heading?: string;
  name?: string;
  description?: string;
  meta_title?: string;
  meta_keyword?: string;
  meta_description?: string;
}

export interface ServicesApiResponse {
  services: Service[];
  meta: Meta;
}

export interface ServiceDetailResponse {
  id: number;
  heading: string;
  slug: string;
  image_url: string;
  content?: string;
  meta?: Meta;
  [key: string]: any;
}

export interface ExtraPageResponse {
  service: {
    id: number;
    heading: string;
    slug: string;
    banner_url?: string;
    image_url?: string;
    content?: string;
    description?: string;
    created_date?: string;
    meta?: Meta;
  };
  meta?: Meta;
}

interface ApiError {
  error?: string;
  message?: string;
}

export async function getServicesByCategory(categorySlug: string): Promise<ServicesApiResponse> {
  if (!categorySlug) throw new Error("Category slug is required");

  try {
    const response: AxiosResponse<ServicesApiResponse> = await apiClient.get(`/services/${categorySlug}`);
    return response.data;
  } catch (error: any) {
    const apiError: ApiError = error.response?.data;
    throw new Error(apiError?.error || apiError?.message || "Failed to fetch services");
  }
}

export async function getServiceBySlug(categorySlug: string, serviceSlug: string): Promise<ServiceDetailResponse> {
  if (!categorySlug || !serviceSlug) throw new Error("Both categorySlug and serviceSlug are required");

  try {
    const response: AxiosResponse<ServiceDetailResponse> = await apiClient.get(`/services/${categorySlug}/${serviceSlug}`);
    return response.data;
  } catch (error: any) {
    const apiError: ApiError = error.response?.data;
    throw new Error(apiError?.error || apiError?.message || "Failed to fetch service details");
  }
}

export async function getExtraPageBySlug(slug: string): Promise<ExtraPageResponse> {
  if (!slug) throw new Error("Slug is required");

  try {
    const response: AxiosResponse<ExtraPageResponse> = await apiClient.get(`/extra-page/${slug}`);
    return response.data;
  } catch (error: any) {
    const apiError: ApiError = error.response?.data;
    throw new Error(apiError?.error || apiError?.message || "Failed to fetch extra page data");
  }
}
