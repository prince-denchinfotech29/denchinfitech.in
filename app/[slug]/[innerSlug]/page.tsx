import type { Metadata } from "next";
import { headers } from "next/headers";
import ServiceDetailsPage from "@/components/pages/services/ServiceDetailsPage";
import {
  getServiceBySlug,
  ServiceDetailResponse,
} from "@/components/auth/services";

interface PageProps {
  params: {
    slug: string;
    innerSlug: string;
  };
}

// ✅ Auto-detect domain (localhost or live)
function getBaseUrl(): string {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

// ✅ Dynamic Metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${params.slug}/${params.innerSlug}`;
  const imageUrl = `${baseUrl}/og-image.jpg`;

  try {
    const serviceData: ServiceDetailResponse = await getServiceBySlug(
      params.slug,
      params.innerSlug
    );

    if (serviceData) {
      const meta = serviceData.meta || {};
      const title = serviceData.service.meta_title || "Service Details";
      const description =
        serviceData.service.meta_description ||
        "Service information by Dench Infotech.";
      const keywords = serviceData.service.meta_keyword
        ?.split(",")
        .map((k: string) => k.trim());

      return {
        title,
        description,
        keywords,
        alternates: {
          canonical: pageUrl,
        },
        openGraph: {
          type: "website",
          title,
          description,
          url: pageUrl,
          siteName: "Dench Infotech",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [imageUrl],
        },
        // ✅ Avoids repeating viewport tag
        other: {
          viewport: "width=device-width, initial-scale=1",
        },
      };
    }
  } catch (error) {
    console.error("Failed to fetch service metadata:", error);
  }

  // ❌ Fallback metadata
  return {
    title: "Service Not Found",
    description: "The requested service page could not be found.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Service Not Found",
      description: "The requested service page could not be found.",
      url: pageUrl,
      siteName: "Dench Infotech",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Dench Infotech",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Service Not Found",
      description: "The requested service page could not be found.",
      images: [imageUrl],
    },
    other: {
      viewport: "width=device-width, initial-scale=1",
    },
  };
}

// ✅ Page Component
export default function Page({ params }: PageProps) {
  return (
    <ServiceDetailsPage
      categorySlug={params.slug}
      serviceSlug={params.innerSlug}
    />
  );
}
