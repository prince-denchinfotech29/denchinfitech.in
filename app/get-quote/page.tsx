// app/get-quote/page.tsx
import React from "react"
import GetQuote from "@/components/pages/contect/getQuote" // your client form component
import { Metadata } from "next"
import { getQuoteDetails } from "@/components/auth/morepage" // Use quote API here

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getQuoteDetails()
    const meta = response.data.data.meta

    const title = meta?.meta_title || "Dench Infotech - Get Quote"
    const description = meta?.meta_description || "Request a quote from Dench Infotech"
    const keywords = meta?.meta_keyword || ""

    const siteName = "Dench Infotech"
    const url = "https://denchinfotech.in/get-quote"
    const image = "https://denchinfotech.in/og-image.jpg" // Use your real OG image URL

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
    }
  } catch (error) {
    console.error("Failed to fetch metadata for Get Quote:", error)
    return {
      title: "Dench Infotech - Get Quote",
      description: "Request a quote from Dench Infotech",
    }
  }
}

export default function GetQuotePage() {
  return <GetQuote />
}
