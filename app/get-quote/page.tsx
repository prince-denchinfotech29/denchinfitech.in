import React from "react";
import GetQuote from "@/components/pages/contect/getQuote";
import { Metadata } from "next";
import { getQuoteDetails } from "@/components/auth/morepage";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getQuoteDetails();
    const meta = response.data.data.meta;

    const title = meta?.meta_title || "Dench Infotech - Get Quote";
    const description = meta?.meta_description || "Request a quote from Dench Infotech";
    const keywords = meta?.meta_keyword || "website development free quote, system development quote, ecommerce website cost";

    const siteName = "Dench Infotech";
    const url = "https://denchinfotech.in/get-quote";
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
      // Don't set viewport or charset here — globally set in root layout
    };
  } catch (error) {
    console.error("Failed to fetch metadata for Get Quote:", error);
    return {
      title: "Dench Infotech - Get Quote",
      description: "Request a quote from Dench Infotech",
      keywords: "website development free quote, system development quote, ecommerce website cost",
      alternates: {
        canonical: "https://denchinfotech.in/get-quote",
      },
      openGraph: {
        type: "website",
        title: "Dench Infotech - Get Quote",
        description: "Request a quote from Dench Infotech",
        url: "https://denchinfotech.in/get-quote",
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
        title: "Dench Infotech - Get Quote",
        description: "Request a quote from Dench Infotech",
        images: ["https://denchinfotech.in/og-image.jpg"],
      },
    };
  }
}

export default function GetQuotePage() {
  return <GetQuote />;
}
