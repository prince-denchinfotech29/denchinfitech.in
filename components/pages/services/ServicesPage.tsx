// components/pages/services/ServicesPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getServicesByCategory, Service, Meta } from "@/components/auth/services";
import { useHomeData } from "@/hooks/useHomeData";
import Navbar from "@/components/pages/header/Header";
import Footer from "@/components/pages/header/footer/Footer";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const defaultImage = "/imges/aboutus-Dench.webp";
const bannerImg = "/imges/banner_news.jpg";

interface ServicesPageProps {
  categorySlug: string;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ categorySlug }) => {
  const { homeData, navData, loading: homeLoading, error: homeError } = useHomeData();
  const [services, setServices] = useState<Service[]>([]);
  const [meta, setMeta] = useState<Meta>({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getServicesByCategory(categorySlug);
        setServices(data.services || []);
        setMeta(data.meta || {});
        setApiError(null);
      } catch (error: any) {
        setApiError(error.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    })();
  }, [categorySlug]);

  const stripHtml = (html: string) => {
    const el = document.createElement("DIV");
    el.innerHTML = html;
    return el.textContent || el.innerText || "";
  };

  const truncateText = (text: string, limit: number) =>
    text.length > limit ? text.slice(0, limit) + "..." : text;

  if (homeLoading || loading) return <LoadingSpinner />;

  if (homeError || apiError)
    return <div className="p-10 text-center text-red-600">Error: {homeError || apiError}</div>;

  return (
    <>
      <Navbar homeData={homeData} navData={navData} />

      <header
        className="w-full py-20 mb-16 text-white text-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(24,29,56,0.7),rgba(24,29,56,0.7)), url(${bannerImg})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-[#0d6efd] bg-opacity-80"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">{meta.heading || "Our Services"}</h1>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-semibold text-center text-[#0d6efd] mb-4">
          {meta.name || "Our Services"}
        </h2>
        <p
          className="text-gray-700 text-center max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: meta.description || "" }}
        />
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {services.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-4">
            {services.map((service, index) => (
              <Card
                key={service.id ?? `${service.slug}-${index}`}
                className="overflow-hidden flex flex-col transition-transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={service.image_url}
                  alt={service.heading}
                  className="w-full h-48 object-cover"
                  onError={(e) => ((e.target as HTMLImageElement).src = defaultImage)}
                />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-3">{service.heading}</h3>
                  <p className="text-gray-600 flex-grow">
                    {truncateText(stripHtml(service.short_content || ""), 100)}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/${categorySlug}/${service.slug}`}
                      className="text-[#0d6efd] font-semibold hover:text-pink-600 inline-flex items-center gap-2"
                    >
                      Read More <i className="fa fa-chevron-circle-right"></i>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No services found.</p>
        )}
      </section>

      <Footer homeData={homeData} />
    </>
  );
};

export default ServicesPage;
