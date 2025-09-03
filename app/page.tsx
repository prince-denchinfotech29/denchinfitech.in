// app/page.tsx

import HomePage from "@/components/pages/homePage/Homepage";
import { fetchHome } from "@/components/auth/home";
import type { Metadata } from "next";

// Optional: ISR (Incremental Static Regeneration) - refreshes every 60 seconds
export const revalidate = 60;

// SERVER-SIDE SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const homeData = await fetchHome();
  const baseUrl = "https://denchinfitech-in-bz37.vercel.app";
  const url = `${baseUrl}/`;
  const image = `${baseUrl}/og-image.jpg`;

  const title =
    homeData?.meta?.meta_title ||
    "Dench Infotech - Your Trusted Partner in Software & Digital Transformation";

  const description =
    homeData?.meta?.meta_description ||
    "Dench Infotech: Providing software development, app development, and digital marketing solutions tailored to your business needs.";

  const keywords = homeData?.meta?.meta_keyword || "";

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
      siteName: "Dench Infotech",
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
    verification: {
      google: "your_verification_code_here", // <-- Add your actual Google Site Verification code
    },
  };
}

// Home Page Component
export default async function Home() {
  const homeData = await fetchHome();

  return <HomePage data={homeData} />;
}
