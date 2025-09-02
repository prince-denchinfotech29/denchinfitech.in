// app/contact/page.tsx
import dynamic from "next/dynamic"
import { Metadata } from "next"
import { getContactDetails } from "@/components/auth/morepage"

// Dynamically import the client-side Contact component
const ContactPage = dynamic(() => import("@/components/pages/contect/contectUs"), { ssr: false })

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getContactDetails()
    const meta = response.data.data.meta

    const title =
      meta?.meta_title || "Dench Infotech - Your Trusted Partner in Software & Digital Transformation"

    const description =
      meta?.meta_description ||
      "Dench Infotech: Providing software development, app development, and digital marketing solutions tailored to your business needs."

    const keywords =
      meta?.meta_keywords || ""

    const siteName = "Dench Infotech"
    const url = "https://denchinfotech.in/"
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
      title: "Dench Infotech - Your Trusted Partner",
      description: "Leading software development & digital transformation company.",
    }
  }
}

export default function ContactRoute() {
  return <ContactPage />
}
