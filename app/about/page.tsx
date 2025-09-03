import React from "react";
import AboutPage from "@/components/pages/about/AboutUs"; // Your about page component
import { Metadata } from "next";
import { getAboutDetails } from "@/components/auth/home";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getAboutDetails();
    const meta = response.data.data.meta;

    const title =
      meta?.meta_title || "About Us - Dench Infotech - Technology & Marketing Agency";

    const description =
      meta?.meta_description ||
      "Dench Infotech is New generation Tech & Marketing Company having 5 year old setup with more than 20 years of experience.";

    const keywords =
      meta?.meta_keyword ||
      "IT professional services agency, global software solutions provider, Dench Infotech, mobile app development company in noida, mobile app development companies in india, Internet website designers in Delhi NCR, Ecommerce Service provider in Delhi NCR, Internet Website Developers in Noida, Online Website Development in Delhi, top branding companies in delhi, top digital marketing companies in noida";

    const siteName = "Dench Infotech";
    const url = "https://denchinfotech.in/about";
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
      // Don't include viewport or charset here — globally set in root layout
    };
  } catch (error) {
    console.error("Failed to fetch metadata for About page:", error);
    return {
      title: "About Us - Dench Infotech - Technology & Marketing Agency",
      description:
        "Dench Infotech is New generation Tech & Marketing Company having 5 year old setup with more than 20 years of experience.",
      keywords:
        "IT professional services agency, global software solutions provider, Dench Infotech, mobile app development company in noida, mobile app development companies in india, Internet website designers in Delhi NCR, Ecommerce Service provider in Delhi NCR, Internet Website Developers in Noida, Online Website Development in Delhi, top branding companies in delhi, top digital marketing companies in noida",
      alternates: {
        canonical: "https://denchinfotech.in/about",
      },
      openGraph: {
        type: "website",
        title: "About Us - Dench Infotech - Technology & Marketing Agency",
        description:
          "Dench Infotech is New generation Tech & Marketing Company having 5 year old setup with more than 20 years of experience.",
        url: "https://denchinfotech.in/about",
        siteName: "Dench Infotech",
        images: [
          {
            url: "https://denchinfotech.in/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Dench Infotech",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "About Us - Dench Infotech - Technology & Marketing Agency",
        description:
          "Dench Infotech is New generation Tech & Marketing Company having 5 year old setup with more than 20 years of experience.",
        images: ["https://denchinfotech.in/og-image.jpg"],
      },
    };
  }
}

export default function AboutRoute() {
  return <AboutPage />;
}
