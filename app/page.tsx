import type { Metadata } from "next";
import HomePage from "@/components/pages/homePage/Homepage";
import { fetchHome } from "@/components/auth/home";
import { headers } from "next/headers";


function getBaseUrl(): string {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await fetchHome();
  const baseUrl = getBaseUrl(); // 👈 Get runtime domain
  const url = baseUrl + "/";
  const image = baseUrl + "/og-image.jpg";

  const title =
    homeData?.meta?.meta_title ||
    "Dench Infotech - Your Trusted Partner in Software & Digital Transformation";

  const description =
    homeData?.meta?.meta_description ||
    "Dench Infotech: Providing software development, app development, and digital marketing solutions tailored to your business needs.";

  const keywords =
    homeData?.meta?.meta_keyword || "";

  const siteName = "Dench Infotech";

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
      "google-site-verification": "your_verification_code_here", // Optional
    },
  };
}

export default function Home() {
  return <HomePage />;
}
