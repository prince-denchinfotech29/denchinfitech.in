import { Metadata } from "next";
import ServicesPage from "@/components/pages/services/ServicesPage";
import ExtraPage from "@/components/pages/extra/ExtraPage";
import {
  getServicesByCategory,
  getExtraPageBySlug,
  ServicesApiResponse,
  ExtraPageResponse,
} from "@/components/auth/services";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug;
  const baseUrl = "https://denchinfotech.in"; // change as needed
  const image = `${baseUrl}/og-image.jpg`;

  try {
    const servicesData: ServicesApiResponse = await getServicesByCategory(slug);
    if (servicesData && servicesData.services.length > 0) {
      const meta = servicesData.meta;
      const title = meta.meta_title || "Services";
      const description = meta.meta_description || "Our services.";
      const keywords = meta.meta_keyword?.split(",").map((k) => k.trim());

      return {
        title,
        description,
        keywords,
        alternates: {
          canonical: `${baseUrl}/${slug}`,
        },
        openGraph: {
          type: "website",
          title,
          description,
          url: `${baseUrl}/${slug}`,
          siteName: "Dench Infotech",
          images: [
            {
              url: image,
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
          images: [image],
        },
      };
    }
  } catch {
    // ignore
  }

  try {
    const extraPageData: ExtraPageResponse = await getExtraPageBySlug(slug);
    if (extraPageData && extraPageData.service) {
      const meta = extraPageData.meta || {};
      const title = meta.meta_title || "Page";
      const description = meta.meta_description || "Page content.";
      const keywords = meta.meta_keyword?.split(",").map((k) => k.trim());

      return {
        title,
        description,
        keywords,
        alternates: {
          canonical: `${baseUrl}/${slug}`,
        },
        openGraph: {
          type: "website",
          title,
          description,
          url: `${baseUrl}/${slug}`,
          siteName: "Dench Infotech",
          images: [
            {
              url: image,
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
          images: [image],
        },
      };
    }
  } catch {
    // ignore
  }

  // Fallback metadata
  return {
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
    alternates: {
      canonical: `${baseUrl}/${slug}`,
    },
    openGraph: {
      type: "website",
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
      url: `${baseUrl}/${slug}`,
      siteName: "Dench Infotech",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Page Not Found",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
      images: [image],
    },
  };
}

const DynamicPage = async ({ params }: PageProps) => {
  const slug = params.slug;

  try {
    const servicesData = await getServicesByCategory(slug);
    if (servicesData && servicesData.services.length > 0) {
      return <ServicesPage categorySlug={slug} />;
    }
  } catch {}

  try {
    await getExtraPageBySlug(slug);
    return <ExtraPage slug={slug} />;
  } catch {}

  return (
    <div className="text-center p-20">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default DynamicPage;
