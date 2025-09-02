// app/careers/page.tsx
import dynamic from "next/dynamic"
import { Metadata } from "next"
import { getCareerDetails } from "@/components/auth/morepage"


// Dynamic import for client component (disable SSR)
const CareersPage = dynamic(() => import("@/components/pages/why-careers/careers"), { ssr: false })

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getCareerDetails()
    const meta = response.data.data.meta

    const title = meta?.meta_title || "Dench Infotech - Careers"
    const description = meta?.meta_description || "Explore career opportunities at Dench Infotech"
    const keywords = meta?.meta_keyword || ""

    const siteName = "Dench Infotech"
    const url = "https://denchinfotech.in/careers"
    const image = "https://denchinfotech.in/og-image.jpg"

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
    console.error("Failed to fetch metadata:", error)
    return {
      title: "Dench Infotech - Careers",
      description: "Explore career opportunities at Dench Infotech",
    }
  }
}

export default function CareersRoute() {
  return <CareersPage />
}
