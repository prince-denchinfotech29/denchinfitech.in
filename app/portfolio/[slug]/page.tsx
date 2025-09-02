// pages/portfolio/[slug].tsx
import dynamic from "next/dynamic"
import { Metadata } from "next"
import { getPortfolioDetails } from "@/components/auth/portfolio"

// Dynamically import the client-side PortfolioDetails component
const PortfolioDetails = dynamic(() => import("@/components/pages/portfolio/portfolioDetails"), {
  ssr: false,
})

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const slug = params.slug
    const response = await getPortfolioDetails(slug)

    const meta = response?.data?.meta || {}
    const portfolio = response?.data?.portfolio || {}

    const title = meta.meta_title || portfolio.name || "Dench Infotech Portfolio"
    const description =
      meta.meta_description || portfolio.short_content || "Explore our latest portfolio projects."
    const keywords = meta.meta_keyword || ""

    const siteName = "Dench Infotech"
    const url = `https://denchinfotech.in/portfolio/${slug}`
    const image = portfolio.image_url || portfolio.photo || "https://denchinfotech.in/og-image.jpg"

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: url,
      },
      openGraph: {
        type: "article",
        title,
        description,
        url,
        siteName,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: portfolio.name || "Portfolio Image",
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
      title: "Dench Infotech - Portfolio",
      description: "Explore our innovative software and digital transformation projects.",
    }
  }
}

export default function PortfolioSlug() {
  return <PortfolioDetails />
}
