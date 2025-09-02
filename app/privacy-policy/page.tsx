// app/privacy-policy/page.tsx
import dynamic from "next/dynamic"
import { Metadata } from "next"
import { getPolicyDetails } from "@/components/auth/morepage"

// Dynamically import the client-side PrivacyPolicy component (no SSR)
const PrivacyPolicyPage = dynamic(() => import("@/components/pages/policy/page"), {
  ssr: false,
})

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getPolicyDetails()
    const meta = response.data.data.meta

    const title = meta?.meta_title || "Privacy Policy - Dench Infotech"
    const description = meta?.meta_description || ""
    const keywords = meta?.meta_keyword || ""

    const siteName = "Dench Infotech"
    const url = "https://denchinfotech.in/privacy-policy"
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
      title: "Privacy Policy - Dench Infotech",
      description: "",
    }
  }
}

export default function PrivacyPolicyRoute() {
  return <PrivacyPolicyPage />
}
