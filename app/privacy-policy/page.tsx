// app/privacy-policy/page.tsx
import { Metadata } from "next"
import { getPolicyDetails } from "@/components/auth/morepage"
import PrivacyPolicyPage from "@/components/pages/policy/page" // SSR friendly import

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getPolicyDetails()
    const meta = response.data.data.meta

    const title = meta?.meta_title || "Privacy Policy - Dench Infotech"
    const description = meta?.meta_description || "Dench Infotech is a web and app application development company in Noida. We ensure our customers are always aware of our policies and quality standards."
    const keywords = meta?.meta_keyword || "Mobile app development company, android application development, app development companies india, website development company, digital marketing agency"

    const siteName = "Dench Infotech"
    const url = "https://denchinfotech.in/privacy-policy"
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
        images: [{ url: image, width: 1200, height: 630, alt: siteName }],
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
      title: "Privacy Policy - Dench Infotech",
      description: "Dench Infotech Privacy Policy",
    }
  }
}

export default function PrivacyPolicyRoute() {
  return <PrivacyPolicyPage />
}
