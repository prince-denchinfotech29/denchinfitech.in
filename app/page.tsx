// app/page.tsx

import { Metadata } from "next";
import HomePage from "@/components/pages/homePage/Homepage";
import { fetchHome } from "@/components/auth/home";

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await fetchHome();

  const title =
    homeData?.meta?.meta_title ||
    "Dench Infotech - Your Trusted Partner in Software & Digital Transformation";
  const description =
    homeData?.meta?.meta_description ||
    "Dench Infotech: Providing software development, app development, and digital marketing solutions tailored to your business needs.";
  const keywords =
    homeData?.meta?.meta_keywords ||
    "Software development, Digital marketing, App development, Dench Infotech";
  const siteName = "Dench Infotech";
  const url = "https://denchinfotech.in/"; // Home page URL
  const image = "https://denchinfotech.in/og-image.jpg";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url, // ये auto <link rel="canonical" href="..." /> लगाएगा
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
      // Extra meta tags
      keywords,
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8",
    },
  };
}

export default function Home() {
  return <HomePage />;
}
