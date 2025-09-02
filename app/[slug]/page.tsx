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

  // Try services API first
  try {
    const servicesData: ServicesApiResponse = await getServicesByCategory(slug);
    if (servicesData && servicesData.services.length > 0) {
      return {
        title: servicesData.meta.meta_title || servicesData.meta.heading || "Services",
        description: servicesData.meta.meta_description || servicesData.meta.description || "",
        keywords: servicesData.meta.meta_keyword
          ? servicesData.meta.meta_keyword.split(",").map((k) => k.trim())
          : undefined,
      };
    }
  } catch {
    // ignore error
  }

  // Try extra page API
  try {
    const extraPageData: ExtraPageResponse = await getExtraPageBySlug(slug);
    if (extraPageData && extraPageData.service) {
      const meta = extraPageData.service.meta || {};
      return {
        title: meta.meta_title || extraPageData.service.heading || "Page",
        description: meta.meta_description || extraPageData.service.description || "",
        keywords: meta.meta_keyword
          ? meta.meta_keyword.split(",").map((k) => k.trim())
          : undefined,
      };
    }
  } catch {
    // ignore error
  }

  // Default metadata fallback
  return {
    title: "Page",
    description: "Page description",
  };
}

const DynamicPage = async ({ params }: PageProps) => {
  const slug = params.slug;

  try {
    // Try fetching services category
    const servicesData = await getServicesByCategory(slug);
    if (servicesData && servicesData.services.length > 0) {
      return <ServicesPage categorySlug={slug} />;
    }
  } catch {
    // ignore
  }

  try {
    // Try fetching extra page
    await getExtraPageBySlug(slug);
    return <ExtraPage slug={slug} />;
  } catch {
    // Not found fallback UI
    return (
      <div className="text-center p-20">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }
};

export default DynamicPage;
