// app/blogs/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getBlogs } from "@/components/auth/blogs";  // Adjust the import if needed

// Dynamically import the BlogsPage component (client-side)
const BlogsPage = dynamic(() => import("@/components/pages/blog/BlogsPage"), { ssr: false });

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getBlogs();
    const meta = response.meta; 

    const title = meta?.meta_title || "Dench Infotech - Blogs";
    const description = meta?.meta_description || "Latest blogs on development, marketing, and more.";
    const keywords = meta?.meta_keyword || "development, digital marketing, blogs";

    const siteName = "Dench Infotech";
    const url = "https://denchinfotech.in/blogs";
    const image = "https://denchinfotech.in/og-image.jpg";

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: url,
      },
      openGraph: {
        type: "website",
        title,
        description,
        url,
        siteName,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: siteName,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
      other: {
        keywords,
        viewport: "width=device-width, initial-scale=1",
        charset: "utf-8",
      },
    };
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    return {
      title: "Dench Infotech - Blogs",
      description: "Stay updated with the latest blogs at Dench Infotech",
    };
  }
}

export default function Blogs() {
  return <BlogsPage />;
}
