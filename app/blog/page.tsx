// app/blog/page.tsx

import { Metadata } from "next";
import { getBlogs } from "@/components/auth/blogs";
import BlogsPage from "@/components/pages/blog/BlogsPage";

// ✅ Dynamically generate metadata using response from getBlogs
export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getBlogs();

    // TypeScript fix: safely access meta if it exists
    const meta = (response as any)?.meta || {}; // use proper type if available

    const title = meta.meta_title || "Dench Infotech - Blogs";
    const description =
      meta.meta_description ||
      "Latest blogs on development, marketing, and more.";
    const keywords =
      meta.meta_keyword || "development, digital marketing, blogs";
    const siteName = "Dench Infotech";

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://denchinfotech.in";
    const url = `${baseUrl}/blogs`;
    const image = `${baseUrl}/og-image.jpg`;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: url,
      },
      openGraph: {
        type: "website",
        url,
        title,
        description,
        siteName,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: "Dench Infotech",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Dench Infotech - Blogs",
      description: "Explore the latest blogs from Dench Infotech.",
    };
  }
}

// ✅ Blog Page Component
export default function Blogs() {
  return <BlogsPage />;
}
