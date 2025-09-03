import { Metadata } from "next"
import { getPortfolioDetails } from "@/components/auth/portfolio" // adjust import path
import PortfolioDetails from "@/components/pages/portfolio/portfolioDetails"
import { PortfolioDetail } from "@/components/auth/portfolio" // using the type you defined

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const slug = params.slug
    const response = await getPortfolioDetails(slug)

    const portfolio: PortfolioDetail = response?.data?.portfolio || {}
    const meta = response?.data?.meta || {}
    const title = meta.meta_title || portfolio.name || "Dench Infotech Portfolio"
    const description =
      meta.meta_description ||
      portfolio.short_content ||
      "Explore our latest portfolio projects."
    const keywords =
      meta.meta_keyword ||
      "portfolio projects, Dench Infotech work, app development examples, website showcase"

    const url = `https://denchinfotech.in/portfolio/${slug}`
    const siteName = "Dench Infotech"
    const image =
      portfolio.image_url ||
      portfolio.photo ||
      "https://denchinfotech.in/og-image.jpg"

    return {
      title,
      description,
      keywords,
      alternates: { canonical: url },
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
    }
  } catch (error) {
    console.error("Failed to fetch metadata:", error)
    return {
      title: "Dench Infotech - Portfolio",
      description: "Explore our innovative software and digital transformation projects.",
    }
  }
}

// Use portfolio details in page rendering
export default async function PortfolioSlug({ params }: Props) {
  const response = await getPortfolioDetails(params.slug)
  const portfolio = response?.data?.portfolio || {}

  return <PortfolioDetails portfolio={portfolio} />
}
