// app/why-us/page.tsx
import dynamic from "next/dynamic"
import { Metadata } from "next"
import { getWhyUsDetails } from "@/components/auth/morepage"

// Client component (disable SSR)
const WhyUsPage = dynamic(() => import("@/components/pages/why-careers/way-us"), { ssr: false })

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getWhyUsDetails()
    const meta = response.data.data.meta

    const title = meta?.meta_title || "Why Choose Us - Dench Infotech"
    const description =
      meta?.meta_description ||
      "Why choose Dench Infotech for software development and digital transformation."
    const keywords = meta?.meta_keyword || ""

    const siteName = "Dench Infotech"
    const url = "https://denchinfotech.in/why-us"
    const image = "https://denchinfotech.in/og-image.jpg"

    return {
      title,
      description,
      keywords,
      alternates: { canonical: url },
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
    }
  } catch (error) {
    console.error("Failed to fetch metadata:", error)
    return {
      title: "Why Choose Us - Dench Infotech",
      description:
        "Why choose Dench Infotech for software development and digital transformation.",
    }
  }
}

export default function WhyUsRoute() {
  return <WhyUsPage />
}
