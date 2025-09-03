// pages/portfolio/index.tsx
import { Metadata } from "next"
import PortfolioPage from "@/components/pages/portfolio/portfolioPage"
import { getPortfolio } from "@/components/auth/portfolio"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getPortfolio()
    const meta = response.data.meta || {}

    const title = meta.meta_title || "Dench Infotech Portfolio"
    const description =
      meta.meta_description || "Explore our portfolio of software and digital projects."
    const keywords =
      meta.meta_keyword ||
      "Dench Infotech portfolio, software projects, app development showcase, website development work"

    const url = "https://denchinfotech.in/portfolio"
    const siteName = "Dench Infotech"
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
    console.error("Failed to fetch portfolio meta:", error)
    return {
      title: "Dench Infotech Portfolio",
      description: "Browse our latest software and digital transformation projects.",
    }
  }
}

export default function Portfolio() {
  return <PortfolioPage />
}
