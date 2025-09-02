import axios from "axios";

const BASE_URL = "https://denchinfotech.in/react/admin/api";

export interface Blog {
  id?: number;
  heading: string;
  blog_short?: string;
  slug: string;
  photo?: string;
  image_url?: string;
  banner?: string;
  banner_url?: string;
  blog_content?: string;
  created_date?: string;
  added_date?: string;
}

export interface Meta {
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
}

export interface PopularBlog {
  id?: number;
  heading: string;
  slug: string;
  image_url?: string;
  added_date?: string;
}

export interface ExtraPage {
  id?: number;
  heading: string;
}

export interface BlogDataResponse {
  blog: Blog;
  meta: Meta;
  popular_blogs: PopularBlog[];
  extra_pages: ExtraPage[];
}

export interface BlogsResponse {
  status: boolean;
  message: string;
  blogs: Blog[];
}

export interface BlogsMetaResponse {
  meta: Meta;
}

export async function getBlogs(): Promise<BlogsResponse> {
  try {
    const response = await axios.get<BlogsResponse>(`${BASE_URL}/blogs`, {
      headers: { Accept: "application/json" },
    });
    if (response.data.status) {
      return response.data;
    }
    throw new Error(response.data.message || "Failed to fetch blogs");
  } catch (error: any) {
    console.error("Error fetching blogs:", error?.response?.data || error.message || error);
    throw new Error(error?.response?.data?.message || error.message || "Failed to fetch blogs");
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogDataResponse> {
  try {
    const response = await axios.get<BlogDataResponse>(`${BASE_URL}/blog/${slug}`, {
      headers: { Accept: "application/json" },
    });
    if (response.data?.blog) {
      return response.data;
    }
    throw new Error("Blog not found or incomplete response");
  } catch (error: any) {
    console.error("Error fetching blog by slug:", error);
    const message = error?.response?.data?.message || error?.message || "Blog not found";
    throw new Error(message);
  }
}
